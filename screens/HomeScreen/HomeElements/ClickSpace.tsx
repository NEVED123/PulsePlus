import { View, StyleSheet } from 'react-native'
import { MetronomeBlockGroup } from './MetronomeBlockGroup'


export function ClickSpace({ meter, setMeter }:{meter:number[], setMeter:Function}){
    return(
        <View style={styles.clickSpace}>
            <MetronomeBlockGroup meter={meter} setMeter={setMeter} />
        </View>
    )
}

const styles = StyleSheet.create({
    clickSpace:{
        flex:1
    }
})