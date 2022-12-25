import { createContext, useState } from 'react'
import { Appearance } from 'react-native'
import { BeatSoundPresets } from './structure'

export const PreferencesContext = createContext(0 as any) //initial values make compiler happy

export function PreferencesProvider({ children } : { children : any }){

    const [theme, setTheme] = useState('dark')

    const [backgroundMode, setBackgroundMode] = useState(false)

    const [flashlight, setFlashlight] = useState(false)

    const [vibrate, setVibrate] = useState(false)

    const [soundSet, setSoundSet] = useState(BeatSoundPresets.default)

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const toggleBackgroundMode = () =>{
        setBackgroundMode(backgroundMode === true ? false : true)
    }

    const toggleFlashlight = () => {
        setFlashlight(flashlight === true ? false : true)
    }

    const toggleVibrate = () => {
        setVibrate(vibrate === true ? false : true)
    }

    const changeSoundSet = () => {

    }

    const contextValues = {
        theme : theme,
        toggleTheme : toggleTheme,
        backgroundMode : backgroundMode,
        toggleBackgroundMode : toggleBackgroundMode,
        flashlight : flashlight,
        toggleFlashlight : toggleFlashlight,
        vibrate : vibrate,
        toggleVibrate : toggleVibrate,
        soundSet : soundSet,
        setSoundSet : setSoundSet
    }

    return(
        <PreferencesContext.Provider value={contextValues}>
            {children}
        </PreferencesContext.Provider>
    )
} 
