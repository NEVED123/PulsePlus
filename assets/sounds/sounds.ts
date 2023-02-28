import { ClickSound } from "../../logic/structure"

const Clave : ClickSound = {
    name: 'clave',
    file : require('./clave.mp3')
}

const Woodblock : ClickSound = {
    name : 'woodblock',
    file : require("./woodblock.mp3")
}

const Silence : ClickSound = {
    name : 'silence',
    file : require("./silence.mp3")
}

const Tom : ClickSound = {
    name : 'tom',
    file : require("./tom.mp3")
}

const Snare : ClickSound = {
    name : 'snare',
    file : require("./snare.mp3")
}

export const BeatSounds = {
    clave : Clave,
    woodblock : Woodblock,
    tom : Tom,
    snare : Snare,
    silence : Silence
}

export const BeatSoundPresets = {
    default : [Clave, Woodblock, Silence]
    //More settings, the user could add their own
}