import { Dialog, Text, Portal, Provider } from "react-native-paper";
import { useState, useContext } from 'react'
import { View, StyleSheet, Dimensions, TextInput, Pressable } from 'react-native'
import { BuildSongContext } from "../../../logic/BuildSongManager";
import { PreferencesContext } from "../../../logic/PreferencesManager";
import { textTitleColors } from "../../../theme/Colors";

export default function SaveSongDialong({ visible, setVisible } : { visible : boolean, setVisible : Function}){

    const { theme } = useContext(PreferencesContext)
    const { setAuthor, setSongName, setDate, song } = useContext(BuildSongContext)
    const [songNameText, setSongNameText] = useState('')
    const [composerText, setComposerText] = useState('')

    return(
        <Portal>
            <Dialog 
                dismissable={false}
                visible={visible} 
                onDismiss={()=>setVisible(false)} 
                style={styles.dialog}
            >
                <Text
                    style={[styles.title,
                        {color:textTitleColors[theme as keyof typeof textTitleColors]}]}
                >Save Song</Text>
                <TextInput
                    style={styles.input}
                    value={songNameText}
                    placeholder={'Song Name'}
                    onChange={(e)=>{
                        const text = e.nativeEvent.text
                        setSongNameText(text)
                    }}
                />
                <TextInput
                    style={styles.input}
                    value={composerText}
                    placeholder={'Composer'}
                    onChange={(e)=>{
                        const text = e.nativeEvent.text
                        setComposerText(text)
                    }}
                />
                <View style={styles.buttonContainer}>
                    <Pressable        
                        onPress={()=>{        
                        setSongName(songNameText)
                        setAuthor(composerText)
                        setDate(Date.now())
                        //saveSong(song)
                        setVisible(false)      
                    }}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </Pressable>
                    <Pressable onPress={()=>{
                        setSongName(songNameText)
                        setAuthor(composerText)
                        setDate(Date.now())
                        //saveSong(song)
                        setVisible(false)
                        //go to home
                    }}>
                        <Text
                            style={styles.buttonText}
                        >
                            Save and Play
                        </Text>                        
                    </Pressable>
                    <Pressable onPress={()=>{
                        setSongNameText('')
                        setComposerText('')
                        setVisible(false)
                    }}>
                        <Text
                            style={styles.buttonText}
                        >
                            Cancel
                        </Text>                    
                    </Pressable>
                </View>
               
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
    buttonContainer:{
        flexDirection:'row'
    },
    title:{
        fontSize:30
    },
    input:{
        fontSize:20,
        marginTop:10
    },
    buttonText:{
        color:'black',
        fontSize:20,
        margin:10
    }
})
