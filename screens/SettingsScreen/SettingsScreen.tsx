import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { PreferencesContext } from '../../logic/PreferencesManager'
import { useContext } from 'react'
import ToggleThemeButton from './SettingsElements/ToggleThemeButton' 
import BackgroundModeButton from './SettingsElements/BackgroundModeButton';
import FlashlightOnDownBeatButton from './SettingsElements/FlashlightOnDownbeatButton';
import VibrateOnDownbeat from './SettingsElements/VibrateOnDownbeatButton';
import ChangeSoundSetButton from './SettingsElements/SoundSetButton';
import RateUsOnAppStoreButton from './SettingsElements/RateUsOnAppStoreButton';
import { settingBackgroundColors, textTitleColors } from '../../theme/Colors';
import ChooseSoundMenu from './SettingsElements/ChooseSoundElements/ChooseSoundMenu';

export default function Settings(){

    const { theme } = useContext(PreferencesContext)

    return(
        <LinearGradient colors={settingBackgroundColors[theme as keyof typeof settingBackgroundColors]} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <Text style={[styles.title, {color : textTitleColors[theme as keyof typeof textTitleColors]}]}>
                    Settings
                </Text>
                <View style={styles.settingsBox}>
                    <ToggleThemeButton/>
                    <BackgroundModeButton/>
                    <FlashlightOnDownBeatButton/>
                    <VibrateOnDownbeat/>
                    <ChangeSoundSetButton/>
                    <RateUsOnAppStoreButton/>
                </View>
                <ChooseSoundMenu />
                </SafeAreaView>
        </LinearGradient> 
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    title:{
        fontSize:40,
        textAlign:'center',
        MarginBottom:20
    },
    settingsBox:{
        overflow:'hidden',
        borderRadius:20,
        margin:20,
        borderBottomColor:'#909090', //the settings all have top border only
        borderBottomWidth:1
    }
})




