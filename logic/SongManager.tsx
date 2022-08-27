import { createContext, useState } from 'react'
import { Song, Meter, defaultMetronomeSong } from './structure'
import { activeMeter, changeDenominator, 
    changeAccent, denominator, 
    changeNumerator, 
    changeTempo, 
    tempo, 
    numerator} from './SongFunctions'

export const SongContext = createContext({})

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

