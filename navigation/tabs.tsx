import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen/SettingsScreen';
import TunerScreen from '../screens/TunerScreen/TunerScreen';
import SoundScreen from '../SoundScreen/SoundScreen';
import { View, Image, StyleSheet } from 'react-native'

const Tab = createBottomTabNavigator();

export default function Tabs() {
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
      <Tab.Screen name="Metronome" component={HomeScreen} 
        options={{tabBarIcon: ()=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={require('../assets/tab-logos/MetronomeLogo.png')}
              style={styles.image}
              />
            </View>
          )
        }}}/>
      <Tab.Screen name="Tuner" component={TunerScreen}
        options={{tabBarIcon: ()=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={require('../assets/tab-logos/TuningForkLogo.png')}
              style={styles.image}
              />
            </View>
          )
        }}}/>      
      <Tab.Screen name='Sounds' component={SoundScreen}
        options={{tabBarIcon: ()=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={require('../assets/tab-logos/SoundsLogo.png')}
              style={{
                height:40,
                width:40
              }}
              />
            </View>
          )
        }}}/>  
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{tabBarIcon: ()=>{
          return(
            <View style={styles.iconContainer}>
              <Image
              source={require('../assets/tab-logos/SettingsLogo.png')}
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