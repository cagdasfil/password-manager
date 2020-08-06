import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage, BackHandler } from "react-native";
import Dialog from "react-native-dialog";
import ColorPalette from 'react-native-color-palette';
import ColorDialog from "./ColorDialog";
import DialogButton from "./DialogButton";


export default class ExitDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false
        }
    }

    handleBack = () => {
        this.setState({visible:false})
    }

    openDialog = () => {
        this.setState({visible:true});
    }

    closeDialog = () => {
        this.setState({visible:false});
    }

    handleExit = () => {
        this.setState({visible:false});
        this.props.exitHandler();
        //BackHandler.exitApp();
    }

    render(){
        return (
            <Dialog.Container visible={this.state.visible}>
                <Dialog.Description>
                    Çıkmak istediğinize emin misiniz ?
                </Dialog.Description>
                <DialogButton label="Onayla" onPress={this.handleExit} />
                <DialogButton label="Vazgeç" onPress={this.handleBack} />
            </Dialog.Container>
        );
    }
};