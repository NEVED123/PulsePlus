import { View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { settingStyles, SettingButton } from './SettingsElements'

export default function Settings(){
    return(
        <LinearGradient colors={['#333333','#000000']} style={settingStyles.background}>
            <SafeAreaView style={settingStyles.container}>
                <Text style={settingStyles.settingTitle}>
                    Settings
                </Text>
                <View style={settingStyles.settingsBox}>
                    <SettingButton text='Light Mode'/>
                    <SettingButton text='Background Mode'/>
                    <SettingButton text='Flashlight on Downbeat'/>
                    <SettingButton text='Vibrate on Downbeat'/>
                    <SettingButton text='Change Sound Set'/>
                    <SettingButton text='Rate us on the App Store!'/>
                </View>
            </SafeAreaView>
        </LinearGradient> 
    )

}



