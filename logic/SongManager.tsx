import { createContext, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong, multiMeterTestMetronomeSong, RunnableSongFunctions } from './structure'
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
    const [song, setSong] = useState(_.cloneDeep(multiMeterTestMetronomeSong))

    const requestRef = useRef(null as any)
    const prevTRef = useRef(performance.now())

    function toggleRunning(){
        setRunning(running == true ? false : true)
    }

    function step(timestamp: number) : void {

        const elapsed = timestamp - prevTRef.current

        if(!running){
            setSong(f.resetSong(song))
            return
        }

        const { beatDuration } = f.getActiveBeat(song)

        if(elapsed > beatDuration){
            setSong(f.incrementBeat(song))

            const { beatSound } = f.getActiveBeat(song)
            console.log(elapsed-beatDuration)

            playSound(beatSound)
            prevTRef.current = timestamp
        }

        requestRef.current = requestAnimationFrame(step);

    }

    useEffect(()=>{ 
        requestRef.current = requestAnimationFrame(step)
        return () => cancelAnimationFrame(requestRef.current)
    },[running])

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
        setSongName : (name : string | undefined) => {setSong(f.setSongName(name, song))},
        incrementMeter: (wrapToBeginning? : boolean)=>{setSong(f.incrementMeter(song, wrapToBeginning))},
        decrementMeter: (wrapToEnd? : boolean) => {setSong(f.decrementMeter(song, wrapToEnd))},
        length : f.getSongLength(song),
        accel : f.getAccel(song),
        loadSong: (song: Song) => {setSong(_.cloneDeep(song))},
        running: running,
        toggleRunning: toggleRunning,
    }
    
    return(
        <SongContext.Provider value={contextValues}>
            {children}
        </SongContext.Provider>
    )
}

/*  // Stackoverflow demonstration of canceling animation frame request in react component
     const [count, setCount] = React.useState(0);
    const requestRef = React.useRef();
    const previousTimeRef = React.useRef(0);

  
  const animate = React.useCallback((time) => {
    console.log('       RUN:', requestRef.current);

    setCount((prevCount) => {  
      const deltaTime = time - previousTimeRef.current;   
      const nextCount = prevCount + deltaTime * 0.001;
      
      // We add 1 to the limit value to make sure the last valid value is
      // also displayed for one whole "frame":
      if (nextCount >= 11) {
        console.log('    CANCEL:', requestRef.current, '(this won\'t work as inteneded)');
        
        // This won't work:
        // cancelAnimationFrame(requestRef.current);
        
        // Instead, let's use this Ref to avoid calling `requestAnimationFrame` again:
        requestRef.current = null;
      }
      
      return nextCount >= 11 ? 0 : nextCount;
    });
    
    // If we have already reached the limit value, don't call `requestAnimationFrame` again:
    if (requestRef.current !== null) {
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
      console.log('- SCHEDULE:', requestRef.current);
    }     
  }, []);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
   */  
    
    /* // ATTEMPT 2: requestAnimationFrame

    let startTime : number | undefined = undefined
    
    //let running = false
    const [running, setRunning] = useState(false)
    const animationId = useRef(0)

    useEffect(()=>{
        if(running){
            animationId.current = requestAnimationFrame(start);
        }
        else   
            return ()=>cancelAnimationFrame(animationId.current)
    },[running])

    function toggle(){

        //running = (running == true ? false : true)
        setRunning(running == true ? false : true)

        // if(running){
        //     cancelAnimationFrame(animationId.current)
        //     return
        // }
        
        // animationId.current = requestAnimationFrame(start)
        // console.log(`animationId: ${animationId.current}`)
          
    }

    function start(timestamp: number){

        if(startTime == undefined){
            startTime = timestamp
        }

        const elapsed = timestamp - startTime

        if(elapsed > 585){
            console.log(elapsed)
            playSound()
            setSong(incrementBeat(song))
            startTime = timestamp
        }

        requestAnimationFrame(start)

        if(running){
            requestAnimationFrame(start)
        }
    }*/

   /* // ATTEMPT 1: setTimeout
    
    const [song, setSong] = useState(defaultMetronomeSong)
    const [running, setRunning] = useState(false)
    const timeOutId = useRef(0 as any)

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
        setSong(incrementBeat(song))
        timeOutId.current = setTimeout(()=>step(), getActiveBeat(song).beatDuration)

        function step(){
            const dt = Date.now() - expected

            setSong(incrementBeat(song))
            playSound()

            expected += getActiveBeat(song).beatDuration
            timeOutId.current = setTimeout(()=>step(),getActiveBeat(song).beatDuration-dt)
        }
    }

    function stopMetronome(){
        clearTimeout(timeOutId.current as NodeJS.Timeout)
        resetSong(song)
    }*/

        //context Values : useRef
    /*const contextValues = {
        getSong: ()=>{_.clone(songRef.current)},
        activeMeter: getActiveMeter(songRef.current),
        activeMeterIndex: getActiveMeterIndex(songRef.current),
        numerator: getNumerator(songRef.current),
        setNumerator: (numerator: number) => {songRef.current = (setNumerator(songRef.current, numerator))},
        denominator: getDenominator(songRef.current),
        setDenominator: (denominator: number) => {songRef.current = (setDenominator(songRef.current, denominator))},
        setAccent: (beatNumber: number) => {songRef.current = (setAccent(songRef.current, beatNumber))},
        tempo: getTempo(songRef.current),
        setTempo: (tempo: number)=>{songRef.current = (setTempo(songRef.current, tempo))},
        toggle: toggle,
        resetSong: () => {songRef.current = (resetSong(songRef.current))},
        incrementBeat: ()=>{songRef.current = (incrementBeat(songRef.current))}
    }*/
