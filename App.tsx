import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PreferencesProvider } from './logic/PreferencesManager';

export default function App() {
  return (
    <PreferencesProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </PreferencesProvider>
  );
}

