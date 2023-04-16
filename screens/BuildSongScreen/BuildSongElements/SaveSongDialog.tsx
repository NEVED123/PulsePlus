import { Dialog, Text, Portal, Provider } from "react-native-paper";
import { useState, useContext, useEffect } from 'react'
import { View, StyleSheet, Dimensions, TextInput, Pressable } from 'react-native'
import { BuildSongContext } from "../../../logic/BuildSongManager";
import { PreferencesContext } from "../../../logic/PreferencesManager";
import { textTitleColors } from "../../../theme/Colors";
import * as f from '../../../backend/storage'

export default function SaveSongDialong({ visible, setVisible } : { visible : boolean, setVisible : Function}){

    const { theme } = useContext(PreferencesContext)
    const {song, setMetadata} = useContext(BuildSongContext)
    const [songNameText, setSongNameText] = useState('')
    const [composerText, setComposerText] = useState('')

    const [warningVisible, setWarningVisible] = useState(false)
    const [warning, setWarning] = useState('')

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
                {warningVisible && <Text>
                    {warning}
                </Text>}
                <View style={styles.buttonContainer}>
                    <Pressable        
                        onPress={()=>{     
                            setMetadata({
                                name : songNameText,
                                author : composerText,
                                date : new Date(Date.now()).toLocaleDateString('en-US', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  })
                            })
                            f.saveSong(song)
                            setVisible(false) 

                    }}>
                        <Text style={styles.buttonText}>
                            Save
                        </Text>
                    </Pressable>
                    <Pressable onPress={async ()=>{
                        setMetadata({
                            name : songNameText,
                            author : composerText,
                            date : new Date(Date.now()).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })
                        })
                        f.saveSong(song)
                        setVisible(false) 
                        
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
