import { View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native'
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

//import { styles } from './SoundElements';

export default function BuildSongScreen(){

    const { theme } = useContext(PreferencesContext)

    return(
        <BuildSongProvider>
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
        </BuildSongProvider>


    )

}
