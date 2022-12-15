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
import { defaultMetronomeSong } from '../../logic/structure';
import { SongProvider } from '../../logic/SongManager';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    
    /*useEffect(){
        load default song
    }*/
    const { theme } = useContext(ThemeContext)
    const [running, setRunning] = useState(false)
    return (
        <SongProvider>
            <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={{flex:1}}>
                <SafeAreaView style={{flex:1}}>
                    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                    <ClickSpace/>
                    <TimeSignature /*should only be displayed during normal metronome use, otherwise a scroll bar may be necessary *//> 
                    <TempoWheel/>
                    <StartButton/>
                </SafeAreaView>
            </LinearGradient>
        </SongProvider>
    );
}



