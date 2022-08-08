import { View, Pressable, StyleSheet } from 'react-native'

export function MetronomeBlock({ beatNumber, meter, setMeter }:
    { beatNumber:number, meter: number[], setMeter:Function }){

    const accent = meter[beatNumber]

    return(
        <Pressable 
            style={ ({pressed}) => [{
                backgroundColor: backgroundColors[accent]},
                {shadowRadius: pressed ? 20 : 4}, 
                styles.metronomeBlock]}
            onPress={()=>{
                const newMeter = meter.slice()
                newMeter[beatNumber] = accent < backgroundColorLength ? accent + 1 : 0
                setMeter(newMeter)
            }}>
        </Pressable> 
    )
}

const styles = StyleSheet.create({
    metronomeBlock:{
        flex:1,
        margin:3,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        elevation: 5
    },
})

const backgroundColors = ["#D9D9D9", "#AAAAAA", "#737373"]
const backgroundColorLength = backgroundColors.length - 1