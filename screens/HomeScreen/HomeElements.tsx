import { StyleSheet, View, Text, SafeAreaView, Button } from 'react-native';

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