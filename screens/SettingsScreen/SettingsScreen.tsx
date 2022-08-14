import { View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { ThemeContext } from '../../theme/ThemeManager'
import { useContext } from 'react'
import ToggleThemeButton from './SettingsElements/ToggleThemeButton' 
import BackgroundModeButton from './SettingsElements/BackgroundModeButton';
import FlashlightOnDownBeatButton from './SettingsElements/FlashlightOnDownbeatButton';
import VibrateOnDownbeat from './SettingsElements/VibrateOnDownbeatButton';
import ChangeSoundSetButton from './SettingsElements/SoundSetButton';
import RateUsOnAppStoreButton from './SettingsElements/RateUsOnAppStoreButton';

export default function Settings(){

    const { theme } = useContext(ThemeContext)

    return(
        <LinearGradient colors={gradients[theme as keyof typeof gradients]} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <Text style={[styles.title, {color : titleColors[theme as keyof typeof titleColors]}]}>
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
        color:'black',
        fontSize:40,
        textAlign:'center',
        margin:20
    },
    settingsBox:{
        overflow:'hidden',
        borderRadius:20,
        margin:20,
        borderBottomColor:'#909090', //the settings all have top border only
        borderBottomWidth:1
    }
})

const gradients = {
    light : ['#F0EFF5','#F0EFF5'],
    dark : ['#333333','#000000']
}

const titleColors = {
    light : 'black',
    dark : 'white'
}




