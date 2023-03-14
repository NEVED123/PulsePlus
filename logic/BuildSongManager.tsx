import { createContext, useState, useRef, useEffect, useContext, useLayoutEffect } from 'react'
import { Song, Meter, Beat, defaultMetronomeSong, Subdivisions, BuildSongFunctions } from './structure'
import _ from 'lodash'
import { Audio, AVPlaybackSource } from 'expo-av'
import * as f from './SongFunctions'
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
}

let contextValues = {} as BuildSongFunctions

export const BuildSongContext = createContext(contextValues) //initial values make compiler happy

export function BuildSongProvider({ children } : { children : any }){

    const [song, setSong] = useState(_.cloneDeep(defaultBuildMetronomeSong))

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
        incrementBeat: ()=>{setSong(f.incrementBeat(song))},
        finalTempo: f.getFinalTempo(song),
        setFinalTempo: (finalTempo : number | undefined, accel : number | undefined) => {setSong(f.setFinalTempo(finalTempo, accel, song))},
        setRepetitions: (repeat: number) => {setSong(f.setRepetitions(repeat, song))},
        repetitions: f.getRepetitions(song),
        setSectionName: (sectionName: string) => {setSong(f.setSectionName(sectionName, song))},
        sectionName: f.getSectionName(song),
        songName : f.getSongName(song),
        setSongName : (name : string | undefined) => {setSong(f.setSongName(name, song))},
        author : f.getAuthor(song),
        setAuthor : (author: string | undefined) => {setSong(f.setAuthor(author, song))},
        incrementMeter: (wrapToBeginning? : boolean)=>{setSong(f.incrementMeter(song, wrapToBeginning))},
        decrementMeter: (wrapToEnd? : boolean) => {setSong(f.decrementMeter(song, wrapToEnd))},
        addMeter : () => {setSong(f.addMeter(song))},
        removeMeter : ()=>{setSong(f.removeMeter(song))},
        length : f.getSongLength(song),
        accel : f.getAccel(song),
        loadSong: (song: Song) => {setSong(_.cloneDeep(song))}
    }
    
    return(
        <BuildSongContext.Provider value={contextValues}>
            {children}
        </BuildSongContext.Provider>
    )
}

