import { deleteSong, loadSong } from "../../../backend/storage";
import { Song } from "../../../logic/structure";
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useState, useContext} from "react";
import { BuildSongContext } from "../../../logic/BuildSongManager";
import { SongContext } from "../../../logic/SongManager";


export default function SongListItem({song} : { song : Song}){

    const [visible, setVisible] = useState(true)

    const setBuildSong = useContext(BuildSongContext).setSong

    const setRunSong = useContext(SongContext).setSong
    const runSong = useContext(SongContext).song

    let name : string = '', author, date

    const metadata = song.metadata

    if(metadata != undefined){
        name = metadata.name
        author = metadata.author
        date = metadata.date
    }

    return(
        <>
           {visible && <Pressable 
            style={({pressed})=>[styles.label, {backgroundColor : pressed ? 'lightgrey' : '#909090'}]}
            onPress={()=>{
                setRunSong(song)
                console.log(runSong)
            }}>
                <Pressable 
                    style={({pressed})=>[styles.buttons,
                        {backgroundColor : pressed ? 'lightgrey' : 'grey'}]}
                    onPress={()=>{
                        deleteSong(name)
                        setVisible(false)
                    }}
                >
                    <Text style={styles.buttonText}>
                        -
                    </Text>
                </Pressable>    
                <View style={styles.text}>
                    <Text>Name: {name}</Text>
                    <Text>Composer: {author}</Text>
                    <Text>Date created: {date}</Text>
                </View>
                <Pressable 
                    style={({pressed})=>[styles.buttons,
                        {backgroundColor : pressed ? 'lightgrey' : 'grey'}]}
                    onPress={()=>{
                        setBuildSong(song)   
                    }}    
                    >
                    <Text style={styles.buttonText}>
                        ...
                    </Text>
                </Pressable>    
            </Pressable>}
        </>
    )
}

const styles = StyleSheet.create({
    label:{
        borderRadius:15,
        marginBottom: 15,
        width: 300,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    text:{
        alignItems:'center'
    },
    buttons:{
        height:35,
        width:35,
        margin:10,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontWeight:'bold',
        fontSize:24
    }
})