import { Text, SafeAreaView, StyleSheet} from 'react-native'
import { backgroundColors } from '../../theme/Colors'
import { textTitleColors } from '../../theme/Colors'
import { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { PreferencesContext } from '../../logic/PreferencesManager'
import { BuildSongButton } from './BuildSongElements/BuildSongButton'

export default function SongSummary({navigation} : {navigation : any}){

    const { theme } = useContext( PreferencesContext)
    
    return(
        <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={styles.background}>
            <SafeAreaView style={styles.container}>
                <BuildSongButton text={'< Back'} onPress={()=>{navigation.navigate('BuildSongMenu')}}/>
                <Text style={[styles.title, {color : textTitleColors[theme as keyof typeof textTitleColors]}]}>
                    Summary
                </Text>
            </SafeAreaView>
        </LinearGradient> 
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
    },
    background:{
        flex:1
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