import { Pressable, Text, StyleSheet} from 'react-native'
import { useContext, useEffect, useState} from 'react'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { altButtonColors, textTitleColors } from '../../../theme/Colors'
import { SongContext } from '../../../logic/SongManager'


export function StartButton(){ 

    const { theme } = useContext(PreferencesContext)
    const { toggleRunning  } = useContext(SongContext)
    const [running, setRunning] = useState(false)




    return(
        <Pressable
            style={({ pressed }) => [
            {backgroundColor: running || pressed ? '#707070': altButtonColors[theme as keyof typeof altButtonColors]},
            styles.startButton
          ]}
            onPress={
                ()=>{
                    toggleRunning()
                    setRunning(!running)
                }
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
