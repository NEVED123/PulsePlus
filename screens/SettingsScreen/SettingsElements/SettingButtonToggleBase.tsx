import {StyleSheet, Pressable, Text, Switch} from 'react-native' 
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { altButtonColors, textTitleColors } from '../../../theme/Colors'
import { useContext, useState } from 'react'

//THIS IS ONLY TO BE USED AS A BASE FOR OTHER SETTING BUTTONS, OR AS A PLACEHOLDER
export default function SettingButtonToggleBase({ text, onChange } : { text : string, onChange : Function }){

    const [isSwitchOn, setIsSwitchOn] = useState(false)


    const { theme } = useContext(PreferencesContext)

    return(
        <Pressable style={[
            {backgroundColor : altButtonColors[theme as keyof typeof altButtonColors]},
            styles.settingButton
          ]}>
            <Text style={[styles.settingText, {color:textTitleColors[theme as keyof typeof textTitleColors]}]}>
                {text}
            </Text>
            <Switch value={isSwitchOn} 
                onValueChange={()=>{
                    setIsSwitchOn(!isSwitchOn)
                    onChange()}} 
                style={styles.switch}/>
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
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center'
        //figure out shadow in buttons, this is apparently a nightmare to do with the "overflow:'hidden'" style in parent container
    },
    switch:{
        marginRight: 20
    }
})

