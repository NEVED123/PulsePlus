import SettingButtonToggleBase from "./SettingButtonToggleBase";
import { useContext } from 'react'
import { PreferencesContext } from "../../../logic/PreferencesManager";

export default function BackgroundModeButton(){

    const {toggleBackgroundMode} = useContext(PreferencesContext)

    return(
        <SettingButtonToggleBase text={'Background Mode'} onChange={toggleBackgroundMode}/>
    )
}