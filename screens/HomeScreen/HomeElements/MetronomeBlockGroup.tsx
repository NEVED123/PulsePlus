import { array } from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { MetronomeBlock } from './MetronomeBlock'

export function MetronomeBlockGroup({ meter, setMeter }:{ meter:number[], setMeter:Function}){
    //The 'index' gives each metronome block a seperate ID based on its position in the array, for now its only purpose
    //is to get a warning to shut up but it will probably become useful
    const rows = rowDistributionArray(meter)
    console.log({rows})
    return(  
        <View style={{flex:1}}>
            {rows.map((row, index)=>
                <View 
                    style={styles.metronomeBlockGroup}>
                    {row.map((x,index) => 
                    <MetronomeBlock 
                        key={index} 
                        beatNumber={index} 
                        meter={meter} 
                        setMeter={setMeter}/>)}
                </View>     
            )}
                  
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

function rowDistributionArray(meter: number[]): number[][]{
    const length = meter.length
    const amountOfRows = numberOfRows(length) //confusing naming but naming is hard
    const rowSizes = new Array(amountOfRows).fill(Math.floor(length/amountOfRows))    
    const remainder = length % amountOfRows

    for(let i = 0;i<remainder;i++){
        rowSizes[i] += 1
    }

    const rowedMeter: number[][] = []
    let meterIndex = 0

    rowSizes.forEach((rowSize)=>{
        const row = []

        for(let i=meterIndex;i<meterIndex+rowSize;i++){
            row.push(meter[i])
        }

        rowedMeter.push(row)

        meterIndex += rowSize
    })

    return rowedMeter

}

const styles = StyleSheet.create({
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:20
    }
})
