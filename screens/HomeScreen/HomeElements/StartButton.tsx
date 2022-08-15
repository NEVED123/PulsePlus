import { Pressable, Text, StyleSheet} from 'react-native'
import { useContext } from 'react'
import { ThemeContext } from '../../../theme/ThemeManager'

export function StartButton({ running, setRunning }:{ running:boolean, setRunning:Function }){ 

    const { theme } = useContext(ThemeContext)

    return(
        <Pressable
            style={({ pressed }) => [
            {backgroundColor: running || pressed? '#707070': color[theme as keyof typeof color]},
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
            <Text style={[{color: text[theme as keyof typeof text]},
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

const color = {
    light: '#FFFFFF',
    dark: '#3f3f3f'
}

const text = {
    light: '#000000',
    dark: '#FFFFFF'
}