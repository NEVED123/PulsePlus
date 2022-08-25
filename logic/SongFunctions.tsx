import { Song, Meter, Beat, Subdivisions } from './structure'

/**
 * 
 * @param song 
 * @returns copy of meter where "active" == true
 */
export function ActiveMeter(song : Song) : Meter {
    const songClone = {...song}
    const meter = songClone.song.find(meter => meter.active == true)

    if(meter != undefined){
        return meter
    }

    throw new Error('No active meter in song')
}

/**
 * 
 * @param song 
 * @param numerator 
 * @param resetAccents 
 * @returns new instance of song with updated numerator to active meter
 */
export function changeNumerator(song : Song, numerator: number, resetAccents : boolean = true): Song {
    
    console.log(numerator)
    const updatedSong = {...song} //copies instance of song
    const { beatDuration } = ActiveMeter(updatedSong).beats[0]

    if(resetAccents){
        const newMeter : Beat[] = new Array(numerator)
        for(let i = 0;i<numerator;i++){
            newMeter[i] = ({beatSound: 0, 
                subDiv: Subdivisions.none, 
                beatDuration: beatDuration, 
                active: false})
        }

        ActiveMeter(updatedSong).beats = newMeter
    }
    else{
        const originalNumerator = ActiveMeter(updatedSong).beats.length
        const beatsToAdd = numerator - originalNumerator
        if(beatsToAdd > 0){
            const addedBeats : Beat[] = new Array(beatsToAdd)
                .fill({beatSound: 0,
                    subDiv: Subdivisions.none,
                    beatDuration: beatDuration,
                    active: false})
            
            ActiveMeter(updatedSong).beats.concat(addedBeats)
        }
        else{
            const beatsToRemove = Math.abs(beatsToAdd)
            for(let i = 0;i<beatsToRemove;i++){
                ActiveMeter(updatedSong).beats.pop()
            }
        }
    }

    console.log(updatedSong)
    return updatedSong
}

/**
 * 
 * @param song 
 * @param denominator 
 * @returns new instance of song with updaed denominator in active meter
 */
export function changeDenominator(song: Song, denominator: number): Song {
    const updatedSong = {...song} //copies instance of song
    ActiveMeter(updatedSong).denominator = denominator
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
    const accent = ActiveMeter(updatedSong).beats[beatNumber].beatSound
    ActiveMeter(updatedSong).beats[beatNumber].beatSound = accent < 2 ? accent + 1 : 0

    return updatedSong
}


//add section to song

