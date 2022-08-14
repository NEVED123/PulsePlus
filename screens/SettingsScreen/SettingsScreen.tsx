import { View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import ToggleThemeButton from './SettingsElements/ToggleThemeButton'

export default function Settings(){
    return(
        <LinearGradient colors={['#333333','#000000']} style={settingStyles.background}>
            <SafeAreaView style={settingStyles.container}>
                <Text style={settingStyles.settingTitle}>
                    Settings
                </Text>
                <View style={settingStyles.settingsBox}>
                    <ToggleThemeButton/>
                   {// <SettingButton text='Light Mode'/>
                    //<SettingButton text='Background Mode'/>
                    // <SettingButton text='Flashlight on Downbeat'/>
                    // <SettingButton text='Vibrate on Downbeat'/>
                    // <SettingButton text='Change Sound Set'/>
                    // <SettingButton text='Rate us on the App Store!'/>
                 }
                </View>
            </SafeAreaView>
        </LinearGradient> 
    )

}

const settingStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    settingTitle:{
        color:'white',
        fontSize:40,
        textAlign:'center',
        margin:20
    },
    settingsBox:{
        overflow:'hidden',
        backgroundColor:'black',
        borderRadius:20,
        margin:20,
        borderBottomColor:'#909090', //the settings all have top border only
        borderBottomWidth:1
    }   
})


