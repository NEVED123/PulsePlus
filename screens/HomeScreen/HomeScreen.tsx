import { View, Text, SafeAreaView, Pressable, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { homeStyles } from './HomeElements';
//import ModalDropdown from 'react-native-modal-dropdown'

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    const [meter, setMeter] = useState(new Array(4).fill(0))
    return (
        <LinearGradient colors={['#666666','#333333']} style={homeStyles.container}>
            <SafeAreaView style={homeStyles.background}>
                <StatusBar/>
                <ClickSpace meter={meter}/>
                <TimeSignature/>
                <TempoWheel/>
                <StartButton />
            </SafeAreaView>
        </LinearGradient>
    );
}

export type Meter={
    meter:number[]
}

export function ClickSpace({meter=[0,0,0,0]}:Meter){
    return(
        //needs behavior for determining how many blocks appear
        <View style={homeStyles.clickSpace}>
            <MetronomeBlockGroup meter={meter}/>
        </View>
    )
}

export function MetronomeBlockGroup({meter=[]}:Meter){
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
    return(
        <View style={homeStyles.timeSignature}>
            <Pressable
            style={homeStyles.timeSignatureNumberSelector}
            onPress={()=>{/*drop down menu*/}}>
                <Text style={homeStyles.timeSignatureNumber}>3</Text>
            </Pressable>
            <Text style={homeStyles.timeSignatureDivider}>/</Text>
            <Pressable 
            style={homeStyles.timeSignatureNumberSelector}
            onPress={()=>{/*drop down menu*/}}>
                <Text style={homeStyles.timeSignatureNumber}>4</Text>
            </Pressable>
        </View>
        
    )
}

export function TempoWheel(){
    return(
        <View style={{alignItems:'center'}}>
            <View style={homeStyles.tempoWheel}>
                <View style={{width:250, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={homeStyles.tempoDirectionText}>-</Text>
                    <Text style={homeStyles.tempoDirectionText}>+</Text>
                </View>
            </View>
            <Text style={homeStyles.tempoText}>78</Text>
        </View>
    )
}

export function StartButton(){ 
    const [running, setRunning] = useState(false) //move state up to top level component
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


