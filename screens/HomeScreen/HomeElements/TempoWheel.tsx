import { View, Text, StyleSheet, GestureResponderEvent, Pressable, Platform } from 'react-native'
import { useState, useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeManager'
import { buttonColors, borderWidths, textTitleColors, textShadowColors, altButtonColors, textColors} from '../../../theme/Colors'
import { SongContext } from '../../../logic/SongManager'

//Here we pass in the tempo and setTempo hook, i don't think this is the 'correct' way to do it but it works :/
export function TempoWheel(){ 

    const { theme } = useContext(ThemeContext)
    const { setTempo, getTempo } = useContext(SongContext)
    const [theta, setTheta] = useState(0)
    const [internalTempo, setInternalTempo] = useState(getTempo()) //can be a decimal for fine tuning, end result is an integer
    return(
        <View style={{alignItems:'center', justifyContent:'center'}}>
            <Pressable
                style={({pressed}) => [
                    {
                        shadowRadius: pressed ? 30 : 4,
                        elevation: pressed ? 30 : 4,
                        backgroundColor: buttonColors[theme as keyof typeof buttonColors],
                        borderWidth: borderWidths[theme as keyof typeof borderWidths]
                    }, 
                    styles.tempoWheel]}
                onTouchMove={(e)=>handleMove(e, getTempo(), setTempo, internalTempo, setInternalTempo, theta, setTheta)}>
                <View style={{width:250, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text 
                        style={[{color: textColors[theme as keyof typeof textColors]},
                            styles.tempoDirectionText]}
                        onPress={()=>{if(getTempo() > 10) setTempo(getTempo() - 1)}}>-
                    </Text>
                    <Text 
                        style={[{color: textColors[theme as keyof typeof textColors]},
                        styles.tempoDirectionText]}
                        onPress={()=>{if(getTempo() < 800) setTempo(getTempo()+1)}}>+
                    </Text>
                </View>
                <Pressable
                    style={[{backgroundColor:altButtonColors[theme as keyof typeof altButtonColors],
                            borderWidth:borderWidths[theme as keyof typeof borderWidths]},
                            styles.tapTempo]}
                    onPress={e => tapTempo(e, getTempo(), setTempo)}>
                    <Text style={[{color:textColors[theme as keyof typeof textColors],
                                   textShadowColor:textShadowColors[theme as keyof typeof textShadowColors]},
                                   styles.tapTempoText]}>
                        TAP
                    </Text>
                </Pressable>
            </Pressable>
            <Text style={[{color: textTitleColors[theme as keyof typeof textTitleColors],
                           textShadowColor: textShadowColors[theme as keyof typeof textShadowColors] },
                           styles.tempoText]}>{getTempo()}
            </Text>
        </View>
    )
}

let lastTimeStamp: number = 0,
    newTempo: number,
    numTaps: number;

function tapTempo(e: GestureResponderEvent, tempo: number, setTempo: Function) {
    if (e.nativeEvent.timestamp - lastTimeStamp > 3000) {
    // if the time between stamps is greater than 3000 milliseconds (3 seconds)
        newTempo = tempo;
        numTaps = 1;
    }
    else {
        newTempo = 60000 / (e.nativeEvent.timestamp - lastTimeStamp)
        setTempo(Math.trunc(
            numTaps == 1 ? newTempo : (newTempo + tempo) / 2
        ));
        numTaps++;
    }
    lastTimeStamp = e.nativeEvent.timestamp;
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
        fontSize:36,
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4,
        marginBottom:20
    },
    tempoDirectionText:{
        //text for + and - for wheel
        fontSize:36
    },
    tapTempo:{
        width: 125,
        height: 125,
        borderRadius: 125,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        alignSelf:'center',
        marginTop: Platform.OS === 'ios' ? 19.5 : 15, //gross way to get it in the center, this probably needs a refactor lmao
        alignItems:'center',
        justifyContent:'center'
    },
    tapTempoText:{
        fontSize:36
    }
})
