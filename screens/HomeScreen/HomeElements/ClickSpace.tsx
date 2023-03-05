import { View, StyleSheet } from 'react-native'
import { MetronomeBlockGroup } from '../../../components/MetronomeBlockGroup.tsx/MetronomeBlockGroup'
import { Song } from '../../../logic/structure'
import { useContext } from 'react'

export function ClickSpace(){


    return(
        <View style={styles.clickSpace}>
            <MetronomeBlockGroup/>
        </View>
    )
}

const styles = StyleSheet.create({
    clickSpace:{
        flex:1
    }
})

//function processSong()