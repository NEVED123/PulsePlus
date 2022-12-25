import SettingButtonToggleBase from "./SettingButtonToggleBase";
import { useContext } from 'react'
import { PreferencesContext } from "../../../theme/PreferencesManager";

export default function VibrateOnDownbeat(){

    const { toggleVibrate } = useContext(PreferencesContext)
    
    return(
        <SettingButtonToggleBase text='Vibrate On Downbeat' onChange={toggleVibrate}/>
    )
}