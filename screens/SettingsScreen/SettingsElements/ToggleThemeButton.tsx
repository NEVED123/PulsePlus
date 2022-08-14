import SettingButtonBase from './SettingButtonBase'
import { ThemeContext } from '../../../theme/ThemeManager'
import { useContext } from 'react'

export default function ToggleThemeButton(){

    const { theme, toggleTheme } = useContext(ThemeContext)

    return(
        <SettingButtonBase text='change mode' behavior={()=>toggleTheme()}/>
    )
}