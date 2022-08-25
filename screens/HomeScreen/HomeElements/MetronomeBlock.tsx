import { View, Pressable, StyleSheet, Dimensions } from 'react-native'
import { rowSizes, METRONOME_BLOCK_GROUP_PADDING } from './MetronomeBlockGroupBehavior'
import { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeManager'
import { accentColors, borderWidths } from '../../../theme/Colors'
import { Meter, Song } from '../../../logic/structure'
import { ActiveMeter, changeAccent } from '../../../logic/SongFunctions'
import { SongContext } from '../../../logic/SongManager'

export function MetronomeBlock({ beatNumber }:{ beatNumber:number }){

    const { theme } = useContext(ThemeContext)
    const { updateAccent, getActiveMeter } = useContext(SongContext)
    const accent = getActiveMeter().beats[beatNumber].beatSound
    const topRowNumber = rowSizes(getActiveMeter())[0] //used to calculate width of blocks

    return(
        <Pressable 
            style={ ({pressed}) => [{
                backgroundColor: accentColors[theme as keyof typeof accentColors][accent]},
                {
                    shadowRadius: pressed ? 20 : 4,
                    width: (Dimensions.get('window').width-METRONOME_BLOCK_GROUP_PADDING*2-topRowNumber * MARGIN*2)/topRowNumber,
                    borderWidth: borderWidths[theme as keyof typeof borderWidths]}, 
                    styles.metronomeBlock]
                }
            onPress={()=>{updateAccent(beatNumber)}}>
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

const backgroundColorLength = accentColors.light.length - 1