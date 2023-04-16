import AsyncStorage from "@react-native-async-storage/async-storage"
import { Song } from "../logic/structure"

export async function saveSong(song : Song){

    let name = song.metadata?.name

    if(name == undefined){
        throw new Error('Song has no name')
    }

    try{
        const jsonValue = JSON.stringify(song)
        await AsyncStorage.setItem(name, jsonValue)
    } catch(e){
        throw new Error('Failed to save song')
    }

}

export async function deleteSong(name: string) : Promise<any>{
    try{
        await AsyncStorage.removeItem(name)
    }
    catch{
        throw new Error('Failed to delete song')
    }
}

export async function loadSong(name: string) : Promise<Song | undefined>{

    try {
        const jsonValue = await AsyncStorage.getItem(name)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        throw new Error('Failed to load song')
    }

}

export async function getAllSongs() : Promise<(Song|undefined)[]> {

    const keys = await AsyncStorage.getAllKeys()

    const songsStringPairs = await AsyncStorage.multiGet(keys)

    const result = songsStringPairs.map((songStringPair)=>{

        const songString = songStringPair[1]

        if(songString != null){
            const song : Song = JSON.parse(songString)
    
            return song
        }
    })
    
    return result
}

export async function clearAllSongs() : Promise<void>{
    const keys = await AsyncStorage.getAllKeys()
    console.log(keys)
    AsyncStorage.multiRemove(keys)
}