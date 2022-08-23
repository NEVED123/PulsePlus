import { Pressable, Text, StyleSheet} from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeManager'
import { altButtonColors, textTitleColors } from '../../../theme/Colors'

export function StartButton({ running, setRunning }:{ running:boolean, setRunning:Function }){ 

    const { theme } = useContext(ThemeContext)

    return(
        <Pressable
            style={({ pressed }) => [
            {backgroundColor: running || pressed? '#707070': altButtonColors[theme as keyof typeof altButtonColors]},
            styles.startButton
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
            <Text style={[{color: textTitleColors[theme as keyof typeof textTitleColors]},
                            styles.startText]}>
                {running ? "Stop" : "Start"}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
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
        fontSize:36
    }
})
