import { View, StyleSheet } from 'react-native'
import { MetronomeBlock } from './MetronomeBlock'

export function MetronomeBlockGroup({ meter, setMeter }:{ meter:number[], setMeter:Function}){
    //The 'index' gives each metronome block a seperate ID based on its position in the array, for now its only purpose
    //is to get a warning to shut up but it will probably become useful
    if(meter.length <= 16){
        return(      
            <View style={styles.metronomeBlockGroup}>
                {meter.map((x,index) => <MetronomeBlock 
                    key={index} 
                    beatNumber={index} 
                    meter={meter} 
                    setMeter={setMeter}/>)}
            </View>
        )
    }
    else{
        const topRow = meter.slice(0,16)
        const bottomRow = meter.slice(16, meter.length)
        return(
            <View style={{flex:1}}>
                <View style={styles.metronomeBlockGroup}>
                {topRow.map((x,index) => <MetronomeBlock 
                key={index} 
                beatNumber={index} 
                meter={meter} 
                setMeter={setMeter}/>)}
                </View>
                <View style={styles.metronomeBlockGroup}>
                {bottomRow.map((x,index) => <MetronomeBlock 
                key={index} 
                beatNumber={index} 
                meter={meter} 
                setMeter={setMeter}/>)}
                </View> 
            </View>

        )

    }

}

const styles = StyleSheet.create({
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:20
    }
})