import { View, Text, StyleSheet, Pressable, SafeAreaView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MeterDisplay from './BuildSongElements/MeterDisplay';
import { BuildSongContext, BuildSongProvider } from '../../logic/BuildSongManager';
import { MeterCarousel } from './BuildSongElements/MeterCarousel'
import { BuildSongTimeSignature } from './BuildSongElements/BuildSongTimeSignature';
import { backgroundColors } from '../../theme/Colors';
import { PreferencesContext } from '../../logic/PreferencesManager';
import { useContext } from 'react'
import { SelectRepetitions } from './BuildSongElements/SelectRepetitions';
import { SelectTempo } from './BuildSongElements/SelectTempo';
import { SelectAccel } from './BuildSongElements/SelectAccel';
import { BuildSongButtonPanel } from './BuildSongElements/BuildSongButtonPanel';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongSummary from './BuildSongElements/SongSummaryElements/SongSummary'

export default function BuildSongMenu({navigation} : {navigation : any}){

    const { theme } = useContext(PreferencesContext)

    return(
        <BuildSongProvider>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex:1}}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={{flex:1}}>
                            <SafeAreaView style={{flex:1}}>
                                <MeterCarousel/>
                                <BuildSongTimeSignature/>
                                <SelectRepetitions/>
                                <SelectTempo/>
                                <SelectAccel/>
                                <BuildSongButtonPanel/>
                            </SafeAreaView>
                        </LinearGradient>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
        </BuildSongProvider>
    )

}
