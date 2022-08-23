import SettingButtonBase from './SettingButtonBase'
import { ThemeContext } from '../../../theme/ThemeManager'
import { useContext } from 'react'

export default function ToggleThemeButton(){

    const { theme, toggleTheme } = useContext(ThemeContext)

    //ADD BEHAVIOR TO STORE USER PREF ON LOCAL MACHINE

    return(
        <SettingButtonBase text={theme === 'dark' ? 'Light Mode' : 'Dark Mode' } behavior={()=>toggleTheme()}/>
    )
}