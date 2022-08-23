type Beat = {
    beatSound : number, //refers to the index of the preset the user is using
    subDiv : number[] //from subdivisions constant
    beatDuration : number //milliseconds
    active : boolean //property to determine whether this beat is currently alive for UI purposes, may not be necessary
}

type Meter = {
    initBpm : number
    finalBpm : number //for accel/decel
    numerator : number
    denominator : number
    repeat : number //for measures with the same traits
    beats : Beat[]
}

type Song = {
    song : Meter[]
    repeat : boolean 
    name : string
    author : string
    date : string
}


//possible to have more numbers indicating different sounds, tbd
const Subdivisions = {
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


const BeatSounds = {
    woodblock : "woodblock.mp3",
    silence: "silence.mp3",
    clave : "clave.mp3"
    //sound : "path to mp3 file"
    //etc.
}

const BeatSoundPresets = {
    "default" : [BeatSounds.woodblock, BeatSounds.clave, BeatSounds.silence]
    //More settings, the user could add their own
}

export const defaultMetronomeSong : Song = {
    song:[{
        initBpm: 100,
        finalBpm : 100,
        numerator: 4,
        denominator: 4,
        repeat : 1,
        beats:[{
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
        },
        {
            beatSound : 0,
            subDiv : Subdivisions.none,
            beatDuration: 600, // 60/100 * 1000 
            active : false
        }
        ]
    }],
    repeat: true,
    name: "Default",
    author: "",
    date: ""
}