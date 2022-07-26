import { StyleSheet, View, Text, SafeAreaView, Button, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    return (
        <LinearGradient colors={['#666666','#333333']} style={homeStyles.container}>
            <SafeAreaView style={homeStyles.background}>
                <StatusBar/>

            </SafeAreaView>
        </LinearGradient>
    );
}

const homeStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1
    }
})


