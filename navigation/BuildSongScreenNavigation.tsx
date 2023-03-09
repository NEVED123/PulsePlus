import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BuildSongProvider } from '../logic/BuildSongManager';
import SongSummary from '../screens/BuildSongScreen/BuildSongElements/SongSummaryElements/SongSummary';
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
                options={{ headerShown: false}}
            />
        </Stack.Navigator>
      )
}