import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
  );
}

