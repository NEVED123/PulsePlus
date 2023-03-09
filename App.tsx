import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';
import { PreferencesProvider } from './logic/PreferencesManager';
import { BuildSongProvider } from './logic/BuildSongManager';
import { SongProvider } from './logic/SongManager';

export default function App() {
  return (
    <PreferencesProvider>
      <BuildSongProvider>
        <SongProvider>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </SongProvider>
      </BuildSongProvider>
    </PreferencesProvider>
  );
}

