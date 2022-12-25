import SettingButtonToggleBase from "./SettingButtonsBases/SettingButtonToggleBase";
import { useContext } from "react";
import { PreferencesContext } from "../../../logic/PreferencesManager";

export default function FlashlightOnDownBeatButton(){

    const { toggleFlashlight } = useContext(PreferencesContext)

    return(
        <SettingButtonToggleBase text='Flashlight On Downbeat' onChange={toggleFlashlight}/>
    )
}