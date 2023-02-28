import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native'
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import { useState, useContext, useEffect } from 'react'
import { BeatSounds } from '../../../../assets/sounds/sounds'
import ChooseSoundRow from './ChooseSoundRow'

export default function ChooseSoundMenu( {numberOfOptions = 3} : {numberOfOptions? : number }){

    const { soundSet } = useContext(PreferencesContext)

    const arrayOfSounds = Object.values(BeatSounds)

    //array of sounds: [clave, woodblock, silence, drum, tom, click]

    //soundSet : [clave, drum, tom]

    //each row should be generated with its initial setting equal to its index equivalent in soundset

    //Array.fill(0) is necessary, as Array.map will not apply function to empty array slot
    
    const chooseSoundRowArray = new Array(numberOfOptions).fill(0).map((value, index)=>{

        if(numberOfOptions > arrayOfSounds.length){
            console.warn('WARNING: More sound options than sounds available to the user - will force user to duplicate sounds')
        }

        if(index < soundSet.length){
            return <ChooseSoundRow title={`Sound ${index + 1}`}index={index} initial={soundSet[index]}/>
        }
        else{
            return <ChooseSoundRow title={`Sound ${index + 1}`} index={index}/>
        }   

    })

    return(
        <View>
            {chooseSoundRowArray}
        </View>
    )
}
