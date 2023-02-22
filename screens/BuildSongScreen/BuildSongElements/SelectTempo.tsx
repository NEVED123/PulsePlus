import DropDownPicker from "react-native-dropdown-picker"
import { Text, TextInput, View, StyleSheet } from 'react-native'
import { useState, useContext } from 'react'
import { BuildSongContext } from "../../../logic/BuildSongManager"
import { buttonColors, borderColors, textShadowColors, textTitleColors} from "../../../theme/Colors"
import { PreferencesContext } from "../../../logic/PreferencesManager"

export function SelectTempo(){

    const [typing, setTyping] = useState(false)


    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(1)
    const [items, setItems] = useState(
        [{label: '1', value: 1},
        {label: '2', value: 2},
        {label: '4', value: 4},
        {label: '8', value: 8},
        {label: '16', value: 16},
        {label: '32', value: 32},
        {label: '64', value: 64}]
    )

    const { tempo, setTempo, getSong } = useContext(BuildSongContext)

    const { theme } = useContext(PreferencesContext)


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
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={(value)=>{
                   //modify the tempo of song object to reflect new note value
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
                    style={[{
                        color : textTitleColors[theme as keyof typeof textTitleColors],
                        textShadowColor : textShadowColors[theme as keyof typeof textShadowColors]
                        }, 
                        styles.equalsText]}
                    keyboardType="number-pad"
                    onFocus={()=>setTyping(true)}
                    onEndEditing={(e)=>{
                        setTyping(false)
                        setTempo(Number(e.nativeEvent.text))
                        console.log(getSong())
                        }}>
                    {tempo}
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