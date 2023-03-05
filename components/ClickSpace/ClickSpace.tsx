import { View, StyleSheet } from 'react-native'
import { MetronomeBlockGroup } from '../MetronomeBlockGroup/MetronomeBlockGroup'
import { Song } from '../../logic/structure'
import { useContext, Context } from 'react'

export function ClickSpace({context, width} : {context: Context<any>, width? : number}){

    return(
        <View style={styles.clickSpace}>
            <MetronomeBlockGroup
                context={context}
                width={width}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    clickSpace:{
        flex:1
    }
})

//function processSong()