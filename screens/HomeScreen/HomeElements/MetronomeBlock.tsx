import { View, Pressable, StyleSheet, Dimensions } from 'react-native'
import { rowSizes, METRONOME_BLOCK_GROUP_PADDING } from './MetronomeBlockGroupBehavior'
import { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeManager'

export function MetronomeBlock({ beatNumber, meter, setMeter }:
    { beatNumber:number, meter: number[], setMeter:Function }){

    const { theme } = useContext(ThemeContext)
    const accent = meter[beatNumber]
    const topRowNumber = rowSizes(meter)[0]

    return(
        <Pressable 
            style={ ({pressed}) => [{
                backgroundColor: color[theme as keyof typeof color][accent]},
                {shadowRadius: pressed ? 20 : 4},
                {width: (Dimensions.get('window').width-METRONOME_BLOCK_GROUP_PADDING*2-topRowNumber * MARGIN*2)/topRowNumber},
                {borderWidth: borderwidth[theme as keyof typeof borderwidth]}, 
                styles.metronomeBlock]}
            onPress={()=>{
                const newMeter = meter.slice()
                newMeter[beatNumber] = accent < backgroundColorLength ? accent + 1 : 0
                setMeter(newMeter)
            }}>
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

const color = {
    light: ['#FFFFFF', '#DDDDDD', '#BBBBBB'],
    dark: ["#D9D9D9", "#AAAAAA", "#737373"]
}

const borderwidth = {
    light:1,
    dark:0
}

const backgroundColorLength = color.light.length - 1