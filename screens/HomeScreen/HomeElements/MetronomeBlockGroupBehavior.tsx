function numberOfRows(beats: number): number{
    //there's probably a simpler way to do this works
    if(beats <= 7) return 1
    if(beats == 8) return 2
    if(beats == 23) return 4 
    if(beats % 4 == 0) return 4
    if(beats % 3 == 0) return 3
    if(beats % 2 == 0) return 2
    if(beats % 4 == 1) return 4
    if(beats % 3 == 1) return 3
    
    return 2
}

//splices the meter into seperate rows
//[0,0,0,1,0,0]
//[[0,0,0],[1,0,0]]
export function rowDistributionArray(meter: number[]): number[][]{

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

//returns array indicating the size of each row based on the meter
//[0,0,0,0,0,0,0,0]
//[4,4]
export function rowSizes(meter: number[]){
    const length = meter.length
    const amountOfRows = numberOfRows(length) //confusing naming but naming is hard
    const rowSizeArray = new Array(amountOfRows).fill(Math.floor(length/amountOfRows))    
    const remainder = length % amountOfRows

    for(let i = 0;i<remainder;i++){
        rowSizeArray[i] += 1
    }

    return rowSizeArray
}

//returns an array that gives the index for the block at 
//the beginning of each row, used to give assign each block a beat in the meter
export function indexAtBeginningOfEachRow(meter:number[]){
    const rowSizeArray = rowSizes(meter)
    const meterIndexHelper = rowSizeArray.map((sum => value => sum += value)(-rowSizeArray[0]))
    
    if(rowSizeArray[0] > rowSizeArray[1]){
        for(let i = 1;i<rowSizeArray.length;i++){
            meterIndexHelper[i]++ 
        }
    }

    return meterIndexHelper
}

export const METRONOME_BLOCK_GROUP_PADDING = 20