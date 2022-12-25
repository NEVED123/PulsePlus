import {StyleSheet, Pressable, Text} from 'react-native' 
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import { altButtonColors, textTitleColors } from '../../../../theme/Colors'
import { useContext } from 'react'

//THIS IS ONLY TO BE USED AS A BASE FOR OTHER SETTING BUTTONS, OR AS A PLACEHOLDER
export default function SettingButtonBase({ text, onPress } : { text : string, onPress: Function }){

    const { theme } = useContext(PreferencesContext)

    return(
        <Pressable style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#707070'
                : altButtonColors[theme as keyof typeof altButtonColors]
            },
            styles.settingButton
          ]}
          onPress={()=>onPress()}>
            <Text style={[styles.settingText, {color:textTitleColors[theme as keyof typeof textTitleColors]}]}>
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

