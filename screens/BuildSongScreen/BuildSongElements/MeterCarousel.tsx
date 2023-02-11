import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useContext } from 'react'
import { BuildSongContext } from '../../../logic/BuildSongManager'
import MeterDisplay from './MeterDisplay'

export function MeterCarousel(){
    
    const { activeMeter } = useContext(BuildSongContext)

    return(
        <View style={styles.container}>
            <MeterDisplay/>
            <View style={styles.addOrRemoveMeter}>
                <Pressable>
                    <Text style={styles.addOrRemoveButtonText}>
                        +
                    </Text>
                </Pressable>
                <Pressable>
                    <Text style={styles.addOrRemoveButtonText}>
                        -
                    </Text>
                </Pressable>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        borderRadius:20,
        backgroundColor:"#909090"
    },
    addOrRemoveMeter:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    addOrRemoveButtonText:{
        color:"white",
        fontSize:30,
        paddingHorizontal:20
    }
})