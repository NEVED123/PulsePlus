import { BuildSongButton } from "./BuildSongButton";
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Nav from '../../../navigation/NavType'
import SongSummary from "./SongSummaryElements/SongSummary";

export function BuildSongButtonPanel(){

    const { navigate } = useNavigation<Nav>()

    return(
        <View style={styles.container}>
            <BuildSongButton 
                text={'Summary'} onPress={()=>{navigate('SongSummary')}}/>
            <BuildSongButton text={'Save'} onPress={()=>{}}/>
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