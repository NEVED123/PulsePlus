import { View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './SettingsElements';

export default function SettingsScreen(){
    return(
            <Text>Settings</Text>
    )

}
/*
export default function Settings(){
    return(
        <LinearGradient colors={['#333333','#000000']} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.settingTitle}>
                    Settings
                </Text>
                <View style={styles.settingsBox}>
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

type Props={
    text:string
}
function SettingButton({text= ''}:Props){
    return(
        <Pressable style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#707070'
                : '#3f3f3f'
            },
            {
                height:50,
                borderTopColor:'#909090',
                borderTopWidth:1,
                justifyContent:'center'
                //figure out shadow in buttons, this is apparently a nightmare to do with the "overflow:'hidden'" style in parent container
            },
          ]}>
            <Text style={styles.settingText}>
                {text}
            </Text>
        </Pressable>
    )
}

*/