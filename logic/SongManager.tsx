import React, { createContext, useState, useRef } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong } from './structure'
import { Audio } from 'expo-av'
import {getActiveMeter, 
    getActiveMeterIndex, 
    setDenominator, 
    getActiveBeat,
    setAccent, 
    setNumerator, 
    setTempo, 
    getTempo, 
    getNumerator,
    getDenominator,
    resetSong,
    incrementBeat} from './SongFunctions'

export const SongContext = createContext(0 as any) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    const [song, setSong] = useState(defaultMetronomeSong)
    const [running, setRunning] = useState(false)

    //'ENGINE' OF THE METRONOME

    //Chat GPT suggestion 👀
    // const startTime = performance.now();

    // function update() {
    //   const elapsedTime = performance.now() - startTime;
    
    //   if (elapsedTime > 500) {
    //     // perform action here
    //   } else {
    //     requestAnimationFrame(update);
    //   }
    // }

    // requestAnimationFrame(update);
    
    const timeOutId = useRef(0 as any)
    const [sound, setSound] = useState(0 as any)

    async function playSound() {

        const { sound } = await Audio.Sound.createAsync(require('../assets/sounds/clave.mp3'));

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

        let expected = Date.now() + getActiveBeat(song).beatDuration

        playSound()
        //setSong(incrementBeat(song))
        timeOutId.current = setTimeout(()=>step(), getActiveBeat(song).beatDuration)

        function step(){
            const dt = Date.now() - expected

            //setSong(incrementBeat(song))
            playSound()

            console.log(dt)
            expected += getActiveBeat(song).beatDuration
            timeOutId.current = setTimeout(()=>step(),getActiveBeat(song).beatDuration-dt)
        }
    }

    function stopMetronome(){
        clearTimeout(timeOutId.current as NodeJS.Timeout)
        resetSong(song)
    }

    const contextValues = {
        getSong: {...song},
        activeMeter: getActiveMeter(song),
        activeMeterIndex: getActiveMeterIndex(song),
        numerator: getNumerator(song),
        setNumerator: (numerator: number) => {setSong(setNumerator(song, numerator))},
        denominator: getDenominator(song),
        setDenominator: (denominator: number) => {setSong(setDenominator(song, denominator))},
        setAccent: (beatNumber: number) => {setSong(setAccent(song, beatNumber))},
        tempo: getTempo(song),
        setTempo: (tempo: number)=>{setSong(setTempo(song, tempo))},
        toggle: toggle,
        resetSong: () => {setSong(resetSong(song))},
        incrementBeat: ()=>{setSong(incrementBeat(song))}
    }
    
    return(
        <SongContext.Provider value={contextValues}>
            {children}
        </SongContext.Provider>
    )
}
