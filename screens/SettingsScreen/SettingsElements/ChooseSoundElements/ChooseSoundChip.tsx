import { useContext, useEffect, useState } from 'react'
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import { altButtonColors, textColors, altButtonColorsPressed } from '../../../../theme/Colors'
import { Chip } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import type { ClickSound } from '../../../../logic/structure'
import _ from 'lodash'
import { Audio } from 'expo-av'


export default function ChooseSoundChip({clickSound, currentClickSound, onPress } : {clickSound : ClickSound, currentClickSound: ClickSound, onPress : any}){

    const { theme, soundSet } = useContext(PreferencesContext)
    const [selected, setSelected] = useState(currentClickSound == clickSound)

    const [sound, setSound] = useState(new Audio.Sound())

    async function playSound() {

        const { sound } = await Audio.Sound.createAsync(clickSound.file) //preset to be determined by user settings
        
        setSound(sound)
    
        await sound.playAsync();
    }
    
    useEffect(() => {
    return sound
        ? () => {
            sound.unloadAsync();
        }
        : undefined;
    }, [sound]);  
    
    useEffect(()=>{
        setSelected(currentClickSound == clickSound)
    })

    return(
        <Chip style={[styles.chips,
            {backgroundColor:altButtonColors[theme as keyof typeof altButtonColors]}]}
            textStyle={{color:textColors[theme as keyof typeof textColors]}}
            selectedColor={altButtonColorsPressed[theme as keyof typeof altButtonColorsPressed]}
            onPress={()=>{
                playSound()
                onPress()
            }}
            selected={selected}>{_.capitalize(clickSound.name)}</Chip>
    )
}

const styles = StyleSheet.create({
    chips:{
        marginHorizontal:10
    }
})