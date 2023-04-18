import { createContext, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong, RunnableSongFunctions } from './structure'
import _ from 'lodash'
import { Audio, AVPlaybackSource } from 'expo-av'
import * as f from './SongFunctions'
import { PreferencesContext } from './PreferencesManager'
import { BuildSongContext } from './BuildSongManager'

let contextValues = {} as RunnableSongFunctions
export const SongContext = createContext(contextValues) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    //Makes sounds work
    const [sound, setSound] = useState(0 as any)
    const {soundSet} = useContext(PreferencesContext)

    async function playSound(accent : number) {

        const { sound } = await Audio.Sound.createAsync(soundSet[accent].file, {shouldPlay: true}) //preset to be determined by user settings
        
        setSound(sound)
    
        //await sound.playAsync();
    }
    
    useEffect(() => {
    return sound
        ? () => {
            sound.unloadAsync();
        }
        : undefined;
    }, [sound]);  

    //'ENGINE' OF THE METRONOME

    //This is the third attempt at making this work, and is by no means ideal. Other two attempts down below.

    const [running, setRunning] = useState(false)
    const [song, setSong] = useState(_.cloneDeep(defaultMetronomeSong))

    const requestRef = useRef(null as any)
    const prevTRef = useRef(performance.now())

    function toggleRunning(){
        setRunning(running == true ? false : true)
    }

    //TODO - REDEFINE
    // function step(timestamp: number) : void {

    //     const elapsed = timestamp - prevTRef.current

    //     if(!running){
    //         setSong(f.resetSong(song))
    //         return
    //     }

    //     const { beatDuration } = f.getActiveBeat(song)

    //     if(elapsed > beatDuration){
    //         setSong(f.incrementBeat(song))

    //         const { beatSound } = f.getActiveBeat(song)
    //         console.log(elapsed-beatDuration)

    //         playSound(beatSound)
    //         prevTRef.current = timestamp
    //     }

    //     requestRef.current = requestAnimationFrame(step);

    // }

    // useEffect(()=>{ 
    //     requestRef.current = requestAnimationFrame(step)
    //     return () => cancelAnimationFrame(requestRef.current)
    // },[running])

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
        running: running,
        toggleRunning: toggleRunning,
    }
    
    return(
        <SongContext.Provider value={contextValues}>
            {children}
        </SongContext.Provider>
    )
}

