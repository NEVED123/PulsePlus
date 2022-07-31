import { View, Text, SafeAreaView, Pressable, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { homeStyles } from './HomeElements';
import ModalDropdown from 'react-native-modal-dropdown';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    const[meter, setMeter] = useState(new Array(4).fill(0))
    const[tempo, setTempo] = useState(60)
    return (
        <LinearGradient colors={['#666666','#333333']} style={homeStyles.container}>
            <SafeAreaView style={homeStyles.background}>
                <StatusBar/>
                <ClickSpace meter={meter}/>
                <TimeSignature/>
                <TempoWheel tempo={tempo} setTempo={setTempo}/>
                <StartButton />
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


//Here we pass in the tempo and setTempo hook, i don't think this is the 'correct' way to do it but it works :/
export function TempoWheel({tempo=60, setTempo}:{tempo:number, setTempo:Function}){ 
    const[theta1, setTheta1] = useState(0)
    return(
        <View style={{alignItems:'center'}}>
            <View style={homeStyles.tempoWheel}
            onTouchStart={(e)=>{
                const x1 = e.nativeEvent.locationX-125
                const y1 = 125-e.nativeEvent.locationY
            }}
            onTouchMove={(e)=>{
                    const x2 = e.nativeEvent.locationX-125
                    if(x2 != 0){
                        const y2 = 125-e.nativeEvent.locationY
                        const theta2 = Math.atan(x2/y2)
                        const deltaTheta = theta2-theta1
                        if(deltaTheta > 0){
                            if(tempo < 800) {
                                setTempo(tempo + 1)
                            }
                        }
                        else {
                            if(tempo > 10){
                                setTempo(tempo - 1)
                            }
                            
                        }
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


