import { Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { BuildSongContext } from '../../../logic/BuildSongManager'
import { useContext, useState } from 'react'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { textTitleColors } from '../../../theme/Colors'

export function SelectRepetitions(){

    const { activeMeter } = useContext(BuildSongContext)
    const { theme } = useContext(PreferencesContext)

    const [isTyping, setTyping] = useState(false)


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={[{color:textTitleColors[theme as keyof typeof textTitleColors]}, styles.text]}>
                    {'x '} 
                </Text>
                <TextInput 
                    style={[{color:textTitleColors[theme as keyof typeof textTitleColors]}, styles.text]}
                    keyboardType="number-pad"
                    onFocus={()=>setTyping(true)}
                    onEndEditing={()=>setTyping(false)}>
                    {activeMeter.repeat}
                </TextInput>

            </View>
        </TouchableWithoutFeedback>
    )
} 

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:30
    }
})