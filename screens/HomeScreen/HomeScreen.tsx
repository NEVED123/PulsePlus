import { View, Text, SafeAreaView, Pressable, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { homeStyles } from './HomeElements';
import DropDownPicker from 'react-native-dropdown-picker'

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    const[meter, setMeter] = useState(new Array(4).fill(0))
    const[tempo, setTempo] = useState(60)
    const [running, setRunning] = useState(false)
    return (
        <LinearGradient colors={['#666666','#333333']} style={homeStyles.container}>
            <SafeAreaView style={homeStyles.background}>
                <StatusBar/>
                <ClickSpace meter={meter}/>
                <TimeSignature/>
                <TempoWheel tempo={tempo} setTempo={setTempo}/>
                <StartButton running={running} setRunning={setRunning}/>
            </SafeAreaView>
        </LinearGradient>
    );
}

export function ClickSpace({ meter }:{meter:number[]}){
    return(
        <View style={homeStyles.clickSpace}>
            <MetronomeBlockGroup meter={meter}/>
        </View>
    )
}

export function MetronomeBlockGroup({ meter }:{ meter:number[] }){
    //The 'index' gives each metronome block a seperate ID based on its position in the array, for now its only purpose
    //is to get a warning to shut up but it will probably become useful
    return(
        <View style={homeStyles.metronomeBlockGroup}>
            {meter.map((x,index) => <MetronomeBlock key={index}/>)}
        </View>
    )
}


export function MetronomeBlock(){
    return(
        //This view will eventually have children for the different accent options
        <Pressable style={homeStyles.metronomeBlock}>
        </Pressable> 
    )
}

export function TimeSignature(){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(4);
    const [items, setItems] = useState([
      {label: '1', value: 1},
      {label: '2', value: 2},
      {label: '3', value: 3},
      {label: '4', value: 4},
      {label: '5', value: 5},
      {label: '6', value: 6},
      {label: '7', value: 7},
      {label: '8', value: 8},
      {label: '9', value: 9},
      {label: '10', value: 10}
    ]);
    return(
        <View style={homeStyles.timeSignature}>
            <DropDownPicker
                style={homeStyles.timeSignatureNumberSelector}
                dropDownDirection='TOP'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                zIndex={3000}
            />
            <Text style={homeStyles.timeSignatureDivider}>/</Text>
            <DropDownPicker
                style={homeStyles.timeSignatureNumberSelector}
                dropDownDirection='TOP'
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />
        </View>
        
    )
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
              backgroundColor: running
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


