import { View, Pressable, StyleSheet, Dimensions } from 'react-native'
import { rowSizes, METRONOME_BLOCK_GROUP_PADDING } from './MetronomeBlockGroupBehavior'
import { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeManager'
import { accentColors, borderWidths } from '../../../theme/Colors'
import { Meter, Song } from '../../../logic/structure'
import { SongContext } from '../../../logic/SongManager'

export function MetronomeBlock({ beatNumber }:{ beatNumber:number }){

    const { theme } = useContext(ThemeContext)
    const { setAccent, getActiveMeter } = useContext(SongContext)
    const beat = getActiveMeter().beats[beatNumber]
    const accent = beat.beatSound
    const active = beat.active
    const topRowNumber = rowSizes(getActiveMeter())[0] //used to calculate width of blocks

    return(
        <Pressable 
            style={ ({pressed}) => [{
                backgroundColor: active ? "#FFFFFF" : accentColors[theme as keyof typeof accentColors][accent]},
                {
                    shadowRadius: pressed ? 20 : 4,
                    width: (Dimensions.get('window').width-METRONOME_BLOCK_GROUP_PADDING*2-topRowNumber * MARGIN*2)/topRowNumber,
                    borderWidth: borderWidths[theme as keyof typeof borderWidths]}, 
                    styles.metronomeBlock]
                }
            onPress={()=>{setAccent(beatNumber)}}>
        </Pressable> 
    )
}

const MARGIN = 3

const styles = StyleSheet.create({
    metronomeBlock:{
        margin: MARGIN,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        elevation: 5
    }
})