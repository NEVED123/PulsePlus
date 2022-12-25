import SettingButtonToggleBase from "./SettingButtonsBases/SettingButtonToggleBase";
import { useContext } from 'react'
import { PreferencesContext } from "../../../logic/PreferencesManager";

export default function VibrateOnDownbeat(){

    const { toggleVibrate } = useContext(PreferencesContext)
    
    return(
        <SettingButtonToggleBase text='Vibrate On Downbeat' onChange={toggleVibrate}/>
    )
}