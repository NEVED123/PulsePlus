import { BuildSongButton } from "./BuildSongButton";
import { View } from 'react-native'
import { StyleSheet } from 'react-native'

export function BuildSongButtonPanel(){
    return(
        <View style={styles.container}>
            <BuildSongButton text={'Summary'} onPress={()=>{}}/>
            <BuildSongButton text={'Create'} onPress={()=>{}}/>
            <BuildSongButton text={'Load'} onPress={()=>{}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginVertical:10
    }
})