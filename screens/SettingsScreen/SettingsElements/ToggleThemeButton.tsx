import SettingButtonToggleBase from './SettingButtonToggleBase'
import { PreferencesContext } from '../../../theme/PreferencesManager'
import { useContext } from 'react'
import { Switch } from 'react-native'
import { useState } from "react";
import { StyleSheet } from 'react-native';

export default function ToggleThemeButton(){

    const { theme, toggleTheme } = useContext(PreferencesContext)

    //ADD BEHAVIOR TO STORE USER PREF ON LOCAL MACHINE

    return(
        <SettingButtonToggleBase text={theme === 'dark' ? 'Light Mode' : 'Dark Mode' } onChange={toggleTheme}/>
    )
}
