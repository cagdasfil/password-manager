import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage } from "react-native";
import Dialog from "react-native-dialog";
import ColorPalette from 'react-native-color-palette';
import ColorDialog from "./ColorDialog";


export default class AddCardDialog extends React.Component{
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
        this.handleCardColorChoice = this.handleCardColorChoice.bind(this);
        this.handleFontColorChoice = this.handleFontColorChoice.bind(this);
    }

    _storeData = async (dataContainer, data) => { //both parameters are string.
        try {
          await AsyncStorage.setItem(dataContainer, data);
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    handleSave = () => {
        let passwords = this.props.passwords;
        let newPassword = {
            "title":this.state.header,
            "username":this.state.username,
            "mail":this.state.mail,
            "password":this.state.password,
            "cardColor":this.state.cardColor,
            "fontColor":this.state.fontColor
        }
        passwords.push(newPassword);
        this._storeData("passwords",JSON.stringify(passwords));
        this.setState({visible:false});
        this.props.refreshPasswords();
    }

    handleCardColorChoice = (color) => {
        this.setState({cardColor:color});
    }

    handleFontColorChoice = (color) => {
        this.setState({fontColor:color});
    }

    handleBack = () => {
        this.setState({visible:false})
    }

    openDialog = () => {
        this.setState({visible:true});
    }

    openCardColor = () => {
        this.refs.cardColorDialog.openColor();
    }

    openFontColor = () => {
        this.refs.fontColorDialog.openColor();
    }

    render(){
        return (
            <Dialog.Container visible={this.state.visible}>
                <View style={{alignItems:"flex-start"}}>
                    <Text style={{marginLeft:5}}>Başlık</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                onChangeText = {(text) => this.setState({ header: text })}
                        />
                    </View>
                    <Text style={{marginLeft:5}}>Kullanıcı adı</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                onChangeText = {(text) => this.setState({ username: text })}
                        />
                    </View>
                    <Text style={{marginLeft:5}}>Mail</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                onChangeText = {(text) => this.setState({ mail: text })}
                        />
                    </View>
                    <Text style={{marginLeft:5}}>Şifre</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                onChangeText = {(text) => this.setState({ password: text })}
                        />
                    </View>
                    <View style={{flexDirection:"row", alignSelf:"stretch", alignItems:"center", justifyContent:"center"}}>
                        <Text>Kart rengi</Text>
                        <TouchableOpacity style={{margin:10, height:30, width:30,
                            borderWidth:1, borderRadius:5, backgroundColor:this.state.cardColor}}
                            onPress={this.openCardColor.bind(this)}>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row", alignSelf:"stretch", alignItems:"center", justifyContent:"center"}}>
                        <Text>Yazı rengi</Text>
                        <TouchableOpacity style={{margin:10, height:30, width:30,
                            borderWidth:1, borderRadius:5, backgroundColor:this.state.fontColor}}
                            onPress={this.openFontColor.bind(this)}>
                        </TouchableOpacity>
                    </View>
                </View>
                <Dialog.Button label="Onayla" onPress={this.handleSave} />
                <Dialog.Button label="Vazgeç" onPress={this.handleBack} />
                <ColorDialog ref="cardColorDialog" chosenColor={this.state.cardColor} handleColorChoice = {this.handleCardColorChoice}/>
                <ColorDialog ref="fontColorDialog" chosenColor={this.state.fontColor} handleColorChoice = {this.handleFontColorChoice}/>
            </Dialog.Container>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#23395B",
        height:80,
        paddingBottom:10,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    text:{
        color:"#FFFFFF",
        fontSize:20
    }
});