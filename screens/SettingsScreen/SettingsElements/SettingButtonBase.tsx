import {StyleSheet, Pressable, Text} from 'react-native' 

//THIS IS ONLY TO BE USED AS A BASE FOR OTHER SETTING BUTTONS
export default function SettingButtonBase({ text, behavior } : { text : string, behavior: Function }){
    return(
        <Pressable style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#707070'
                : '#3f3f3f'
            },
            {
                height:50,
                borderTopColor:'#909090',
                borderTopWidth:1,
                justifyContent:'center'
                //figure out shadow in buttons, this is apparently a nightmare to do with the "overflow:'hidden'" style in parent container
            },
          ]}
          onPress={()=>behavior()}>
            <Text style={settingStyles.settingText}>
                {text}
            </Text>
        </Pressable>
    )
}

const settingStyles = StyleSheet.create({
    settingText:{
        color:'white',
        fontSize:18,
        marginLeft:20
    }
})

