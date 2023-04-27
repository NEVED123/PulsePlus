import { createContext, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong, RunnableSongFunctions, multiMeterTestMetronomeSong } from './structure'
import { beatDuration } from './beatDuration'
import _, { first } from 'lodash'
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess} from 'expo-av'
import * as f from './SongFunctions'
import { PreferencesContext } from './PreferencesManager'
import { BuildSongContext } from './BuildSongManager'
import useStateWithCallback from 'use-state-with-callback'

let contextValues = {} as RunnableSongFunctions
export const SongContext = createContext(contextValues) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    //Makes sounds work
    const soundRef = useRef({} as Audio.Sound)
    const {soundSet} = useContext(PreferencesContext)

    async function loadSound(accent : number) {
        const { sound } = await Audio.Sound.createAsync(soundSet[accent].file, {
            progressUpdateIntervalMillis: 1,
            positionMillis: 0,
            shouldPlay: false,
            rate: 1.0,
            shouldCorrectPitch: true,
            volume: 1.0,
            isMuted: false,
            isLooping: false,
            seekMillisToleranceAfter: 0,
            seekMillisToleranceBefore: 0,
            },
            deltaStatusUpdate
          ) //play with the Initial AVPlayBackStatus
        soundRef.current = sound
    }

    const statusUpdateTimeRef = useRef(performance.now())

    function deltaStatusUpdate(){
        //to calculate delay caused by changing status of playback
        statusUpdateTimeRef.current = performance.now()-statusUpdateTimeRef.current
    }

    //'ENGINE' OF THE METRONOME

    //This is the third attempt at making this work, and is by no means ideal. Other two attempts down below.

    const [song, setSong] = useState(_.cloneDeep(multiMeterTestMetronomeSong))
    const running = useRef(false)
    const prevTRef = useRef(performance.now())
    const x = useRef(0)
    const prevActiveMeterIndex = useRef(0)
    const d = useRef(0)

    useEffect(()=>{
        if(!running.current){
            const firstBeatSound = f.getActiveMeter(song).beats[0].beatSound
            loadSound(firstBeatSound)
        }
    },[]) //sound of first beat in meter
    
    function toggleRunning(){
        if(running.current){
            f.resetSong(song)
            running.current = false
        }
        else{
            running.current = true
            requestAnimationFrame(step)
        }
    }

    async function step(timestamp : number){

        if(!running.current){
            //reset song
            return
        }

        if(timestamp - prevTRef.current > d.current){

            setSong(f.incrementBeat(song))

            prevTRef.current = timestamp
            
            soundRef.current.playFromPositionAsync(0, {toleranceMillisBefore:0, toleranceMillisAfter: 0}).catch(
                (reason: any)=>{console.log(reason)}
            )
            
            if(f.getSongLength(song) > 1){
                if(f.getActiveMeterIndex(song) != prevActiveMeterIndex.current){
                    prevActiveMeterIndex.current = f.getActiveMeterIndex(song)
                    x.current = 0
                }
                else{
                    x.current++;
                }
            }

            console.log(x)
            
            if(f.getNextBeat(song).beatSound != f.getActiveBeat(song)?.beatSound){
                statusUpdateTimeRef.current = performance.now()
                loadSound(f.getNextBeat(song).beatSound)
            }else{
                soundRef.current.setPositionAsync(0).catch(
                    (reason: any)=>console.log(reason)
                )
                statusUpdateTimeRef.current = 0
            }
        
            d.current = beatDuration(f.getTempo(song), f.getFinalTempo(song), x.current, f.getRepetitions(song)*f.getNumerator(song)) - statusUpdateTimeRef.current
            //statusUpdateTimeRef.current = 0
        }

        requestAnimationFrame(step)
        
    } 

    contextValues = {
        song: _.cloneDeep(song),
        activeMeter: f.getActiveMeter(song),
        activeMeterIndex: f.getActiveMeterIndex(song),
        setActiveMeterIndex: (index: number) => f.setActiveMeterIndex(index, song),
        numerator: f.getNumerator(song),
        setNumerator: (numerator: number) => {setSong(f.setNumerator(song, numerator))},
        denominator: f.getDenominator(song),
        setDenominator: (denominator: number) => {setSong(f.setDenominator(song, denominator))},
        setAccent: (beatNumber: number) => {setSong(f.setAccent(song, beatNumber))},
        tempo: f.getTempo(song),
        setTempo: (tempo: number)=>{setSong(f.setTempo(song, tempo))},
        resetSong: () => {setSong(f.resetSong(song))},
        incrementBeat: ()=>{setSong(f.incrementBeat(song))},
        finalTempo: f.getFinalTempo(song),
        repetitions: f.getRepetitions(song),
        songName: f.getSongName(song),
        incrementMeter: (wrapToBeginning? : boolean)=>{setSong(f.incrementMeter(song, wrapToBeginning))},
        decrementMeter: (wrapToEnd? : boolean) => {setSong(f.decrementMeter(song, wrapToEnd))},
        length : f.getSongLength(song),
        accel : f.getAccel(song),
        setSong: (song: Song) => {setSong(_.cloneDeep(song))},
        running: running.current,
        toggleRunning: toggleRunning,
    }
    
    return(
        <SongContext.Provider value={contextValues}>
            {children}
        </SongContext.Provider>
    )
}

