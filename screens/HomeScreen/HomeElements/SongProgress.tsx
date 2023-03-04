import { Slider } from "@miblanchard/react-native-slider";
import { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { PreferencesContext } from "../../../logic/PreferencesManager";
import { SongContext } from "../../../logic/SongManager";
import { textColors } from "../../../theme/Colors";

export function SongProgress(){

    const { activeMeterIndex, setActiveMeterIndex, length, running, sectionName } = useContext(SongContext)
    const [sliderValue, setSliderValue] = useState(activeMeterIndex)
    const { theme } = useContext(PreferencesContext)

    useEffect(()=>{
        setSliderValue(activeMeterIndex)
    }, [activeMeterIndex])

    return(
        <View>
            {(length > 1) && <View>
                <Text style={[
                    {color: textColors[theme as keyof typeof textColors]},
                    styles.text]}>
                    {`${sectionName != undefined ? sectionName : `Section ${activeMeterIndex+1}`} - ${activeMeterIndex+1}/${length}`}
                </Text>
                <Slider
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
                />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
   container:{
    marginHorizontal:20,
    marginBottom:10
   },
   text:{
    alignSelf:'center',
    fontSize:20,
    marginTop:10
   }

})