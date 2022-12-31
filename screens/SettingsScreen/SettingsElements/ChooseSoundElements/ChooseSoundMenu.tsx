import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native'
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import { useState, useContext, useEffect } from 'react'
import { BeatSounds } from '../../../../logic/structure'
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
            return <ChooseSoundRow index={index} initial={soundSet[index]}/>
        }
        else{
            return <ChooseSoundRow index={index}/>
        }   

    })

    return(
        <View>
            {chooseSoundRowArray}
        </View>
    )
}
