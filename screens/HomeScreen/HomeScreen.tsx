import { StyleSheet, View, Text, SafeAreaView, Pressable, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * The components will be broken down into individual functions once the main screen layout is complete
 */
export default function HomeScreen() {
    return (
        <LinearGradient colors={['#666666','#333333']} style={homeStyles.container}>
            <SafeAreaView style={homeStyles.background}>
                <ClickSpace/>
                <TimeSignature/>
                <TempoWheel/>
                <StartButton/>
            </SafeAreaView>
        </LinearGradient>
    );
}

function ClickSpace(){
    return(
        //needs behavior for determining how many blocks appear
        <View style={homeStyles.clickSpace}>
            <MetronomeBlock/>
            <MetronomeBlock/>
            <MetronomeBlock/>
        </View>
    )

}

function MetronomeBlock(){
    return(
        //This view will eventually have children for the different accent options
        <View style={homeStyles.metronomeBlock}>
        </View> 
    )

}

function TimeSignature(){
    return(
        <View style={homeStyles.timeSignature}>
            <Text style={homeStyles.timeSignatureNumber}>3</Text>
            <Text style={homeStyles.timeSignatureDivider}>/</Text>
            <Text style={homeStyles.timeSignatureNumber}>3</Text>
        </View>
        
    )
}

function TempoWheel(){
    return(
        <View style={{alignItems:'center'}}>
            <View style={homeStyles.tempoWheel}>
                <View style={{width:250, flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={homeStyles.tempoDirectionText}>-</Text>
                    <Text style={homeStyles.tempoDirectionText}>+</Text>
                </View>
            </View>
            <Text style={homeStyles.tempoText}>78</Text>
        </View>
    )
}

export function StartButton(){
    return(
        <Pressable style={({ pressed }) => [
            {
              backgroundColor: pressed
                ? '#707070'
                : '#3f3f3f'
            },
            homeStyles.startButton
          ]}>
            <Text style={homeStyles.startText}>
                Start
            </Text>
        </Pressable>
    )
}


const homeStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    metronomeBlock:{
        flex:1,
        backgroundColor:'#D9D9D9',
        margin:10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    clickSpace:{
        flex:1,
        flexDirection:'row',
        padding:20
    },
    timeSignature:{
        height:75,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    timeSignatureNumber:{
        fontSize:30,
        lineHeight:75,
        width:75, 
        textAlign:'center',
        backgroundColor:'#D9D9D9',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    timeSignatureDivider:{
        fontSize:30, 
        color:'#D9D9D9', 
        marginLeft:20, 
        marginRight:20,
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4
    },
    tempoWheel:{
        backgroundColor:'#D9D9D9',
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
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    tempoText:{
        color:'white',
        fontSize:36,
        textShadowColor: "#000",
        textShadowOffset: {
            width: 0, 
            height: 4
        },
        textShadowRadius: 4,
        marginBottom:20
    },
    tempoDirectionText:{
        //text for + and - for wheel
        fontSize:36,
        color:'white'
    },
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
        color:'white',
        fontSize:36
    }
})

