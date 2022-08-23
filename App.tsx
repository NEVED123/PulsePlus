import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './theme/ThemeManager';

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </ThemeProvider>
  );
}

