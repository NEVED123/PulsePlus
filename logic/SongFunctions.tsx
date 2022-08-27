import { Song, Meter, Beat, Subdivisions, BeatSoundPresets } from './structure'

/**
 * DO NOT EXPORT, ONLY USE AS A HELPER FUNCTION
 * @param song 
 * @returns refence to meter where "active" == true
 */
 function activeMeterReference(song : Song) : Meter {

    const meter = song.song.find(meter => meter.active == true)

    if(meter != undefined){
        return meter
    }

    throw new Error('No active meter in song')
}

//getSong() is only one line, and is defined in SongManager.tsx

/**
 * @returns copy of active meter
 */
export function activeMeter(song: Song){
    return activeMeterReference({...song})
}

/**
 * @returns numerator of active meter
 */
export function numerator(song: Song){
    return activeMeterReference({...song}).beats.length
}

/**
 * 
 * @param song 
 * @param numerator 
 * @param resetAccents 
 * @returns new instance of song with updated numerator to active meter
 */
export function changeNumerator(song : Song, numerator: number, resetAccents : boolean = true): Song {
    
    const updatedSong = {...song} //copies instance of song
    const { beatDuration } = activeMeterReference(updatedSong).beats[0]

    if(resetAccents){
        const newMeter : Beat[] = new Array(numerator)
        for(let i = 0;i<numerator;i++){ //your java is showing
            newMeter[i] = ({beatSound: 0, 
                subDiv: Subdivisions.none, 
                beatDuration: beatDuration, 
                active: false})
        }

        activeMeterReference(updatedSong).beats = newMeter
    }
    else{

        const originalNumerator = activeMeterReference(updatedSong).beats.length

        const beatsToAdd = numerator - originalNumerator

        if(beatsToAdd > 0){
            const addedBeats : Beat[] = new Array(beatsToAdd)
            for(let i = 0; i<beatsToAdd; i++){ //your java is showing
                addedBeats[i] = {beatSound: 0, 
                    subDiv: Subdivisions.none, 
                    beatDuration: beatDuration, 
                    active: false}
            }
            
            activeMeterReference(updatedSong).beats = activeMeterReference(updatedSong).beats.concat(addedBeats)
        }
        else{
            const beatsToRemove = Math.abs(beatsToAdd)
            for(let i = 0;i<beatsToRemove;i++){
                activeMeterReference(updatedSong).beats.pop()
            }
        }
    }

    return updatedSong
}

/**
 * @returns denominator of active meter
 */
export function denominator(song: Song){
    return activeMeterReference({...song}).denominator
}

/**
 * 
 * @param song 
 * @param denominator 
 * @returns new instance of song with updaed denominator in active meter
 */
export function changeDenominator(song: Song, denominator: number): Song {
    const updatedSong = {...song} //copies instance of song
    activeMeterReference(updatedSong).denominator = denominator
    return updatedSong
}

/**
 * 
 * @param song 
 * @param beatNumber 
 * @returns new instance of song with updated accent on beat in active meter 
 */
export function changeAccent(song: Song, beatNumber: number): Song {
    const updatedSong = {...song}
    const accent = activeMeterReference(updatedSong).beats[beatNumber].beatSound
    activeMeterReference(updatedSong).beats[beatNumber].beatSound = accent < BeatSoundPresets['default'].length - 1 ? accent + 1 : 0

    return updatedSong
}

export function changeTempo(song: Song, newTempo: number){
    const updatedSong = {...song}

    activeMeterReference(updatedSong).initBpm = newTempo

    return updatedSong
}

export function tempo(song: Song){
    return activeMeterReference({...song}).initBpm
}

//add section to song

//nextBeat

//nextMeter