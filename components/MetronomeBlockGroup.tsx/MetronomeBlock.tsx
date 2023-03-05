import { View, Pressable, StyleSheet, Dimensions } from 'react-native'
import { rowSizes, METRONOME_BLOCK_GROUP_PADDING } from './MetronomeBlockGroupBehavior'
import { useContext, useState, useEffect } from 'react'
import { PreferencesContext } from '../../logic/PreferencesManager'
import { accentColors, borderWidths, activeColors } from '../../theme/Colors'
import { Meter, Song } from '../../logic/structure'
import { SongContext } from '../../logic/SongManager'


export function MetronomeBlock({ beatNumber, width }:{ beatNumber:number, width? : number}){

    const { theme } = useContext(PreferencesContext)
    const { setAccent, activeMeter } = useContext(SongContext)
    const beat = activeMeter.beats[beatNumber]
    const accent = beat.beatSound
    const active = beat.active
    const topRowNumber = rowSizes(activeMeter)[0] //used to calculate width of blocks

    const [backgroundColor, setBackgroundColor] = useState(accentColors[theme as keyof typeof accentColors][accent])

    useEffect(()=>{
        setBackgroundColor(accentColors[theme as keyof typeof accentColors][accent])
        if(active){
            setBackgroundColor(activeColors[theme as keyof typeof activeColors])
            setTimeout(()=>{
                setBackgroundColor(accentColors[theme as keyof typeof accentColors][accent])
            },25)
        }
    },[active, accent])

    return(
        <Pressable 
            style={ ({pressed}) => [
                {
                    backgroundColor: backgroundColor,
                    shadowRadius: pressed ? 20 : 4,
                    width: width != undefined ? width : (Dimensions.get('window').width-METRONOME_BLOCK_GROUP_PADDING*2-topRowNumber * MARGIN*2)/topRowNumber,
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