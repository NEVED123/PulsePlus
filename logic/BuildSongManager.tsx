import { createContext, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong, BeatSounds } from './structure'
import _ from 'lodash'
import { Audio, AVPlaybackSource } from 'expo-av'
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
import { PreferencesContext } from './PreferencesManager'

export const BuildSongContext = createContext(0 as any) //initial values make compiler happy

export function BuildSongProvider({ children } : { children : any }){

    const [song, setSong] = useState(defaultMetronomeSong)

    const contextValues = {
        getSong: ()=>{_.cloneDeep(song)},
        activeMeter: getActiveMeter(song),
        activeMeterIndex: getActiveMeterIndex(song),
        numerator: getNumerator(song),
        setNumerator: (numerator: number) => {setSong(setNumerator(song, numerator))},
        denominator: getDenominator(song),
        setDenominator: (denominator: number) => {setSong(setDenominator(song, denominator))},
        setAccent: (beatNumber: number) => {setSong(setAccent(song, beatNumber))},
        tempo: getTempo(song),
        setTempo: (tempo: number)=>{setSong(setTempo(song, tempo))},
        resetSong: () => {setSong(resetSong(song))},
        incrementBeat: ()=>{setSong(incrementBeat(song))}
    }
    
    return(
        <BuildSongContext.Provider value={contextValues}>
            {children}
        </BuildSongContext.Provider>
    )
}

