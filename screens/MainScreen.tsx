import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';

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
            <View style={meterChanger.container}>
            </View>
        <View style= {buttonStyles.container} >
            <Button style={buttonStyles.metronome} title="metronome" color="#841584">
            metronome
            </Button>
            <Button style={buttonStyles.buildSong} title="build song" color="#841584">
            build song
            </Button>
            <Button style={buttonStyles.tuner} title="tuner" color="#841584">
            tuner
            </Button>
            <Button style={buttonStyles.settings} title='settings'color="#841584">
            settings
            </Button>
            </View>
        </View>
    );
}

/**
 * a defined space for our beat visualization
 
function ClickSpace() {
}

function MeterChanger(){
    
}
  */
const mainScreen = StyleSheet.create({
    container: {
      flex:1,
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

const buttonStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 30,
        flex:1,
    },
    metronome:{
        backgroundColor: "red",
        padding: 25,
    },
    buildSong:{
        backgroundColor: "red",
        padding: 25,
    },
    tuner:{
        backgroundColor: "red",
        padding: 25,
    },
    settings:{
        backgroundColor: "red",
        padding: 25,

    },
})

const meterChanger = StyleSheet.create({
    container:{
        flexDirection:'row',
        flex:1,
    }
})


