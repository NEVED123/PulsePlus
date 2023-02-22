import { Text, TextInput, View, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { BuildSongContext } from '../../../logic/BuildSongManager'
import { useContext, useState } from 'react'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { textTitleColors } from '../../../theme/Colors'

export function SelectRepetitions(){

    const { repetitions, setRepetitions } = useContext(BuildSongContext)
    const { theme } = useContext(PreferencesContext)

    const [repetitionsText, setRepetitionsText] = useState(`${repetitions}`)

    return(
        <View style={styles.container}>
            <Text style={[{color:textTitleColors[theme as keyof typeof textTitleColors]}, styles.text]}>
                {'x '} 
            </Text>
            <TextInput 
                style={[{color:textTitleColors[theme as keyof typeof textTitleColors]}, styles.text]}
                keyboardType="number-pad"
                value={repetitionsText}
                onChangeText={(text)=>{
                    if(!isNaN(Number(text))){
                        setRepetitionsText(text)
                    }
                }}
                onEndEditing={(e)=>{
                    //onChangeText ensures the number is valid
                    const newRepetitions = Number(e.nativeEvent.text)
                    setRepetitions(newRepetitions)
                }}>
                
            </TextInput>

        </View>
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