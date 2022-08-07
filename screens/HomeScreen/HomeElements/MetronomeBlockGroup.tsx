import { array } from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { MetronomeBlock } from './MetronomeBlock'

export function MetronomeBlockGroup({ meter, setMeter }:{ meter:number[], setMeter:Function}){
    //The 'index' gives each metronome block a seperate ID based on its position in the array, for now its only purpose
    //is to get a warning to shut up but it will probably become useful
    console.log(rowDistributionArray(meter.length))
    return(  
        <View style={{flex:1}}>  
            <View style={styles.metronomeBlockGroup}>
                {meter.map((x,index) => <MetronomeBlock 
                    key={index} 
                    beatNumber={index} 
                    meter={meter} 
                    setMeter={setMeter}/>)}
            </View>
        </View>  
    )

}

function numberOfRows(beats: number): number{
    //there's probably a simpler way to do this works
    if(beats <= 8) return 1
    if(beats % 4 == 0) return 4
    if(beats % 3 == 0) return 3
    if(beats % 2 == 0) return 2
    if(beats % 4 == 1) return 4
    if(beats % 3 == 1) return 3
    if(beats % 2 == 1) return 2
    
    return 1
}

function rowDistributionArray(beats: number): number[]{
    const amountOfRows = numberOfRows(beats) //confusing naming but naming is hard
    const rows = new Array(amountOfRows).fill(Math.floor(beats/amountOfRows))
    
    const remainder = beats % amountOfRows

    for(let i = 0;i<remainder;i++){
        rows[i] += 1
    }

    return rows    
}

const styles = StyleSheet.create({
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:20
    }
})
