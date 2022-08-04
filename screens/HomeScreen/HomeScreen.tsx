import { View, Text, SafeAreaView, Pressable, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ClickSpace } from './HomeElements/ClickSpace';
import DropDownPicker from 'react-native-dropdown-picker'

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    
    const[tempo, setTempo] = useState(60)
    const [numValue, setNumValue] = useState(4)
    const [denValue, setDenValue] = useState(4)
    const[meter, setMeter] = useState(new Array(4).fill(0))
    const [running, setRunning] = useState(false)
    useEffect(()=>{
        setMeter(new Array(numValue).fill(0))
        //will also update according to accents
    },[numValue])

    return (
        <LinearGradient colors={['#666666','#333333']} style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
                <StatusBar/>
                <ClickSpace meter={meter} setMeter={setMeter}/>
                <TimeSignature 
                    numValue={numValue}
                    setNumValue={setNumValue}
                    denValue={denValue}
                    setDenValue={setDenValue}/>
                <TempoWheel tempo={tempo} setTempo={setTempo}/>
                <StartButton running={running} setRunning={setRunning}/>
            </SafeAreaView>
        </LinearGradient>
    );
}

export function TimeSignature({numValue,setNumValue,denValue,setDenValue}: //real typescript moment
    {numValue:number,setNumValue:React.Dispatch<React.SetStateAction<number>>, 
    denValue:number, setDenValue:React.Dispatch<React.SetStateAction<number>>}){
    
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
        {label: '64', value: 64},
      ])
    return(
        <View style={homeStyles.timeSignature}>
            <DropDownPicker
                style={homeStyles.timeSignatureDropdown}
                dropDownDirection='TOP'
                open={numOpen}
                value={numValue}
                items={numItems}
                setOpen={setNumOpen}
                setValue={setNumValue}
                setItems={setNumItems}
            />
            <Text style={homeStyles.timeSignatureDivider}>/</Text>
            <DropDownPicker
                style={homeStyles.timeSignatureDropdown}
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

//Here we pass in the tempo and setTempo hook, i don't think this is the 'correct' way to do it but it works :/
export function TempoWheel({ tempo, setTempo }:{ tempo:number, setTempo:Function }){ 
    const[theta1, setTheta1] = useState(0)
    const[internalTempo, setinternalTempo] = useState(tempo) //can be a decimal for fine tuning, end result is an integer
    return(
        <View style={{alignItems:'center'}}>
            <View style={homeStyles.tempoWheel}
            onTouchMove={(e)=>{
                    const x = e.nativeEvent.locationX-125
                    const y = 125-e.nativeEvent.locationY
                    const theta2 = Math.atan(y/x)
                    const deltaTheta = theta2-theta1
                    const distance = Math.hypot(x,y)
                    //if finger is in circle
                    if(distance <=125){
                        //if moving clockwise
                        if(deltaTheta < 0) { 
                            if(tempo < 800) {
                                
                                setinternalTempo(internalTempo + 1 * (distance/125))
                            }
                        }
                        else {
                            if(tempo > 10){
                                setinternalTempo(internalTempo - 1 * (distance/125))
                            }
                            
                        }
                        setTempo(Math.floor(internalTempo))
                        setTheta1(theta2)
                    }      
            }}>
                <View style={{width:250, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text 
                    style={homeStyles.tempoDirectionText}
                    onPress={(e)=>{setTempo(tempo-1)}}>-</Text>
                    <Text 
                    style={homeStyles.tempoDirectionText}
                    onPress={(e)=>{setTempo(tempo+1)}}>+</Text>
                </View>
            </View>
            <Text style={homeStyles.tempoText}>{tempo}</Text>
        </View>
    )
}

export function StartButton({ running, setRunning }:{ running:boolean, setRunning:Function }){ 
    return(
        <Pressable
            style={({ pressed }) => [
            {
              backgroundColor: running || pressed
                ? '#707070'
                : '#3f3f3f'
            },
            homeStyles.startButton
          ]}
            onPress={
                ()=>{
                    if(running){
                        setRunning(false)
                    }
                    else{
                        setRunning(true)
                    }
                } //startMetronomeFunction
            }>
            <Text style={homeStyles.startText}>
                {running ? "Stop" : "Start"}
            </Text>
        </Pressable>
    )
}

export const homeStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
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
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:20
    },
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
        shadowRadius: 4
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
    tempoWheel:{
        backgroundColor:'#D9D9D9',
        width: 250,
        height: 250,
        borderRadius: 125,
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        marginBottom:5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4
    },
    tempoText:{
        color:'white',
        fontSize:36,
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4,
        marginBottom:20
    },
    tempoDirectionText:{
        //text for + and - for wheel
        fontSize:36,
        color:'white'
    },
    startButton:{
        height:75,
        borderColor:'#909090',
        borderWidth:1,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20,
        marginRight:20,
        marginBottom:20,
        //figure out shadow in buttons, this is apparently a nightmare to do with the "overflow:'hidden'" style in parent container
    },
    startText:{
        color:'white',
        fontSize:36
    }
})


