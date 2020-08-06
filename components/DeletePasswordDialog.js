import React from "react";
import Dialog from "react-native-dialog";
import DialogButton from "./DialogButton";

export default class DeletePasswordDialog extends React.Component{
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

    render(){
        return (
            <Dialog.Container visible={this.state.visible}>
                <Dialog.Description>
                    Şifreyi silmek istediğinize emin misiniz ?
                </Dialog.Description>
                <DialogButton label="Onayla" onPress={this.props.handleDelete} />
                <DialogButton label="Vazgeç" onPress={this.handleBack} />
            </Dialog.Container>
        );
    }
};