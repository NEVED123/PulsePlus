import { View, Text, SafeAreaView, Pressable, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ClickSpace } from './HomeElements/ClickSpace';
import { TimeSignature } from "./HomeElements/TimeSignature"
import { TempoWheel } from "./HomeElements/TempoWheel"
import { StartButton } from "./HomeElements/StartButton"

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    
    const [tempo, setTempo] = useState(60)
    const [numValue, setNumValue] = useState(4)
    const [denValue, setDenValue] = useState(4)
    const [meter, setMeter] = useState(new Array(4).fill(0)) //[0,0,0,0]
    const [running, setRunning] = useState(false)
    return (
        <LinearGradient colors={['#666666','#333333']} style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                <ClickSpace meter={meter} setMeter={setMeter}/>
                <TimeSignature 
                    numValue={numValue}
                    setNumValue={setNumValue}
                    denValue={denValue}
                    setDenValue={setDenValue}
                    setMeter={setMeter}/>
                <TempoWheel tempo={tempo} setTempo={setTempo}/>
                <StartButton running={running} setRunning={setRunning}/>
            </SafeAreaView>
        </LinearGradient>
    );
}

