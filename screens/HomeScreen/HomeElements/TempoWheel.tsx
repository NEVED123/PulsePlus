import { View, Text, StyleSheet, GestureResponderEvent, Pressable } from 'react-native'
import { useState } from 'react'

//Here we pass in the tempo and setTempo hook, i don't think this is the 'correct' way to do it but it works :/
export function TempoWheel({ tempo, setTempo }:{ tempo:number, setTempo:Function }){ 
    const[theta, setTheta] = useState(0)
    const[internalTempo, setInternalTempo] = useState(tempo) //can be a decimal for fine tuning, end result is an integer
    return(
        <View style={{alignItems:'center'}}>
            <Pressable
                style={({pressed}) => [
                    {shadowRadius: pressed ? 30 : 4}, 
                    styles.tempoWheel]}
                onTouchMove={(e)=>handleMove(e, tempo, setTempo, internalTempo, setInternalTempo, theta, setTheta)}
                onPress={e => tapTempo(e, tempo, setTempo)}>
                <View style={{width:250, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text 
                        style={styles.tempoDirectionText}
                        onPress={()=>{if(tempo > 10) setTempo(tempo - 1)}}>-
                    </Text>
                    <Text 
                        style={styles.tempoDirectionText}
                        onPress={()=>{if(tempo < 800) setTempo(tempo+1)}}>+
                    </Text>
                </View>
            </Pressable>
            <Text style={styles.tempoText}>{tempo}</Text>
        </View>
    )
}

let lastTimeStamp: number;
let newTempo: number;

function tapTempo(e: GestureResponderEvent, tempo: number, setTempo: Function) {
    if (lastTimeStamp == undefined || // if there isn't a last time stamp yet
        (e.nativeEvent.timestamp - lastTimeStamp) > 3000 || // or the time between stamps is greater than 3 seconds
        e.nativeEvent.timestamp == lastTimeStamp) { // or the last time stamp is the same as this one
        newTempo = tempo;
    }
    else newTempo = 60000/(e.nativeEvent.timestamp - lastTimeStamp)
    if (newTempo > 800) newTempo = 800
    lastTimeStamp = e.nativeEvent.timestamp;
    setTempo(Math.trunc((newTempo + tempo) / 2));
}

function handleMove(e: GestureResponderEvent, tempo:number, setTempo: Function, 
    internalTempo:number, setinternalTempo: Function, theta:number, setTheta:Function){
    const x = e.nativeEvent.locationX-125
    const y = 125-e.nativeEvent.locationY
    const theta2 = Math.atan(y/x)
    const deltaTheta = theta2-theta
    const distance = Math.hypot(x,y)
    //if finger is in circle
    if(distance <=125){
        //if moving clockwise
        if(deltaTheta < 0) { 
            if(tempo < 800) {
                setinternalTempo(internalTempo + (distance/125))
            }
        }
        else {
            if(tempo > 10){
                setinternalTempo(internalTempo - (distance/125))
            }
            
        }
        setTempo(Math.floor(internalTempo))
        setTheta(theta2)
                
    }
}

const styles = StyleSheet.create({
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
        shadowOpacity: 0.25
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
    }
})