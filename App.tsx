import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import  MainScreen  from './screens/MainScreen';

export default function App() {
  return (
    <View style={{flex:1}}>
      <StatusBar style="auto" />
      <MainScreen/>
    </View>
  );
}

