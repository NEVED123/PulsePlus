import { View, StyleSheet, TextInput} from 'react-native'
import { useContext, useState, useEffect } from 'react'
import { backgroundColors } from '../../../theme/Colors'
import { PreferencesContext } from '../../../logic/PreferencesManager'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Meter } from '../../../logic/structure'
import { ClickSpace } from '../../../components/ClickSpace/ClickSpace'
import { BuildSongContext } from '../../../logic/BuildSongManager'
import { Dimensions } from 'react-native'
import { rowSizes } from '../../../components/MetronomeBlockGroup/MetronomeBlockGroupBehavior'

export default function MeterDisplay(){

    const { setSectionName, sectionName, activeMeter } = useContext(BuildSongContext)

    const topRowNumber = rowSizes(activeMeter)[0]

    const [sectionNameText, setSectionNameText] = useState(sectionName)

    //I have no idea why this is necessary but it fixes the name not updating
    useEffect(()=>{
        setSectionNameText(sectionName)
    },[sectionName])

    return(
            <View style={styles.meterDisplay}>
                <TextInput
                    value={sectionNameText}
                    onChangeText={text=>{
                        setSectionNameText(text)
                    }}
                    onEndEditing={(e)=>{
                        const newName = e.nativeEvent.text              
                        setSectionName(newName)
                    }}
                    style={[styles.sectionName]}
                    placeholder={'[SECTION NAME]'}
                    placeholderTextColor="white">
                </TextInput>
                <ClickSpace
                    context={BuildSongContext}
                    width={(Dimensions.get('window').width-120-topRowNumber * 6)/topRowNumber}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    meterDisplay:{
        borderRadius:20,
        flex:1,
        padding:20,
        backgroundColor:"#666666",
        alignItems:"center"
    },
    sectionName:{
        color:"white",
        fontSize:20,
        paddingBottom:20
    }
})