import { View, StyleSheet, Text } from 'react-native'
import { useEffect, useState, useContext } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { ThemeContext } from '../../../theme/ThemeManager'
import { buttonColors, borderColors, textTitleColors as timeSignatureColors, textShadowColors } from '../../../theme/Colors'
import { Song, Beat } from '../../../logic/structure'
import { SongContext } from '../../../logic/SongManager'

export function TimeSignature(){

    const { theme } = useContext(ThemeContext)
    const { numerator, setNumerator, denominator, setDenominator} = useContext(SongContext)
    const [numOpen, setNumOpen] = useState(false)
    const [denOpen, setdenOpen] = useState(false)
    const [numValue, setNumValue] = useState(numerator)
    const [denValue, setDenValue] = useState(denominator)
    const [numItems, setNumItems] = useState(numItemsArray(32))
    const [denItems, setDenItems] = useState([
        {label: '1', value: 1},
        {label: '2', value: 2},
        {label: '4', value: 4},
        {label: '8', value: 8},
        {label: '16', value: 16},
        {label: '32', value: 32},
        {label: '64', value: 64}
    ])

    return(
        <View style={[styles.timeSignature]}>
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
                open={numOpen}
                value={numValue}
                items={numItems}
                setOpen={setNumOpen}
                setValue={setNumValue}
                setItems={setNumItems}
                onSelectItem={(num)=>{
                    setNumerator(num.value as number)
                }}
            />
            <Text style={[{
                    color : timeSignatureColors[theme as keyof typeof timeSignatureColors],
                    textShadowColor : textShadowColors[theme as keyof typeof textShadowColors]
                    }, 
                    styles.timeSignatureDivider]}>/</Text>
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
                open={denOpen}
                value={denValue}
                items={denItems}
                setOpen={setdenOpen}
                setValue={setDenValue}
                setItems={setDenItems}
                onSelectItem={
                    (den)=>{setDenominator(den.value as number)
                }}
            />
        </View>
        
    )
}

function numItemsArray(maxSize:number){
    const itemArray = []
    for(let i = 1; i<(maxSize+1); i++){
        itemArray.push({label:(i.toString()), value:i})
    }
    return itemArray
}

const styles = StyleSheet.create({
    timeSignature:{
        height:75,
        width:125,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    },
    timeSignatureDropdown:{
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderColor:"#D9D9D9"
    },
    timeSignatureDivider:{
        fontSize:30, 
        marginLeft:20, 
        marginRight:20,
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4
    },
    dropDownText:{
        fontSize:24, 
        textAlign:'center'
    }
})
