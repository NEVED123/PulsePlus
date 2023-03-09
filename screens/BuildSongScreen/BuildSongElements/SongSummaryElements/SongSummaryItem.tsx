import { View, Text, StyleSheet } from 'react-native'
import { useContext, useEffect } from 'react'
import { BuildSongProvider } from '../../../../logic/BuildSongManager'
import { List } from 'react-native-paper'
import { Meter } from '../../../../logic/structure'
import { MetronomeBlockGroup } from '../../../../components/MetronomeBlockGroup/MetronomeBlockGroup'
import { ClickSpace } from '../../../../components/ClickSpace/ClickSpace'
import { Dimensions } from 'react-native'
import { rowSizes } from '../../../../components/MetronomeBlockGroup/MetronomeBlockGroupBehavior'

export default function SongSummaryItem({ meter, index } : { meter : Meter , index: number}){

    const { sectionName, initBpm, finalBpm, accel, denominator } = meter
    const numerator = meter.beats.length
    const topRowNumber = rowSizes(meter)[0]

    return(
        <View style={styles.container}>
            <List.Item
                title={sectionName != undefined ? sectionName : `Section ${index+1}`}
                description={`${numerator}/${denominator}, BPM = ${finalBpm != undefined ? `${initBpm}->${finalBpm}`:`${initBpm}`}`}
                descriptionStyle={{alignSelf:'center'}}
                titleStyle={{alignSelf:'center'}}
                
            />
            <MetronomeBlockGroup
                meter={meter}
                width={(Dimensions.get('window').width-120-topRowNumber * 6)/topRowNumber}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        height:150,
        backgroundColor:'#909090',
        paddingBottom:15,
        marginHorizontal:15,
        marginBottom: 10,
        borderRadius:15
    }
})