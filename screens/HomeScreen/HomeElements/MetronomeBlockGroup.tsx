import { View, StyleSheet } from 'react-native'
import { MetronomeBlock } from './MetronomeBlock'
import { useState } from 'react'
import { Platform } from 'react-native'
import { rowDistributionArray, indexAtBeginningOfEachRow,
    METRONOME_BLOCK_GROUP_PADDING} from './MetronomeBlockGroupBehavior'

export function MetronomeBlockGroup({ meter, setMeter }:{ meter:number[], setMeter:Function}){
    //The 'key' gives each metronome block a seperate ID based on its position in the array, for now its only purpose
    //is to get a warning to shut up but it will probably become useful
    const rows = rowDistributionArray(meter)
    const indexHelper = indexAtBeginningOfEachRow(meter)
    //index = 0
    return(  
        <View 
            style={{flex:1}}>
            {rows.map((row, rowNumber)=>
                <View 
                    style={styles.metronomeBlockGroup}
                    key={rowNumber}>
                    {row.map((beat,rowPosition) => 
                        <MetronomeBlock 
                            key={rowPosition} 
                            beatNumber={indexHelper[rowNumber] + rowPosition} 
                            meter={meter} 
                            setMeter={setMeter}/>)}
                </View>     
            )}                  
        </View>  
    )

}

const styles = StyleSheet.create({
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:METRONOME_BLOCK_GROUP_PADDING,
        paddingBottom : 2,
        paddingTop: Platform.OS === 'ios' ? 2 : 40,
        justifyContent:'center'
    }
})
