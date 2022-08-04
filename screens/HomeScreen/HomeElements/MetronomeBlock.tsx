import { View, Pressable, StyleSheet } from 'react-native'
import { useState } from 'react'

export function MetronomeBlock({ beatNumber, meter, setMeter }:
    { beatNumber:number, meter: number[], setMeter:Function }){
    const [accentType, setAccentType] = useState(0)
    return(
        <Pressable 
            style={[{backgroundColor: backgroundColors[accentType]}, styles.metronomeBlock]}
            onPress={()=>{
                if(accentType < 2){
                    setAccentType(accentType+1)
                }
                else{
                    setAccentType(0)
                }
                const updatedMeter = meter
                updatedMeter[beatNumber] = accentType
                setMeter(updatedMeter)
            }}>
        </Pressable> 
    )
}

const backgroundColors = ["#D9D9D9", "#AAAAAA", "#737373"]

const styles = StyleSheet.create({
    metronomeBlock:{
        flex:1,
        margin:5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})