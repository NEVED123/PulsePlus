import { LineChart } from "react-native-chart-kit"
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Switch } from "react-native-paper"
import { useState, useContext } from 'react'
import { PreferencesContext } from "../../../logic/PreferencesManager"
import { textTitleColors } from "../../../theme/Colors"

export function SelectAccel(){

    const [isSwitchOn, setIsSwitchOn] = useState(false)
    const { theme } = useContext(PreferencesContext)
 
    return(
        <View>
            <View style={styles.accelOption}>
                <Text style={[
                    styles.accelOptionItems, 
                    styles.accelOptionText,
                    {color: textTitleColors[theme as keyof typeof textTitleColors]}]}>
                    Accel
                </Text>
                <Switch 
                    style={styles.accelOptionItems}
                    value={isSwitchOn} 
                    onValueChange={()=>{
                    setIsSwitchOn(!isSwitchOn)}} 
                />
            </View>
            <Text style={{fontSize:20, color:'white', backgroundColor:'black', height:100, marginHorizontal:20}}>
                CHART PLACEHOLDER
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    accelOption:{
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:10
    },
    accelOptionItems:{
        marginHorizontal:10
    },
    accelOptionText:{
        fontSize:30
    }
})

/**
 * 
 * 
 */