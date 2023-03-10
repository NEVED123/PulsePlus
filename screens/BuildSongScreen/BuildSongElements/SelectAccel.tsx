import { LineChart } from "react-native-chart-kit"
import { View, Text, Dimensions, StyleSheet, TextInput  } from 'react-native'
import { Switch } from "react-native-paper"
import { useState, useContext, useEffect } from 'react'
import { PreferencesContext } from "../../../logic/PreferencesManager"
import { textTitleColors, buttonColors, borderColors, textColors, textShadowColors } from "../../../theme/Colors"
import { Slider } from "@miblanchard/react-native-slider"
import { BuildSongContext } from "../../../logic/BuildSongManager"
import DropDownPicker from "react-native-dropdown-picker"

export function SelectAccel(){
    
    const { theme } = useContext(PreferencesContext)
    const { tempo, setFinalTempo, finalTempo, song, accel, activeMeter, denominator } = useContext(BuildSongContext)

    const [isSwitchOn, setIsSwitchOn] = useState(finalTempo != undefined)
    const [sliderValue, setSliderValue] = useState(accel != undefined ? accel : 0)
    const [finalTempoText, setFinalTempoText] = useState(`${finalTempo}`)
    const [open, setOpen] = useState(false)
    const [noteValue, setNoteValue] = useState(denominator)
    const [items, setItems] = useState(
        [{label: '1', value: 1},
        {label: '2', value: 2},
        {label: '4', value: 4},
        {label: '8', value: 8},
        {label: '16', value: 16},
        {label: '32', value: 32},
        {label: '64', value: 64}]
    )
    
    useEffect(()=>{
        setIsSwitchOn(finalTempo != undefined)
        setFinalTempoText(`${tempo * noteValue/denominator}`)
        setSliderValue(accel != undefined ? accel : 0)
    }, [activeMeter, accel])

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
                    onValueChange={(on)=>{
                        const finalTempo = on ? tempo : undefined
                        const accel = on ? 0 : undefined
                        setIsSwitchOn(!isSwitchOn)
                        setFinalTempo(finalTempo, accel)
                        console.log(song)
                    }} 
                />

            </View>
            
            {isSwitchOn && <View>
                <View style={styles.setNewTempoContainer}>
                    <DropDownPicker
                        style={[styles.newTempoDropdown,
                            {backgroundColor : buttonColors[theme as keyof typeof buttonColors],
                            borderColor : borderColors[theme as keyof typeof borderColors]}]}
                        textStyle={styles.dropDownText}
                        labelStyle={{fontSize:36}}
                        listMode='SCROLLVIEW'
                        showTickIcon={false}
                        showArrowIcon={false}
                        autoScroll={true}
                        dropDownDirection='TOP'
                        open={open}
                        value={noteValue}
                        items={items}
                        setOpen={setOpen}
                        setValue={setNoteValue}
                        setItems={setItems}
                        onSelectItem={(value)=>{
                            if(value.value != undefined && finalTempo != undefined){
                                //translate current tempo to our new note value tempo
                                setFinalTempo(finalTempo * noteValue/value.value, undefined)
                                console.log(song)
                            }
                        }}
                    />
                    <Text style={[{
                            color : textTitleColors[theme as keyof typeof textTitleColors],
                            textShadowColor : textShadowColors[theme as keyof typeof textShadowColors]
                            }, 
                            styles.equalsText]}>
                        =
                    </Text>
                    <TextInput
                            value={finalTempoText}
                            onChangeText={(text)=>{
                                if(!isNaN(Number(text))){
                                    setFinalTempoText(text)
                                }
                            }}
                            style={[{
                                color : textTitleColors[theme as keyof typeof textTitleColors],
                                textShadowColor : textShadowColors[theme as keyof typeof textShadowColors]
                                }, 
                                styles.equalsText]}
                            keyboardType="number-pad"
                            onEndEditing={(e)=>{
                                //onChangeText ensures the number is valid
                                const newTempo = Number(e.nativeEvent.text)
                                setFinalTempo(newTempo * denominator/noteValue, undefined)
                                console.log(song)
                            }}>
                    </TextInput>                    
                </View>
                <Text style={[
                    {
                        alignSelf: finalTempo != undefined ? ((finalTempo < tempo) ? 'flex-start': 'flex-end') : 'flex-start' /**This will be a boolean, equals flex-start when final tempo < initial tempo */,
                        color: textTitleColors[theme as keyof typeof textTitleColors],
                        marginBottom:10
                    },
                    styles.accelOptionItems
                ]}>
                    {finalTempo != undefined ? ((finalTempo < tempo) ? tempo : finalTempo) : tempo}
                </Text>
                <Slider
                    containerStyle={styles.slider}
                    value={sliderValue}
                    onValueChange={(value) =>{
                        const initValue = typeof value == 'number' ? value : value[0]
                        const accel = Math.abs(initValue) < 0.03 ? 0 : initValue
                        setSliderValue(accel)
                        setFinalTempo(finalTempo, accel)
                        console.log(song)
                    }}
                    minimumValue={-1}
                    maximumValue={1}
                    step={.01}
                />
                 <Text style={[
                    {
                        alignSelf: finalTempo != undefined ? ((finalTempo > tempo) ? 'flex-start': 'flex-end') : 'flex-start' /**This will be a boolean, equals flex-start when final tempo < initial tempo */,
                        color: textTitleColors[theme as keyof typeof textTitleColors],
                        marginTop:10
                    },
                    styles.accelOptionItems
                ]}>
                    {finalTempo != undefined ? ((finalTempo > tempo) ? tempo : finalTempo) : tempo}
                </Text>           
            </View>}
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
        marginHorizontal:10,
        alignItems: 'center'
    },
    accelOptionText:{
        fontSize:30
    },
    slider:{
        backgroundColor:'#909090',
        borderRadius:10,
        marginHorizontal:20
    },
    newTempoDropdown:{
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor:"#D9D9D9",
        width:125,
        alignSelf:'center'
    },
    dropDownText:{
        fontSize:24, 
        textAlign:'center'
    },
    equalsText:{
        fontSize:30, 
        marginLeft:20, 
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4
    },
    setNewTempoContainer:{
        height:75,
        width:125,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
})

/* {isSwitchOn && <View style={{flexDirection:'row'}}>
    <Text style={[{color:textTitleColors[theme as keyof typeof textTitleColors]}, {fontSize:20}]}>
        Final Tempo =
    </Text>
    <TextInput
        style={[{color:textTitleColors[theme as keyof typeof textTitleColors]}, {fontSize:20}]}
        keyboardType="number-pad"
        >
        {finalTempoText}
    </TextInput>
</View>} */