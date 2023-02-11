import { View, StyleSheet, Text } from 'react-native'
import { useContext } from 'react'
import { backgroundColors } from '../../../theme/Colors'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Meter } from '../../../logic/structure'
import { ClickSpace } from '../../HomeScreen/HomeElements/ClickSpace'
import { BuildSongContext } from '../../../logic/BuildSongManager'
import { BuildSongClickSpace } from './BuildSongClickSpace'


//similar code to ClickSpace.tsx
export default function MeterDisplay(){

    const { setAccent, activeMeter } = useContext(BuildSongContext)

    return(
            <View style={styles.meterDisplay}>
                <Text style={[styles.sectionName]}>[SECTION NAME]</Text>
                <BuildSongClickSpace/>
            </View>
    )
}

const styles = StyleSheet.create({
    meterDisplay:{
        borderRadius:20,
        flex:1,
        padding:20,
        margin:20,
        backgroundColor:"#666666",
        alignItems:"center"
    },
    sectionName:{
        color:"white",
        fontSize:20,
        paddingBottom:20
    }
})