import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import TunerScreen from '../screens/TunerScreen/TunerScreen';
import SoundScreen from '../SoundScreen/SoundScreen';
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
    screenOptions = {{
      headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 25,
          left:20,
          right: 20,
          elevation: 0,
          backgroundColor: '#303030',
          borderRadius: 15,
          height: 90,
        }
      }}
      >
      <Tab.Screen name="Metronome" component={HomeScreen} />
      <Tab.Screen name="tuner" component={TunerScreen} />
      <Tab.Screen name='Sounds' component={SoundScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default Tabs;