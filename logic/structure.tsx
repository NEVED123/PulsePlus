export type Beat = {
    beatSound : number, //refers to the index of the preset the user is using
    subDiv : number[] //from subdivisions constant
    beatDuration : number //milliseconds
    active : boolean //property to determine whether this beat is currently alive for UI purposes, may not be necessary
}

export type Meter = {
    initBpm : number
    finalBpm? : number //for accel/decel
    denominator : number
    repeat : number //for measures with the same traits
    active: boolean
    beats : Beat[]
}

export type Song = {
    song : Meter[]
    repeat : boolean 
    name : string
    author : string
    date : string
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

const Clave : ClickSound = {
    name: 'clave',
    file : require('../assets/sounds/clave.mp3')
}

const Woodblock : ClickSound = {
    name : 'woodblock',
    file : require("../assets/sounds/woodblock.mp3")
}

const Silence : ClickSound = {
    name : 'silence',
    file : require("../assets/sounds/silence.mp3")
}

const Tom : ClickSound = {
    name : 'tom',
    file : require("../assets/sounds/tom.mp3")
}

const Snare : ClickSound = {
    name : 'snare',
    file : require("../assets/sounds/snare.mp3")
}

//This could maybe be an array??? it feels weird doing that though but literally every time I use this
//I turn it into an array
export const BeatSounds = {
    clave : Clave,
    woodblock : Woodblock,
    tom : Tom,
    snare : Snare,
    silence : Silence
}


export const BeatSoundPresets = {
    "default" : [Clave, Woodblock, Silence]
    //More settings, the user could add their own
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
    }],
    repeat: true,
    name: "Default",
    author: "",
    date: ""
}