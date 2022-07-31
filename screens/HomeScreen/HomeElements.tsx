import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    clickSpace:{
        flex:1
    },
    metronomeBlock:{
        flex:1,
        backgroundColor:'#D9D9D9',
        margin:5,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    metronomeBlockGroup:{
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
    timeSignatureNumberSelector:{
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
    timeSignatureNumber:{
        fontSize:30,
        lineHeight:75,
        width:75, 
        textAlign:'center'
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