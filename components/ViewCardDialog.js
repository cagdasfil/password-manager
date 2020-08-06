import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import Dialog from "react-native-dialog";
import ColorPalette from 'react-native-color-palette';
import ColorDialog from "./ColorDialog";
import DialogButton from "./DialogButton";
import DeletePasswordDialog from "./DeletePasswordDialog";


export default class ViewCardDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            header:"",
            username:"",
            mail:"",
            password:"",
            cardColor:"#1877F2",
            fontColor:"#FF0000"
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

    openDeleteDialog = () => {
        this.refs.deletePasswordDialog.openDialog();
    }

    handleDelete = () => {
        this.refs.deletePasswordDialog.closeDialog();
        this.props.handleDelete();
    }

    render(){
        return (
            <View>
                <Dialog.Container visible={this.state.visible}>
                    <View style ={{backgroundColor:this.props.password.cardColor, alignItems:"center", justifyContent:"center",
                            margin:5, marginBottom:20, height:40, borderWidth:1, borderRadius:5}}>
                        <Text style={{color:this.props.password.fontColor, fontWeight:"bold", fontSize:20}}>{this.props.password.title}</Text>
                    </View>
                    <View style={{alignItems:"flex-start", backgroundColor:"white"}}>
                        <Text style={{marginLeft:5}}>Kullanıcı adı</Text>
                        <View style={{flexDirection:"row"}}>
                            <TextInput
                                    style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5,backgroundColor:"#EAEAEA", paddingLeft:7}}
                                    value={this.props.password.username}
                                    multiline={true}
                                    editable={false}
                            />
                        </View>
                        <Text style={{marginLeft:5}}>Mail</Text>
                        <View style={{flexDirection:"row"}}>
                            <TextInput
                                    style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#EAEAEA", paddingLeft:7}}
                                    value={this.props.password.mail}
                                    multiline={true}
                                    editable={false}
                            />
                        </View>
                        <Text style={{marginLeft:5}}>Şifre</Text>
                        <View style={{flexDirection:"row"}}>
                            <TextInput
                                    style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#EAEAEA", paddingLeft:7}}
                                    value={this.props.password.password}
                                    multiline={true}
                                    editable={false}
                            />
                        </View>
                    </View>
                    <DialogButton label="Sil" onPress={this.openDeleteDialog} />
                    <DialogButton label="Kapat" onPress={this.handleBack} />
                </Dialog.Container>
                <DeletePasswordDialog ref="deletePasswordDialog" handleDelete={this.handleDelete}/>
            </View>
        );
    }
};