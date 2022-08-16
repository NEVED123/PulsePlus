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
          position: 'relative',
          bottom:25,
          left:0,
          right: 0,
          top: 0,
          elevation: 0,
          backgroundColor: '#303030',
          borderRadius: 0,
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