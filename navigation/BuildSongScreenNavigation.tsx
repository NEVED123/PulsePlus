import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SongSummary from '../screens/BuildSongScreen/SongSummary';
import BuildSongMenu from '../screens/BuildSongScreen/BuildSongMenu';

const Stack = createNativeStackNavigator()

export default function BuildSongScreen(){
    return (
        <Stack.Navigator initialRouteName={"BuildSongMenu"}>
            <Stack.Screen 
                name="BuildSongMenu" 
                component={BuildSongMenu}
                options={{ headerShown: false}}
            />
            <Stack.Screen 
                name="SongSummary" 
                component={SongSummary}
            />
        </Stack.Navigator>
      )
}