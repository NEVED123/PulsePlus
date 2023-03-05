import { View, Text, SafeAreaView, Pressable, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { useContext, useState } from 'react';
import { ClickSpace } from '../../components/ClickSpace/ClickSpace';
import { TimeSignature } from "./HomeElements/TimeSignature"
import { TempoWheel } from "./HomeElements/TempoWheel"
import { StartButton } from "./HomeElements/StartButton"
import { PreferencesContext } from '../../logic/PreferencesManager'
import { backgroundColors } from '../../theme/Colors';
import { defaultMetronomeSong } from '../../logic/structure';
import { SongProvider, SongContext } from '../../logic/SongManager';
import { SongProgress } from './HomeElements/SongProgress';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    
    /*useEffect(){
        load default song
    }*/
    const { theme } = useContext(PreferencesContext)

    return (
        <SongProvider>
            <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={{flex:1}}>
                <SafeAreaView style={{flex:1}}>
                    <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
                    <ClickSpace
                        context={SongContext}
                    />
                    <SongProgress/>
                    <TimeSignature/> 
                    <TempoWheel/>
                    <StartButton/>
                </SafeAreaView>
            </LinearGradient>
        </SongProvider>
    );
}



