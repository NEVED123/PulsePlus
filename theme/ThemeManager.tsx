import { createContext, useState } from 'react'
import { Appearance } from 'react-native'

export const ThemeContext = createContext({theme : '', toggleTheme : ()=>{}}) //initial values make compiler happy

export function ThemeProvider({ children } : { children : any }){

    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        if(theme === 'light')
            setTheme('dark')
        else   
            setTheme('light')
        console.log(theme)
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
} 