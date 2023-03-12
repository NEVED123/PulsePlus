import { Dialog, Text, Button, Portal, Provider } from "react-native-paper";
import { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

export default function SaveSongDialong({ visible, setVisible } : { visible : boolean, setVisible : Function}){

    return(
        <Portal>
            <Dialog visible={visible} onDismiss={()=>setVisible(false)} style={styles.dialog}>
                <Dialog.Title>Alert</Dialog.Title>
                <Dialog.Content>
                    <Text variant="bodyMedium">This is simple dialog</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>setVisible(false)}>Done</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

const styles = StyleSheet.create({
    dialog:{

    }
})
