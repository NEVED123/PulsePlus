import DropDownPicker from "react-native-dropdown-picker"
import { Text, TextInput, View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useState, useContext, useEffect } from 'react'
import { BuildSongContext } from "../../../logic/BuildSongManager"
import { buttonColors, borderColors, textShadowColors, textTitleColors} from "../../../theme/Colors"
import { PreferencesContext } from "../../../logic/PreferencesManager"

export function SelectTempo(){

    const [open, setOpen] = useState(false)
    const [noteValue, setNoteValue] = useState(4)
    const [prevNoteValue, setPrevNoteValue] = useState(noteValue)
    const [items, setItems] = useState(
        [{label: '1', value: 1},
        {label: '2', value: 2},
        {label: '4', value: 4},
        {label: '8', value: 8},
        {label: '16', value: 16},
        {label: '32', value: 32},
        {label: '64', value: 64}]
    )

    const { tempo, setTempo, denominator, getSong } = useContext(BuildSongContext)

    const [tempoText, setTempoText] = useState(`${tempo}`)

    const { theme } = useContext(PreferencesContext)

    useEffect(()=>{
        setTempoText(`${tempo * noteValue / denominator}`)
        console.log(getSong())
    }, [tempo])


    return(
        <View style={styles.container}>
            <DropDownPicker
                style={[styles.timeSignatureDropdown,
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
                    //modify the tempo of song object to reflect new note value
                    if(value.value != undefined){
                        //translate current tempo to our new note value tempo
                        setTempo(tempo * noteValue/value.value)
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
                            value={tempoText}
                            onChangeText={(text)=>{
                                if(!isNaN(Number(text))){
                                    setTempoText(text)
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
                                setTempo(newTempo * denominator/noteValue)
                                console.log(getSong())
                            }}>
                    </TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    timeSignatureDropdown:{
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor:"#D9D9D9",
        width:125
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
    container:{
        height:75,
        width:125,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
})