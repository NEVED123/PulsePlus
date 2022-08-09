import { View, StyleSheet, Text } from 'react-native'
import { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

export function TimeSignature({numValue,setNumValue,denValue,setDenValue,setMeter}: //real typescript moment
    {numValue:number,setNumValue:React.Dispatch<React.SetStateAction<number>>, 
    denValue:number, setDenValue:React.Dispatch<React.SetStateAction<number>>,
    setMeter:React.Dispatch<React.SetStateAction<number[]>>}){
    
    const [numOpen, setNumOpen] = useState(false)
    const [denOpen, setdenOpen] = useState(false)
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

    useEffect(()=>{ setMeter(new Array(numValue).fill(0)) }, [numValue])

    return(
        <View style={styles.timeSignature}>
            <DropDownPicker
                style={styles.timeSignatureDropdown}
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
            />
            <Text style={styles.timeSignatureDivider}>/</Text>
            <DropDownPicker
                style={styles.timeSignatureDropdown}
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
        backgroundColor:'#D9D9D9',
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
        color:'#D9D9D9', 
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