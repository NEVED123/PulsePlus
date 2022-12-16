import React, { createContext, useState, useRef } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong } from './structure'
import { Audio } from 'expo-av'
import { activeMeter, changeDenominator, 
    changeAccent, denominator, 
    changeNumerator, 
    changeTempo, 
    tempo, 
    numerator} from './SongFunctions'

const contextInitialValues = {
    getSong: (): Song => {return defaultMetronomeSong},
    getActiveMeter: (): Meter => {return {initBpm: 0, denominator: 0, repeat: 0, active: false, beats: []}},
    getNumerator:(): number => {return 0},
    setNumerator:(numerator: number, resetAccents : boolean = true)=>{},
    getDenominator: (): number => {return 0},
    setDenominator:(denominator: number)=>{},
    setAccent:(beatNumber: number)=>{},
    getTempo: (): number => {return 0},
    setTempo: (newTempo: number) => {},
    toggle: () => {},
    incrementBeat: () => {}
}


export const SongContext = createContext(contextInitialValues) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    const [song, setSong] = useState(defaultMetronomeSong)
    const [running, setRunning] = useState(false)
    

    function getSong(){
        return {...song}
    }

    function getActiveMeter(){
        return activeMeter({...song})
    }

    function getActiveMeterIndex(){
        const meterIndex = song.song.findIndex(meter => meter.active == true)

        if(meterIndex != -1){
            return meterIndex
        }
    
        throw new Error('No active meter in song')
    }

    function getActiveBeat() {

        const activeMeter = getActiveMeter()
        const beat = activeMeter.beats.find(beat => beat.active == true)

        if(beat != undefined){
            return beat
        }

        throw new Error('No active beat in song')
    }

    function getActiveBeatIndex(){
        const activeMeter = getActiveMeter()
        const beatIndex = activeMeter.beats.findIndex(beat => beat.active == true)

        if(beatIndex != -1){
            return beatIndex
        }

        throw new Error('No active beat in song')
    }

    function resetSong(){
        const updatedSong = getSong()

        updatedSong.song[getActiveMeterIndex()].beats[getActiveBeatIndex()].active = false
        updatedSong.song[getActiveMeterIndex()].active = false

        updatedSong.song[0].active = true
        updatedSong.song[0].beats[0].active = true
        
        setSong(updatedSong)
    }

    function getNumerator(){
        return numerator(song)
    }

    function setNumerator(numerator: number, resetAccents : boolean = true){
        setSong(changeNumerator(song, numerator, resetAccents))
    }

    function getDenominator(){
        return denominator(song)
    }

    function setDenominator(denominator: number){
        setSong(changeDenominator(song, denominator))
    }

    function setAccent(beatNumber: number){
        setSong(changeAccent(song, beatNumber))
    }

    function getTempo(){
        return tempo(song)
    }

    function setTempo(newTempo: number){
        return setSong(changeTempo(song, newTempo))
    }

    function incrementBeat(){

        const updatedSong = {...song}

        const activeMeter = getActiveMeter()
        const meterIndex = getActiveMeterIndex()
        const beatIndex = getActiveBeatIndex()

        updatedSong.song[meterIndex].beats[beatIndex].active = false 
        if(beatIndex < activeMeter.beats.length-1) 
            //we still have more beats in the active meter
            updatedSong.song[meterIndex].beats[beatIndex + 1].active = true
        else{ 
            //we have no more beats in the active meter, and must switch to the next meter
            if(meterIndex < updatedSong.song.length-1){ 
                //there is another meter in the measure
                updatedSong.song[meterIndex+1].active=true
                updatedSong.song[meterIndex+1].beats[0].active=true
            }
            else{
                //loops back to beginning for now, will depend on repeat attribute
                updatedSong.song[0].active=true
                updatedSong.song[0].beats[0].active=true
            }
        }

        setSong(updatedSong)

    }

    //'ENGINE' OF THE METRONOME
    
    const timeOutId = useRef(0 as any)
    const [sound, setSound] = useState(0 as any)
    const clave = require('../assets/sounds/clave.mp3')

    async function playSound() {

        const { sound } = await Audio.Sound.createAsync(clave);

        setSound(sound)
    
        await sound.playAsync();
    }
    
    React.useEffect(() => {
    return sound
        ? () => {
            sound.unloadAsync();
        }
        : undefined;
    }, [sound]);  

    function toggle(){

        setRunning(running == true ? false : true)

        if(running){
            stopMetronome()
            return
        }
        
        startMetronome()
    }

    function startMetronome(){

        let expected = Date.now() + getActiveBeat().beatDuration

        playSound()
        timeOutId.current = setTimeout(()=>step(), getActiveBeat().beatDuration)

        function step(){
            const dt = Date.now() - expected

            incrementBeat()
            playSound()

            console.log(dt)
            console.log(getActiveBeat().beatDuration-dt)
            expected += getActiveBeat().beatDuration
            timeOutId.current = setTimeout(()=>step(),getActiveBeat().beatDuration-dt)
        }
    }

    function stopMetronome(){
        clearTimeout(timeOutId.current as NodeJS.Timeout)
        resetSong()
    }



    const contextValues = {
        getSong: getSong,
        getActiveMeter: getActiveMeter,
        getNumerator: getNumerator,
        setNumerator: setNumerator,
        getDenominator: getDenominator,
        setDenominator: setDenominator,
        setAccent: setAccent,
        getTempo: getTempo,
        setTempo: setTempo,
        toggle: toggle,
        incrementBeat: incrementBeat
    }
    
    return(
        <SongContext.Provider value={contextValues}>
            {children}
        </SongContext.Provider>
    )
}
