import {StyleSheet, Pressable, Text} from 'react-native' 

type DisplayName={
    text:string
}

export function SettingButton({text= ''}:DisplayName){
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
          ]}>
            <Text style={settingStyles.settingText}>
                {text}
            </Text>
        </Pressable>
    )
}

export const settingStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    settingTitle:{
        color:'white',
        fontSize:40,
        textAlign:'center',
        margin:20
    },
    settingsBox:{
        overflow:'hidden',
        backgroundColor:'black',
        borderRadius:20,
        margin:20,
        borderBottomColor:'#909090', //the settings all have top border only
        borderBottomWidth:1,
    },
    settingText:{
        color:'white',
        fontSize:18,
        marginLeft:20
    }
})

