import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import BuildSongScreen from '../screens/BuildSongScreen/BuildSongMenu';
import { View, Image, StyleSheet } from 'react-native'
import BuildSongScreenNavigation from './BuildSongScreenNavigation';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
    screenOptions = {{
      headerShown: false,
        tabBarStyle: {
          position: 'relative',
          bottom:25,
          top: 0,
          backgroundColor: '#303030',
          height: 95,
        }
      }}
      >
      <Tab.Screen name="Metronome" component={HomeScreen} 
        options={{tabBarIcon: ({ focused })=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={ focused ? require('../assets/tab-logos/BlueMetronomeLogo.png') : 
                                 require('../assets/tab-logos/MetronomeLogo.png')}
              resizeMode="contain"
              style={styles.image}
              />
            </View>
          )
        }}}/>
      <Tab.Screen name='Build Song' component={BuildSongScreenNavigation}
        options={{tabBarIcon: ({ focused })=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={ focused ? require('../assets/tab-logos/BlueSoundsLogo.png') : 
                                 require('../assets/tab-logos/SoundsLogo.png')}
              resizeMode="contain"
              style={styles.image}
              />
            </View>
          )
        }}}/>  
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{tabBarIcon: ({ focused })=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={ focused ? require('../assets/tab-logos/BlueSettingsLogo.png') : 
                                 require('../assets/tab-logos/SettingsLogo.png')}
              resizeMode="contain"
              style={styles.image}
              />
            </View>
          )
        }}}/>  
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  image:{
    height:40,
    width:30
  },
  iconContainer:{
    alignItems:'center', 
    justifyContent:'center'
  }
})