import { View, Text, StyleSheet, Pressable, SafeAreaView, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import MeterDisplay from './BuildSongElements/MeterDisplay';
import { BuildSongContext, BuildSongProvider } from '../../logic/BuildSongManager';
import { MeterCarousel } from './BuildSongElements/MeterCarousel'
import { BuildSongTimeSignature } from './BuildSongElements/BuildSongTimeSignature';
import { backgroundColors } from '../../theme/Colors';
import { PreferencesContext } from '../../logic/PreferencesManager';
import { useContext, useState } from 'react'
import { SelectRepetitions } from './BuildSongElements/SelectRepetitions';
import { SelectTempo } from './BuildSongElements/SelectTempo';
import { SelectAccel } from './BuildSongElements/SelectAccel';
import { BuildSongButton } from './BuildSongElements/BuildSongButton';
import SaveSongDialog from './BuildSongElements/SaveSongDialog' 
import SongSummary from './BuildSongElements/SongSummaryElements/SongSummary'
import { Portal } from "react-native-paper";

export default function BuildSongMenu({navigation} : {navigation : any}){

    const { theme } = useContext(PreferencesContext)

    const [dialogVisible, setDialogVisible] = useState(false)

    return(
        <Portal.Host>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex:1}}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={{flex:1}}>
                        <SafeAreaView style={{flex:1}}>
                            <SaveSongDialog visible={dialogVisible} setVisible={setDialogVisible}/>
                            <MeterCarousel/>
                            <BuildSongTimeSignature/>
                            <SelectRepetitions/>
                            <SelectTempo/>
                            <SelectAccel/>
                            <View style={styles.buildSongButtonPanel}>
                                <BuildSongButton 
                                    text={'Summary'} onPress={()=>{navigation.navigate('SongSummary')}}/>
                                <BuildSongButton text={'Save'} onPress={()=>{setDialogVisible(!dialogVisible)}}/>
                                <BuildSongButton text={'Load'} onPress={()=>{}}/>
                            </View>
                        </SafeAreaView>
                    </LinearGradient>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Portal.Host>
        
    )

}

const styles = StyleSheet.create({
    buildSongButtonPanel:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    }
})