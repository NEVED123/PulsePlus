import { View, StyleSheet } from 'react-native'
import { BuildSongMetronomeBlockGroup } from './BuildSongMetronomeBlockGroup'
import { Song } from '../../../logic/structure'
import { useContext } from 'react'

export function BuildSongClickSpace(){

    return(
        <View style={styles.clickSpace}>
            <BuildSongMetronomeBlockGroup/>
        </View>
    )
}

const styles = StyleSheet.create({
    clickSpace:{
        flex:1
    }
})