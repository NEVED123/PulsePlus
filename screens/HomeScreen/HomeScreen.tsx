import { View, Text, SafeAreaView, Pressable, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { ClickSpace } from './HomeElements/ClickSpace';
import { TimeSignature } from "./HomeElements/TimeSignature"
import { TempoWheel } from "./HomeElements/TempoWheel"
import { StartButton } from "./HomeElements/StartButton"
import { ThemeContext } from '../../theme/ThemeManager'
import { backgroundColors } from '../../theme/Colors';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    
    /*useEffect(){
        load default song
    }*/
    const { theme } = useContext(ThemeContext)
    const [tempo, setTempo] = useState(60)
    const [numValue, setNumValue] = useState(4)
    const [denValue, setDenValue] = useState(4)
    const [meter, setMeter] = useState(new Array(4).fill(0)) //set to default song
    const [running, setRunning] = useState(false)
    return (
        <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={{flex:1}}>
            <SafeAreaView style={{flex:1}}>
                <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                <ClickSpace meter={meter} setMeter={setMeter} /*input song instead of meter*//> 
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



