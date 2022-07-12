import { StyleSheet, View, Text, SafeAreaView } from 'react-native';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function MainScreen() {
    return (
        <View style={mainScreen.container}>
            <View style={clickSpace.container}>
            </View>
            <View style={meterChanger.container}>
            </View>
        </View>
    );
}

/**
 * a defined space for our beat visualization
 */
function ClickSpace() {
}

function MeterChanger(){
    
}
  
const mainScreen = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#3F3F3F',
      flexDirection:'column',
    },
  });

const clickSpace = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        margin:30
    }
})

const meterChanger = StyleSheet.create({
    container:{
        flexDirection:'row',
        flex:1
    }
})


