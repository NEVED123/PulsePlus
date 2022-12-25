import SettingButtonToggleBase from "./SettingButtonToggleBase";
import { useContext } from "react";
import { PreferencesContext } from "../../../theme/PreferencesManager";

export default function FlashlightOnDownBeatButton(){

    const { toggleFlashlight } = useContext(PreferencesContext)

    return(
        <SettingButtonToggleBase text='Flashlight On Downbeat' onChange={toggleFlashlight}/>
    )
}