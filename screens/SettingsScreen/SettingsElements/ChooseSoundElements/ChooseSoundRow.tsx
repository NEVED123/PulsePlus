import { useState, useContext, useRef } from 'react'
import { BeatSounds } from '../../../../logic/structure'
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import ChooseSoundChip from './ChooseSoundChip'
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { textTitleColors } from '../../../../theme/Colors'
import type { Sound } from '../../../../logic/structure'

export default function ChooseSoundRow({title, index, initial = BeatSounds.clave}: { title : string, index : number, initial?: Sound }){

    const { theme, setSoundSet } = useContext(PreferencesContext)

    const [chipSelected, setChipSelected] = useState(initial)

    const chipArray = Object.values(BeatSounds).map((sound)=>{


        return <ChooseSoundChip
         sound={sound}
         currentSound={chipSelected} 
         onPress={()=>{
            setChipSelected(sound)
            setSoundSet(sound, index)
        }}/>
    })

    return(
        <View style={styles.container}>
            <Text style={[styles.title,{color:textTitleColors[theme as keyof typeof textTitleColors]}]}>
                {title}
            </Text>
                <ScrollView 
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                    {chipArray}
                </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        paddingHorizontal:20
    },
    title:{
        fontSize:25,
        marginVertical:20
    }
})