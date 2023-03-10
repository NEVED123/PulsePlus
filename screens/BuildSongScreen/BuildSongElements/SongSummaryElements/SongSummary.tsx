import { Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native'
import { backgroundColors } from '../../../../theme/Colors'
import { textTitleColors } from '../../../../theme/Colors'
import { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { PreferencesContext } from '../../../../logic/PreferencesManager'
import { BuildSongButton } from '../BuildSongButton'
import SongSummaryItem from './SongSummaryItem'
import { Meter, Beat, Song } from '../../../../logic/structure'
import { BuildSongContext } from '../../../../logic/BuildSongManager'

export default function SongSummary({navigation} : {navigation : any}){

    const { theme } = useContext( PreferencesContext)

    const { song } : { song: Song }= useContext(BuildSongContext)

    const summaryItemArray = song.song.map((meter, index)=>{
        return <SongSummaryItem meter={meter} index={index}/>
    })

    return(
        <LinearGradient colors={backgroundColors[theme as keyof typeof backgroundColors]} style={styles.background}>
            <SafeAreaView style={styles.container}>
                    <BuildSongButton text={'< Back'} onPress={()=>{navigation.navigate('BuildSongMenu')}}/>
                    <Text style={[styles.title, {color : textTitleColors[theme as keyof typeof textTitleColors]}]}>
                        Summary
                    </Text>
                    <ScrollView>
                        {summaryItemArray}
                    </ScrollView>
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
        marginBottom:20
    },
    settingsBox:{
        overflow:'hidden',
        borderRadius:20,
        margin:20,
        borderBottomColor:'#909090', //the settings all have top border only
        borderBottomWidth:1
    }
})