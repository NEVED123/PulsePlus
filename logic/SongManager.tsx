import { createContext, useState } from 'react'
import { Song, Meter, defaultMetronomeSong } from './structure'
import { activeMeter, changeDenominator, 
    changeAccent, denominator, 
    changeNumerator, 
    changeTempo, 
    tempo, 
    numerator} from './SongFunctions'

const contextInitialValues = {
    song: defaultMetronomeSong,
    getActiveMeter: (): Meter => {return {initBpm: 0, denominator: 0, repeat: 0, active: false, beats: []}},
    getNumerator:(): number => {return 0},
    setNumerator:(numerator: number, resetAccents : boolean = true)=>{},
    getDenominator: (): number => {return 0},
    setDenominator:(denominator: number)=>{},
    setAccent:(beatNumber: number)=>{},
    getTempo: (): number => {return 0},
    setTempo: (newTempo: number) => {},
}


export const SongContext = createContext(contextInitialValues) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    const [song, setSong] = useState(defaultMetronomeSong)

    function getActiveMeter(){
        return activeMeter({...song})
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

    const contextValues = {
        song: defaultMetronomeSong,
        getActiveMeter: getActiveMeter,
        getNumerator: getNumerator,
        setNumerator: setNumerator,
        getDenominator: getDenominator,
        setDenominator: setDenominator,
        setAccent: setAccent,
        getTempo: getTempo,
        setTempo: setTempo
    }
    
    return(
        <SongContext.Provider value={contextValues}>
            {children}
        </SongContext.Provider>
    )
}

