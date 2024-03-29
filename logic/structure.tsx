export type Beat = {
    beatSound : number, //refers to the index of the preset the user is using
    subDiv : number[] //from subdivisions constant
    active : boolean //property to determine whether this beat is currently alive for UI purposes, may not be necessary
}

export type Meter = {
    initBpm : number
    finalBpm? : number //for accel/decel
    accel? : number
    denominator : number
    repeat : number //for measures with the same traits
    active: boolean
    beats : Beat[]
    sectionName? : string
}

export type Metadata = {
    name : string
    author : string
    date : string
}

export type Song = {
    song : Meter[]
    repeat : boolean 
    metadata? : Metadata
}

export interface SongFunctions {
    song: Song,
    activeMeter: Meter,
    activeMeterIndex: number,
    setActiveMeterIndex : (index: number) => void
    numerator: number,
    setNumerator: (numerator: number) => void,
    denominator: number,
    setDenominator: (denominator: number) => void,
    setAccent: (beatNumber: number) => void,
    tempo : number
    setTempo: (tempo: number)=> void,
    finalTempo: number | undefined,
    repetitions: number,
    accel : number | undefined,
    songName : string | undefined,
    length : number,
    incrementBeat: ()=> void,
    incrementMeter: (wrapToBeginning? : boolean)=> void,
    decrementMeter: (wrapToEnd? : boolean) => void,
    setSong: (song: Song) => void,
}

export interface BuildSongFunctions extends SongFunctions{
    date : string | undefined,
    author : string | undefined,
    songName : string | undefined 
    metadata: Metadata | undefined,
    setMetadata: (metadata : Metadata) => void,
    setSectionName: (sectionName: string) => void,
    sectionName: string | undefined,
    setRepetitions: (repeat: number) => void,
    setFinalTempo: (finalTempo : number | undefined, accel : number | undefined) => void,
    addMeter : () => void,
    removeMeter : ()=> void,
}

export interface RunnableSongFunctions extends SongFunctions{
    running : boolean,
    toggleRunning : () => void,
    resetSong: () => void,
}


//possible to have more numbers indicating different sounds, tbd
export const Subdivisions = {
    none: [1],
    two:{
        "01":[0,1],
        "11":[1,1]
    },
    three:{
        "001":[0,0,1],
        "010":[0,1,0],
        "011":[0,1,1],
        "101":[1,0,1],
        "110":[1,1,0],
        "111":[1,1,1]
    },
    four:{
        "0001":[0,0,0,1],
        "0010":[0,0,1,0],
        "0011":[0,0,1,1],
        "0100":[0,1,0,0],
        "0101":[0,1,0,1],
        "0110":[0,1,1,0],
        "0111":[0,1,1,1],
        "1001":[1,0,0,1],
        "1011":[1,0,1,1],
        "1100":[1,1,0,0],
        "1101":[1,1,0,1],
        "1110":[1,1,1,0],
        "1111":[1,1,1,1]
    },
    five: [1,1,1,1,1], //for anything over 5, specific subdivision patterns are not necessary
    six: [1,1,1,1,1,1],
    seven: [1,1,1,1,1,1,1],
    eight: [1,1,1,1,1,1,1,1],
    nine: [1,1,1,1,1,1,1,1,1]
}

export type ClickSound = {
    name : string,
    file : any
}

export const defaultMetronomeSong : Song = {
    song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        }
        ]
    }],
    repeat: true
}

export const multiMeterTestMetronomeSong : Song = {
    song:[{
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : true
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : false
        }
        ]
    },
    {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : true
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : true
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : true
        }]
    },
    {
        initBpm: 100,
        denominator: 4,
        repeat : 1,
        active: true,
        beats:[{
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : true
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            active : true
        }]
    }],
    repeat: true,
}