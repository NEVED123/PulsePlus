import { Song, Meter, Beat, Subdivisions } from './structure'
import _, { wrap } from 'lodash'
import { Metadata } from './structure'

/**
 * @returns copy of active meter
 */
export function getActiveMeter(song: Song) : Meter {
    const meter = _.clone(song).song.find(meter => meter.active == true)

    if(meter != undefined){
        return meter
    }

    throw new Error('No active meter in song')
}

export function getActiveMeterIndex(song: Song) : number {
    const meterIndex = _.clone(song).song.findIndex(meter => meter.active == true)

    if(meterIndex != -1){
        return meterIndex
    }

    throw new Error('No active meter in song')
}

export function setActiveMeterIndex(index : number, song: Song) : Song {
    const updatedSong = _.clone(song)

    updatedSong.song[getActiveMeterIndex(updatedSong)].active = false
    updatedSong.song[index].active = true

    return updatedSong
}

export function getActiveBeat(song: Song) : Beat | undefined {

    const activeMeter = getActiveMeter(song)
    const beat = activeMeter.beats.find(beat => beat.active == true)

    return beat
}

export function getActiveBeatIndex(song: Song) : number{
    const activeMeter = getActiveMeter(song)
    const beatIndex = activeMeter.beats.findIndex(beat => beat.active == true)

    return beatIndex
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

    const updatedSong = _.clone(song)

    const activeMeterIndex = getActiveMeterIndex(updatedSong)

    if(resetAccents){
        const newMeter : Beat[] = new Array(numerator)
        for(let i = 0;i<numerator;i++){ //your java is showing
            newMeter[i] = ({beatSound: 0, 
                subDiv: Subdivisions.none, 
                active: false})
        }

        updatedSong.song[activeMeterIndex].beats = newMeter
    }
    else{

        const originalNumerator = updatedSong.song[activeMeterIndex].beats.length

        const beatsToAdd = numerator - originalNumerator

        if(beatsToAdd > 0){
            const addedBeats : Beat[] = new Array(beatsToAdd)
            for(let i = 0; i<beatsToAdd; i++){ //your java is showing
                addedBeats[i] = {beatSound: 0, 
                    subDiv: Subdivisions.none, 
                    active: false}
            }
            
            //activeMeter.beats = activeMeter.beats.concat(addedBeats)

            updatedSong.song[activeMeterIndex].beats = updatedSong.song[activeMeterIndex].beats.concat(addedBeats)
        }
        else{
            const beatsToRemove = Math.abs(beatsToAdd)
            for(let i = 0;i<beatsToRemove;i++){
                updatedSong.song[activeMeterIndex].beats.pop()
            }
        }
    }

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
    const updatedSong = _.clone(song)
    updatedSong.song[getActiveMeterIndex(updatedSong)].denominator = denominator
    return updatedSong
}

/**
 * 
 * @param song 
 * @param beatIndex 
 * @returns new instance of song with updated accent on beat in active meter 
 */
export function setAccent(song: Song, beatIndex: number, numberOfAccents: number = 3): Song {
    const updatedSong = _.clone(song)
    const activeMeter = getActiveMeter(song)
    const accent = activeMeter.beats[beatIndex].beatSound
    if(beatIndex<activeMeter.beats.length){
        updatedSong.song[getActiveMeterIndex(song)].beats[beatIndex].beatSound = accent < numberOfAccents - 1 ? accent + 1 : 0
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
    const updatedSong = _.clone(song)

    updatedSong.song[getActiveMeterIndex(updatedSong)].initBpm = newTempo

    return updatedSong
}

/**
 * 
 * @param song 
 * @returns number
 * @description gets tempo from active meter
 */
export function getTempo(song: Song){
    const updatedSong = _.clone(song)

    return updatedSong.song[getActiveMeterIndex(updatedSong)].initBpm
}

/**
 * 
 * @param song 
 * @returns void
 * @description resets song
 */
export function resetSong(song: Song) : Song{

    const updatedSong = _.clone(song)
    
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

    const updatedSong = _.clone(song)

    const activeMeter = getActiveMeter(song)
    const meterIndex = getActiveMeterIndex(song)
    const beatIndex = getActiveBeatIndex(song)

    //sets first beat to active if there is no active beat in song

    if(beatIndex == -1){
        updatedSong.song[meterIndex].beats[0].active = true
        return _.clone(updatedSong)
    }

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

export function getFinalTempo(song: Song){
    const activeMeter =  getActiveMeter(song)

    return activeMeter.finalBpm
}

export function setFinalTempo(finalBpm : number | undefined, accel : number | undefined, song: Song,){
    const updatedSong = _.clone(song)
    const activeMeterIndex = getActiveMeterIndex(updatedSong)

    updatedSong.song[activeMeterIndex].finalBpm = finalBpm

    if(accel != undefined){
        if(finalBpm != undefined){
            updatedSong.song[activeMeterIndex].accel = accel
            
        }
        else{
            updatedSong.song[activeMeterIndex].accel = undefined
            console.warn('Cannot set accel coefficient with undefined final BPM.')
        }
    }
    else{
        updatedSong.song[activeMeterIndex].accel = (finalBpm != undefined) ? 0 : undefined
    }
    
    return updatedSong
}

export function incrementMeter(song: Song, wrapToBeginning? : boolean){

    const updatedSong = _.clone(song)

    const activeMeterIndex = getActiveMeterIndex(updatedSong)
    const songLength = updatedSong.song.length

    if(activeMeterIndex == songLength - 1){
        //the activeMeter is the last meter
        if(wrapToBeginning === true){
            updatedSong.song[activeMeterIndex].active = false
            updatedSong.song[0].active = true
        }
        else{
            return updatedSong
        }
    }
    else{
        updatedSong.song[activeMeterIndex].active = false
        updatedSong.song[activeMeterIndex+1].active = true
    }

    return updatedSong
}

export function decrementMeter(song: Song, wrapToEnd? : boolean){
    const updatedSong = _.clone(song)

    const activeMeterIndex = getActiveMeterIndex(updatedSong)
    const songLength = updatedSong.song.length

    if(activeMeterIndex == 0){
        //the activeMeter is the first meter
        if(wrapToEnd === true){
            updatedSong.song[0].active = false
            updatedSong.song[songLength-1].active = true
        }
        else{
            return updatedSong
        }
    }
    else{
        updatedSong.song[activeMeterIndex].active = false
        updatedSong.song[activeMeterIndex-1].active = true
    }

    return updatedSong
}

export function setRepetitions(repeat: number, song:Song){

    const updatedSong = _.clone(song)

    updatedSong.song[getActiveMeterIndex(updatedSong)].repeat = repeat

    return updatedSong
}

export function getRepetitions(song:Song) : number {
    return song.song[getActiveMeterIndex(song)].repeat
}   

export function setSectionName(sectionName: string, song:Song) : Song {
    const updatedSong = _.clone(song)

    updatedSong.song[getActiveMeterIndex(updatedSong)].sectionName = sectionName

    return updatedSong
}

export function getSectionName(song: Song) : string | undefined {
    const updatedSong = _.clone(song)

    return updatedSong.song[getActiveMeterIndex(song)].sectionName
}

export function addMeter(song: Song) : Song {
    let updatedSong = _.clone(song)

    const activeMeterIndex = getActiveMeterIndex(updatedSong)
    const newMeter = _.cloneDeep(getActiveMeter(updatedSong))
    const songLength = updatedSong.song.length

    newMeter.active = false
    newMeter.sectionName = undefined

    if(newMeter.finalBpm != undefined){
        newMeter.initBpm = newMeter.finalBpm
        newMeter.finalBpm = undefined
    }

    if(activeMeterIndex == songLength-1){
        //we are adding to the end of the array
        updatedSong.song = updatedSong.song.concat(newMeter)
    }
    else{
        updatedSong.song.splice(activeMeterIndex+1,0,newMeter)
    }

    updatedSong = incrementMeter(updatedSong)

    return updatedSong
}

export function removeMeter(song: Song) : Song {
    let updatedSong = _.clone(song)

    //if song only has one meter, return
    if(updatedSong.song.length == 1){
        return updatedSong
    }

    updatedSong = decrementMeter(updatedSong)

    const activeMeterIndex = getActiveMeterIndex(updatedSong)

    updatedSong.song.splice(activeMeterIndex+1, 1)

    return updatedSong
}

export function getSongLength(song: Song) : number {
    const updatedSong = _.clone(song)

    return updatedSong.song.length
}

export function getAccel(song: Song) : number | undefined {
    const updatedSong = _.clone(song)

    return getActiveMeter(updatedSong).accel
}

export function getSongName(song: Song) : string | undefined{
    return _.clone(song).metadata?.name
}



export function getAuthor(song: Song) : string | undefined {
    return _.clone(song).metadata?.author
}


export function getDate(song: Song) : string | undefined {
    return _.clone(song).metadata?.date
}

export function setMetadata(metadata: Metadata | undefined, song: Song) : Song {
    const updatedSong = _.clone(song)

    updatedSong.metadata = metadata

    return updatedSong
}

export function getMetadata(song: Song) : Metadata | undefined {
    return _.clone(song).metadata
}

export function getNextBeat(song: Song) : Beat {
    const incrementedSong = incrementBeat(song)

    const activeBeat = getActiveBeat(incrementedSong)

    //next beat should never be active by definition

    if(activeBeat == undefined){
        const updatedSong = _.clone(song)
        return _.clone(updatedSong.song[getActiveMeterIndex(updatedSong)].beats[0])
    }
    else{
        activeBeat.active = false
        return activeBeat
    }
}


