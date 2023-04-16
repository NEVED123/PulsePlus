import { Dialog, Portal, Searchbar } from 'react-native-paper'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { textTitleColors } from '../../../theme/Colors'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { useContext, useState , useEffect }  from 'react'
import * as f from '../../../backend/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Song } from '../../../logic/structure'
import SongListItem from './SongListItem'
import { MeterCarousel } from './MeterCarousel'

export default function LoadSongDialog({visible, setVisible} : { visible : boolean, setVisible : Function}){

    const { theme } = useContext(PreferencesContext)

    const [searchQuery, setSearchQuery] = useState('');

    const [songList, setSongList] = useState(new Array<Song|undefined>)

    function onChangeSearch(query : string) : void {
        setSearchQuery(query)
    }

    function showInSearchResults(song : Song) : boolean {

        if(searchQuery == '')
            return true

        if(song.metadata != undefined){
            return song.metadata.name.includes(searchQuery) ||
            song.metadata.author.includes(searchQuery)
        } 
             
        return false
    }

    useEffect(()=>{

        if(!visible) return

        const getAllSongs = async () => {
            const songs = await f.getAllSongs()
            setSongList(songs)
        }

        getAllSongs()
    },[visible])

    const songListItemArray = songList.map((song, index)=>{
        if(song != undefined && showInSearchResults(song))
            return <SongListItem song={song} key={index}/>
    })
       
    return(
        <Portal>
            <Dialog
             dismissable={true}
             visible={visible} 
             onDismiss={()=>setVisible(false)} 
             style={styles.dialog}
            > 
            <Text
                style={[styles.title,
                {color:textTitleColors[theme as keyof typeof textTitleColors]}]}
            >Song List</Text>
            <Searchbar
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
            />
            <ScrollView>
                {songListItemArray}
            </ScrollView>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'grey',
    },
    title:{
        fontSize:30,
        marginBottom:10
    },
    searchBar:{
        width:300,
        marginBottom: 10
    }
})