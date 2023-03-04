import { Slider } from "@miblanchard/react-native-slider";
import { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { SongContext } from "../../../logic/SongManager";

export function SongProgress(){

    const { activeMeterIndex, setActiveMeterIndex, length, running } = useContext(SongContext)
    const [sliderValue, setSliderValue] = useState(activeMeterIndex)

    return(
        <View>
            {(length > 1) && <Slider
                containerStyle={styles.container}
                value={sliderValue}
                onValueChange={(value)=>{
                    const initValue = typeof value == 'number' ? value : value[0]
                    setActiveMeterIndex(initValue)
                    setSliderValue(initValue)
                }}
                minimumValue={0}
                maximumValue={length-1}
                step={1}
                disabled={running}
                trackClickable={true}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
   container:{
    marginHorizontal:20,
    marginVertical:10
   }

})