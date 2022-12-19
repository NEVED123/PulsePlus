import { Song, Meter, Beat, Subdivisions, BeatSoundPresets } from './structure'
import _ from 'lodash'

/**
 * @returns copy of active meter
 */
export function getActiveMeter(song: Song) : Meter {
    const meter = _.cloneDeep(song).song.find(meter => meter.active == true)

    if(meter != undefined){
        return meter
    }

    throw new Error('No active meter in song')
}

export function getActiveMeterIndex(song: Song) : number {
    const meterIndex = _.cloneDeep(song).song.findIndex(meter => meter.active == true)

    if(meterIndex != -1){
        return meterIndex
    }

    throw new Error('No active meter in song')
}

export function getActiveBeat(song: Song) : Beat {

    const activeMeter = getActiveMeter(song)
    const beat = activeMeter.beats.find(beat => beat.active == true)

    if(beat != undefined){
        return beat
    }

    throw new Error('No active beat in song')
}

export function getActiveBeatIndex(song: Song) : number{
    const activeMeter = getActiveMeter(song)
    const beatIndex = activeMeter.beats.findIndex(beat => beat.active == true)

    if(beatIndex != -1){
        return beatIndex
    }

    throw new Error('No active beat in song')
}

/**
 * @returns numerator of active meter
 */
export function getNumerator(song: Song) : number{

    const num = getActiveMeter(song).beats.length
    
    if(num > 0){
        return num
    }

    throw new Error('no beats found in active meter, numerator = 0')

}

/**
 * 
 * @param song 
 * @param numerator 
 * @param resetAccents 
 * @returns song
 * @description new instance of song with updated numerator to active meter
 */
export function setNumerator(song : Song, numerator: number, resetAccents : boolean = true): Song {

    const updatedSong = _.cloneDeep(song)

    const activeMeter = getActiveMeter(song)
    const { beatDuration } = activeMeter.beats[0]

    if(resetAccents){
        const newMeter : Beat[] = new Array(numerator)
        for(let i = 0;i<numerator;i++){ //your java is showing
            newMeter[i] = ({beatSound: 0, 
                subDiv: Subdivisions.none, 
                beatDuration: beatDuration, 
                active: false})
        }

        activeMeter.beats = newMeter
    }
    else{

        const originalNumerator = activeMeter.beats.length

        const beatsToAdd = numerator - originalNumerator

        if(beatsToAdd > 0){
            const addedBeats : Beat[] = new Array(beatsToAdd)
            for(let i = 0; i<beatsToAdd; i++){ //your java is showing
                addedBeats[i] = {beatSound: 0, 
                    subDiv: Subdivisions.none, 
                    beatDuration: beatDuration, 
                    active: false}
            }
            
            activeMeter.beats = activeMeter.beats.concat(addedBeats)
        }
        else{
            const beatsToRemove = Math.abs(beatsToAdd)
            for(let i = 0;i<beatsToRemove;i++){
                activeMeter.beats.pop()
            }
        }
    }

    updatedSong.song[getActiveMeterIndex(song)] = activeMeter
    updatedSong.song[0].active = true
    updatedSong.song[0].beats[0].active = true

    return updatedSong
}

/**
 * @returns denominator of active meter
 */
export function getDenominator(song: Song){
    return getActiveMeter(song).denominator
}

/**
 * 
 * @param song 
 * @param denominator 
 * @returns new instance of song with updaed denominator in active meter
 */
export function setDenominator(song: Song, denominator: number): Song {
    const updatedSong = _.cloneDeep(song)
    updatedSong.song[getActiveMeterIndex(updatedSong)].denominator = denominator
    return updatedSong
}

/**
 * 
 * @param song 
 * @param beatIndex 
 * @returns new instance of song with updated accent on beat in active meter 
 */
export function setAccent(song: Song, beatIndex: number): Song {
    const updatedSong = _.cloneDeep(song)
    const activeMeter = getActiveMeter(song)
    const accent = activeMeter.beats[beatIndex].beatSound
    if(beatIndex<activeMeter.beats.length){
        updatedSong.song[getActiveMeterIndex(song)].beats[beatIndex].beatSound = accent < BeatSoundPresets['default'].length - 1 ? accent + 1 : 0
    }
    else{
        throw new Error('Given beat index does not exist in active meter')
    }
    
    return updatedSong
}

/**
 * 
 * @param song 
 * @param newTempo 
 * @returns void
 * @description sets tempo for each beat in active meter
 */
export function setTempo(song: Song, newTempo: number){
    const updatedSong = _.cloneDeep(song)

    const activeMeter = updatedSong.song[getActiveMeterIndex(song)]
    activeMeter.initBpm = newTempo

    for(let i = 0; i<activeMeter.beats.length;i++){
        activeMeter.beats[i].beatDuration = 60000/newTempo
    }

    return updatedSong
}

/**
 * 
 * @param song 
 * @returns number
 * @description gets tempo from active meter
 */
export function getTempo(song: Song){
    const duration = getActiveBeat(song).beatDuration

    return 60000/duration
}

/**
 * 
 * @param song 
 * @returns void
 * @description resets song
 */
export function resetSong(song: Song) : Song{

    const updatedSong = _.cloneDeep(song)
    
    updatedSong.song[getActiveMeterIndex(song)].beats[getActiveBeatIndex(song)].active = false
    updatedSong.song[getActiveMeterIndex(song)].active = false

    updatedSong.song[0].active = true
    updatedSong.song[0].beats[0].active = true

    return updatedSong
}

/**
 * 
 * @param song 
 * @returns void
 * @description sets the active attribute from the current active beat to the one
 * after, skipping to the next meter if necessary
 *
 */

//TODO: CHECK FOR REPEAT ATTRIBUTES ON SONG, METER
export function incrementBeat(song: Song){

    const updatedSong = _.cloneDeep(song)

    const activeMeter = getActiveMeter(song)
    const meterIndex = getActiveMeterIndex(song)
    const beatIndex = getActiveBeatIndex(song)

    updatedSong.song[meterIndex].beats[beatIndex].active = false 

    if(beatIndex < activeMeter.beats.length-1) 
        //we still have more beats in the active meter
        updatedSong.song[meterIndex].beats[beatIndex + 1].active = true
    else{

        //we have no more beats in the active meter, and must switch to the next meter 
        updatedSong.song[meterIndex].active = false
        
        if(meterIndex < updatedSong.song.length-1){ 
            //there is another meter in the measure
            
            updatedSong.song[meterIndex+1].active=true
            updatedSong.song[meterIndex+1].beats[0].active=true
        }
        else{
            //loops back to beginning for now, will depend on repeat attribute
            updatedSong.song[0].active=true
            updatedSong.song[0].beats[0].active=true
        }
    }

    return updatedSong
}


