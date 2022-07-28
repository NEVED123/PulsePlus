import { StyleSheet, View, Text, SafeAreaView, Pressable, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react'
//import { homeStyles } from './HomeElements'

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    const [meter, setMeter] = useState(new Array(16).fill(0))
    return (
        <LinearGradient colors={['#666666','#333333']} style={homeStyles.container}>
            <SafeAreaView style={homeStyles.background}>
                <ClickSpace meter={meter}/>
                <TimeSignature/>
                <TempoWheel/>
                <StartButton />
            </SafeAreaView>
        </LinearGradient>
    );
}

export type Meter={
    meter:number[]
}

export function ClickSpace({meter=[0,0,0,0]}:Meter){
    return(
        //needs behavior for determining how many blocks appear
        <View style={homeStyles.clickSpace}>
            <MetronomeBlockGroup meter={meter}/>
        </View>
    )

}



export function MetronomeBlockGroup({meter=[]}:Meter){
    return(
        <View style={homeStyles.metronomeBlockGroup}>
            {meter.map(x => <MetronomeBlock/>)}
        </View>
    )
}


export function MetronomeBlock(){
    return(
        //This view will eventually have children for the different accent options
        <Pressable style={homeStyles.metronomeBlock}>
        </Pressable> 
    )
}

export function TimeSignature(){
    return(
        <View style={homeStyles.timeSignature}>
            <Pressable
            style={homeStyles.timeSignatureNumberSelector}
            onPress={()=>{/*drop down menu*/}}>
                <Text style={homeStyles.timeSignatureNumber}>3</Text>
            </Pressable>
            <Text style={homeStyles.timeSignatureDivider}>/</Text>
            <Pressable 
            style={homeStyles.timeSignatureNumberSelector}
            onPress={()=>{/*drop down menu*/}}>
                <Text style={homeStyles.timeSignatureNumber}>4</Text>
            </Pressable>
        </View>
        
    )
}

export function TempoWheel(){
    return(
        <View style={{alignItems:'center'}}>
            <View style={homeStyles.tempoWheel}>
                <View style={{width:250, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={homeStyles.tempoDirectionText}>-</Text>
                    <Text style={homeStyles.tempoDirectionText}>+</Text>
                </View>
            </View>
            <Text style={homeStyles.tempoText}>78</Text>
        </View>
    )
}

export function StartButton(){ 
    const [running, setRunning] = useState(false) //move state up to top level component
    return(
        <Pressable 
            style={({ pressed }) => [
            {
              backgroundColor: running
                ? '#707070'
                : '#3f3f3f'
            },
            homeStyles.startButton
          ]}
            onPress={
                ()=>{
                    if(running){
                        setRunning(false)
                    }
                    else{
                        setRunning(true)
                    }
                } //startMetronomeFunction
            }>
            <Text style={homeStyles.startText}>
                {running ? "Stop" : "Start"}
            </Text>
        </Pressable>
    )
}

const homeStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    clickSpace:{
        flex:1
    },
    metronomeBlock:{
        flex:1,
        backgroundColor:'#D9D9D9',
        margin:5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    metronomeBlockGroup:{
        flex:1,
        flexDirection:'row',
        padding:20
    },
    timeSignature:{
        height:75,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    timeSignatureNumberSelector:{
        backgroundColor:'#D9D9D9',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    timeSignatureNumber:{
        fontSize:30,
        lineHeight:75,
        width:75, 
        textAlign:'center'
    },
    timeSignatureDivider:{
        fontSize:30, 
        color:'#D9D9D9', 
        marginLeft:20, 
        marginRight:20,
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4
    },
    tempoWheel:{
        backgroundColor:'#D9D9D9',
        width: 250,
        height: 250,
        borderRadius: 125,
        marginTop:20,
        marginLeft:20,
        marginRight:20,
        marginBottom:5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    tempoText:{
        color:'white',
        fontSize:36,
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4,
        marginBottom:20
    },
    tempoDirectionText:{
        //text for + and - for wheel
        fontSize:36,
        color:'white'
    },
    startButton:{
        height:75,
        borderColor:'#909090',
        borderWidth:1,
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        marginLeft:20,
        marginRight:20,
        marginBottom:20,
        //figure out shadow in buttons, this is apparently a nightmare to do with the "overflow:'hidden'" style in parent container
    },
    startText:{
        color:'white',
        fontSize:36
    }
})


