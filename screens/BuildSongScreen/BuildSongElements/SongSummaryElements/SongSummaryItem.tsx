import { View, Text } from 'react-native'
import { useContext, useEffect } from 'react'
import { BuildSongProvider } from '../../../../logic/BuildSongManager'
import { List } from 'react-native-paper'
import { Meter } from '../../../../logic/structure'

export default function SongSummaryItem({ meter, index } : { meter : Meter , index: number}){

    const { sectionName, initBpm, finalBpm, accel, denominator } = meter
    const numerator = meter.beats.length

    

    return(
        <List.Accordion
            title={sectionName != undefined ? sectionName : `Section ${index+1}`}
            description={`${numerator}/${denominator}, BPM = ${finalBpm != undefined ? `${initBpm}->${finalBpm}`:`${initBpm}`}`}
        >
        </List.Accordion>
    )
}