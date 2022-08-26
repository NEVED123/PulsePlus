import { createContext, useState } from 'react'
import { Song, Meter, defaultMetronomeSong } from './structure'
import { changeDenominator, changeAccent, changeNumerator, ActiveMeter, changeTempo, tempo} from './SongFunctions'

const contextInitialValues = {
    song: defaultMetronomeSong, 
    updateNumerator:(numerator: number, resetAccents : boolean = true)=>{},
    updateDenominator:(denominator: number)=>{},
    updateAccent:(beatNumber: number)=>{},
    getActiveMeter: () : Meter => {return {initBpm: 0, finalBpm: 0, denominator: 0, repeat: 0, active: false, beats:[]}},
    updateTempo: (newTempo: number) => {},
    getTempo: (): number => {return 0}
}


export const SongContext = createContext(contextInitialValues) //initial values make compiler happy

export function SongProvider({ children } : { children : any }){

    const [song, setSong] = useState(defaultMetronomeSong)

    function updateNumerator(numerator: number, resetAccents : boolean = true){
        setSong(changeNumerator(song, numerator, resetAccents))
    }

    function updateDenominator(denominator: number){
        setSong(changeDenominator(song, denominator))
    }

    function updateAccent(beatNumber: number){
        setSong(changeAccent(song, beatNumber))
    }

    function getActiveMeter(){
        return ActiveMeter(song)
    }

    function updateTempo(newTempo: number){
        return setSong(changeTempo(song, newTempo))
    }

    function getTempo(){
        return tempo(song)
    }

    //console.assert(getTempo === undefined)

    return(
        <SongContext.Provider value={{song, updateNumerator, updateDenominator, updateAccent, getActiveMeter, updateTempo, getTempo}}>
            {children}
        </SongContext.Provider>
    )
}

