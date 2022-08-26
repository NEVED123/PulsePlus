import { createContext, useState } from 'react'
import { Song, Meter, defaultMetronomeSong } from './structure'
import { changeDenominator, changeAccent, changeNumerator, ActiveMeter, changeTempo, tempo} from './SongFunctions'

const contextInitialValues = {
    song: defaultMetronomeSong, 
    setNumerator:(numerator: number, resetAccents : boolean = true)=>{},
    setDenominator:(denominator: number)=>{},
    setAccent:(beatNumber: number)=>{},
    getActiveMeter: () : Meter => {return {initBpm: 0, finalBpm: 0, denominator: 0, repeat: 0, active: false, beats:[]}},
    setTempo: (newTempo: number) => {},
    getTempo: (): number => {return 0}
}


export const SongContext = createContext(contextInitialValues) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    const [song, setSong] = useState(defaultMetronomeSong)

    function setNumerator(numerator: number, resetAccents : boolean = true){
        setSong(changeNumerator(song, numerator, resetAccents))
    }

    function setDenominator(denominator: number){
        setSong(changeDenominator(song, denominator))
    }

    function setAccent(beatNumber: number){
        setSong(changeAccent(song, beatNumber))
    }

    function getActiveMeter(){
        return ActiveMeter(song)
    }

    function setTempo(newTempo: number){
        return setSong(changeTempo(song, newTempo))
    }

    function getTempo(){
        return tempo(song)
    }

    return(
        <SongContext.Provider value={{song, setNumerator, setDenominator, setAccent, getActiveMeter, setTempo, getTempo}}>
            {children}
        </SongContext.Provider>
    )
}

