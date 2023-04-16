import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useContext } from 'react'
import { BuildSongContext } from '../../../logic/BuildSongManager'
import MeterDisplay from './MeterDisplay'

export function MeterCarousel(){
    
    const { incrementMeter, 
        decrementMeter, 
        song, 
        addMeter, 
        removeMeter, 
        length, 
        activeMeterIndex} = useContext(BuildSongContext)

    return(
        <View style={styles.container}>
            <View style={styles.TopOrBottom}>
                <Text style={styles.TopText}>
                    {`${activeMeterIndex+1} / ${length}`}
                </Text>
            </View>
            <View style={{flexDirection:'row', flex:1, alignItems:'center'}}>
                <Text 
                    style={styles.toggleActiveMeter}
                    onPress={()=>{
                        decrementMeter()}}>
                    {'<'}
                </Text>
                <MeterDisplay/>
                <Text 
                    style={styles.toggleActiveMeter}
                    onPress={()=>{
                        incrementMeter()}}>
                    {'>'}
                </Text>
            </View>
            <View style={styles.TopOrBottom}>
                <Pressable>
                    <Text 
                        style={styles.BottomText}
                        onPress={()=>{removeMeter()}}>
                        -
                    </Text>
                </Pressable>
                <Pressable>
                    <Text 
                        style={styles.BottomText}
                        onPress={()=>{addMeter()}}>
                        +
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
    TopOrBottom:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    BottomText:{
        color:"white",
        fontSize:30,
        paddingHorizontal:20
    },
    TopText:{
        color:"white",
        fontSize:25,
        paddingVertical:5
    },
    toggleActiveMeter:{
        color:"white",
        fontSize:20,
        fontWeight:'bold',
        paddingHorizontal:10
    },   
})