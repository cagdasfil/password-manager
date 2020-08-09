import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, AsyncStorage, Alert } from "react-native";
import Dialog from "react-native-dialog";
import ColorDialog from "./ColorDialog";
import DialogButton from "./DialogButton";
import { Ionicons } from '@expo/vector-icons';

export default class AddCardDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            header:"",
            username:"",
            mail:"",
            password:"",
            cardColor:"#FFFC00",
            fontColor:"#010101"
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
        if(this.state.header === ""){
            Alert.alert("","Başlık boş bırakılamaz");
            return;
        }
        let passwords = this.props.passwords;
        let newPassword = {
            "id":Date.now().toString(),
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
        this.clearInputs();
    }

    handleCardColorChoice = (color) => {
        this.setState({cardColor:color});
    }

    handleFontColorChoice = (color) => {
        this.setState({fontColor:color});
    }

    handleBack = () => {
        this.setState({visible:false, password:""})
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

    clearInputs = () => {
        this.setState({
            header:"",
            username:"",
            mail:"",
            password:"",
            cardColor:"#FFFC00",
            fontColor:"#010101"
        });
    }

    generatePassword = () => {
        let currentPassword = this.state.password;
        let newPassword = "";
        if(currentPassword.length < 6){
            newPassword = this.randomStr(6);
        }
        else if(currentPassword.length > 20){
            newPassword = this.randomStr(20);
        }
        else{
            newPassword = this.randomStr(currentPassword.length+1);
        }
        this.setState({password:newPassword});
    }

    randomStr = (len) => {
        let arr = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let pwd = ''; 
        for (let i = len; i > 0; i--) { 
            pwd +=  
              arr[Math.floor(Math.random() * arr.length)]; 
        } 
        return pwd; 
    } 

    render(){
        return (
            <Dialog.Container visible={this.state.visible}>
                <View style={{alignItems:"flex-start"}}>
                    <Text style={{marginLeft:5}}>Başlık</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                maxLength={50}
                                onChangeText = {(text) => this.setState({ header: text })}
                        />
                    </View>
                    <Text style={{marginLeft:5}}>Kullanıcı adı</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                maxLength={50}
                                onChangeText = {(text) => this.setState({ username: text })}
                        />
                    </View>
                    <Text style={{marginLeft:5}}>Mail</Text>
                    <View style={{flexDirection:"row"}}>
                        <TextInput
                                style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                maxLength={50}
                                onChangeText = {(text) => this.setState({ mail: text })}
                        />
                    </View>
                    <Text style={{marginLeft:5}}>Şifre</Text>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flexDirection:"row", flex:1, alignItems:"center"}}>
                            <TextInput
                                    style={{height:40, flex:1, borderWidth:1, borderRadius:5, margin:5, backgroundColor:"#fff", paddingLeft:7}}
                                    maxLength={50}
                                    onChangeText = {(text) => this.setState({ password: text })}
                                    value = {this.state.password}
                            />
                            <TouchableOpacity style={{marginHorizontal:5}} onPress={this.generatePassword}>
                                <Ionicons name="md-repeat" size={30} color="black"/>
                            </TouchableOpacity>
                        </View>
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
                <DialogButton label="Onayla" onPress={this.handleSave} />
                <DialogButton label="Vazgeç" onPress={this.handleBack} />
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