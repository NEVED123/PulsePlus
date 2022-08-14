import {StyleSheet, Pressable, Text} from 'react-native' 
import { ThemeContext } from '../../../theme/ThemeManager'
import { useContext } from 'react'

//THIS IS ONLY TO BE USED AS A BASE FOR OTHER SETTING BUTTONS, OR AS A PLACEHOLDER
export default function SettingButtonBase({ text, behavior } : { text : string, behavior: Function }){

    const { theme } = useContext(ThemeContext)

    return(
        <Pressable style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#707070'
                : buttonColors[theme as keyof typeof buttonColors]
            },
            styles.settingButton
          ]}
          onPress={()=>behavior()}>
            <Text style={[styles.settingText, {color:textColors[theme as keyof typeof textColors]}]}>
                {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    settingText:{
        fontSize:18,
        marginLeft:20
    },
    settingButton:{
        height:50,
        borderTopColor:'#909090',
        borderTopWidth:1,
        justifyContent:'center'
        //figure out shadow in buttons, this is apparently a nightmare to do with the "overflow:'hidden'" style in parent container
    }
})

const buttonColors = {
    light: '#ffffff',
    dark: '#3f3f3f'
}

const textColors = {
    light: 'black',
    dark : 'white'
}

