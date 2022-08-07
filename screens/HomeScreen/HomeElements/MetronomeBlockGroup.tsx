import { View, StyleSheet } from 'react-native'
import { MetronomeBlock } from './MetronomeBlock'
import { useState } from 'react'

export function MetronomeBlockGroup({ meter, setMeter }:{ meter:number[], setMeter:Function}){
    //The 'index' gives each metronome block a seperate ID based on its position in the array, for now its only purpose
    //is to get a warning to shut up but it will probably become useful
    const rows = rowDistributionArray(meter)
    const rowSizeArray = rowSizes(meter)
    //some of the worst code I've ever written, I'm so sorry
    const meterIndexHelper = rowSizeArray.map((sum => value => sum += value)(-rowSizeArray[0]))
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
                            beatNumber={meterIndexHelper[rowNumber] + rowPosition} 
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

    const rowSizeArray = rowSizes(meter)

    const rowedMeter: number[][] = []
    let meterIndex = 0

    rowSizeArray.forEach((rowSize)=>{
        const row = []

        for(let i=meterIndex;i<meterIndex+rowSize;i++){
            row.push(meter[i])
        }

        rowedMeter.push(row)

        meterIndex += rowSize
    })

    return rowedMeter

}

function rowSizes(meter: number[]){
    const length = meter.length
    const amountOfRows = numberOfRows(length) //confusing naming but naming is hard
    const rowSizeArray = new Array(amountOfRows).fill(Math.floor(length/amountOfRows))    
    const remainder = length % amountOfRows

    for(let i = 0;i<remainder;i++){
        rowSizeArray[i] += 1
    }

    return rowSizeArray
}

const styles = StyleSheet.create({
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:20,
        paddingVertical:2
    }
})
