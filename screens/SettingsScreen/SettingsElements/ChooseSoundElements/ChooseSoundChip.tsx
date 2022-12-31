import { useContext, useEffect, useState } from 'react'
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import { altButtonColors, textColors, altButtonColorsPressed } from '../../../../theme/Colors'
import { Chip } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import type { Sound } from '../../../../logic/structure'
import _ from 'lodash'


export default function ChooseSoundChip({sound, currentSound, onPress } : {sound : Sound, currentSound: Sound, onPress : any}){

    const { theme } = useContext(PreferencesContext)
    const [selected, setSelected] = useState(currentSound == sound)
    
    useEffect(()=>{
        setSelected(currentSound == sound)
    })

    return(
        <Chip style={[styles.chips,
            {backgroundColor:altButtonColors[theme as keyof typeof altButtonColors]}]}
            textStyle={{color:textColors[theme as keyof typeof textColors]}}
            selectedColor={altButtonColorsPressed[theme as keyof typeof altButtonColorsPressed]}
            onPress={onPress}
            selected={selected}>{_.capitalize(sound.name)}</Chip>
    )
}

const styles = StyleSheet.create({
    chips:{
        marginHorizontal:10
    }
})