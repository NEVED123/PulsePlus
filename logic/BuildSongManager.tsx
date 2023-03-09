import { createContext, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong, Subdivisions } from './structure'
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
    incrementBeat,
    getFinalTempo,
    setFinalTempo,
    setRepetitions,
    getRepetitions,
    setSectionName,
    getSectionName,
    incrementMeter,
    decrementMeter,
    addMeter,
    removeMeter,
    getSongLength,
    getAccel
} from './SongFunctions'
import { PreferencesContext } from './PreferencesManager'

const defaultBuildMetronomeSong : Song = {
    song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : true
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
        }
        ]
    },
    ],
    repeat: true,
    name: "Default",
    author: "",
    date: ""
}

export const BuildSongContext = createContext(0 as any) //initial values make compiler happy

export function BuildSongProvider({ children } : { children : any }){

    const [song, setSong] = useState(_.cloneDeep(defaultBuildMetronomeSong))

    const contextValues = {
        getSong: ()=>{return _.cloneDeep(song)},
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
        incrementBeat: ()=>{setSong(incrementBeat(song))},
        finalTempo: getFinalTempo(song),
        setFinalTempo: (finalTempo : number | undefined, accel : number | undefined) => {setSong(setFinalTempo(finalTempo, accel, song))},
        setRepetitions: (repeat: number) => {setSong(setRepetitions(repeat, song))},
        repetitions: getRepetitions(song),
        setSectionName: (sectionName: String) => {setSong(setSectionName(sectionName, song))},
        sectionName: getSectionName(song),
        incrementMeter: (wrapToBeginning? : boolean)=>{setSong(incrementMeter(song, wrapToBeginning))},
        decrementMeter: (wrapToEnd? : boolean) => {setSong(decrementMeter(song, wrapToEnd))},
        addMeter : () => {setSong(addMeter(song))},
        removeMeter : ()=>{setSong(removeMeter(song))},
        length : getSongLength(song),
        accel : getAccel(song),
        loadSong: (song: Song) => {setSong(_.cloneDeep(song))}
    }
    
    return(
        <BuildSongContext.Provider value={contextValues}>
            {children}
        </BuildSongContext.Provider>
    )
}

