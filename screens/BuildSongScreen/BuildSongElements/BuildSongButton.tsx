import { Pressable, StyleSheet, Text } from 'react-native'
import { useContext } from 'react'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { buttonColors, textColors } from '../../../theme/Colors'
 
export function BuildSongButton({ text, onPress} : { text: String, onPress : Function}){

    const { theme } = useContext(PreferencesContext)
    return(
        <Pressable
            style={[
                styles.button,
                {backgroundColor: buttonColors[theme as keyof typeof buttonColors]}
            ]}
            onPress={()=>{onPress()}}
        >
            <Text style={styles.text}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        height:40,
        width: 100,
        justifyContent:'center',
        alignItems:'center',
        margin: 10

    },
    text:{
        fontSize:20,
        color:'black'
    }
})