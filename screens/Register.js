import React from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import { Ionicons } from '@expo/vector-icons';


export default class Register extends React.Component{

    constructor(props){
        super(props);
        this.state={
            password:"",
            re_password:"",
            authPassword:"",
            confirmDialogVisible: false,
            currentPassDialogVisible: false,
            warningVisible: false,
            lengthOK: false,
            numberOK: false,
            letterOK: false
        }
    }

    _storeData = async (dataContainer, data) => { //both parameters are string.
        try {
          await AsyncStorage.setItem(dataContainer, data);
        } catch (error) {
          // Error saving data
          console.log(error);
        }
    };

    _retrieveData = (dataContainer) => { // takes string input
        try {
          const value = AsyncStorage.getItem(dataContainer);
          if (value != null){
            return value;
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
    };

    validate = (text) => {
        if(text.length>=6 && text.length<=16){
            this.setState({lengthOK:true});
        }
        else{
            this.setState({lengthOK:false});
        }
        if(/\d/.test(text)){
            this.setState({numberOK:true});
        }
        else{
            this.setState({numberOK:false});
        }
        if(/[a-zA-Z]/.test(text)){
            this.setState({letterOK:true});
        }
        else{
            this.setState({letterOK:false});
        }
    }

    showDialog = () => {
        if(this.state.lengthOK && this.state.letterOK && this.state.numberOK){
            if(this.state.password===this.state.re_password){
                this.setState({ confirmDialogVisible: true });
            }
            else{
                this.setState({ warningVisible: true });
            }
        }
        else{
            alert("Şifre belirtilen koşullara uymuyor");
        }
    };
     
    handleSave = () => {
        this.setState({ confirmDialogVisible: false });
        this._storeData("main_password",this.state.password);
        alert("Şifreniz başarıyla oluşturuldu");
        this.props.navigation.navigate("Login");
    };
     
    handleBack = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ confirmDialogVisible: false });
    };

    handleAuth = () => {
        this._retrieveData("main_password").then((result)=>{
            if(result===this.state.authPassword){
                this.setState({ currentPassDialogVisible: false });
            }
            else{
                alert("Yanlış şifre girdiniz");
            }
        });
    }

    handleCancel = () => {
        this.setState({ currentPassDialogVisible: false });
        this.props.navigation.navigate("Login");
    }

    register = () => {
        if(this.state.password===this.state.re_password){
            this._storeData("main_password",this.state.password);

        }
    }

    UNSAFE_componentWillMount(){
        this._retrieveData("main_password").then((result)=>{
            if(result){
                this.setState({currentPassDialogVisible:true});
            }
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={{marginBottom:10, color:"#F7F7EE"}}>Şifreniz şu koşullara uymalıdır :</Text>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        {this.state.lengthOK? 
                            <Ionicons name="md-checkmark-circle" color="green" size={20}/> 
                            : 
                            <Ionicons name="md-checkmark-circle" color="#F7F7EE" size={20}/>
                        }
                        <Text style={styles.textStyle} >   6-16 karakter uzunluğunda</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        {this.state.letterOK? 
                            <Ionicons name="md-checkmark-circle" color="green" size={20}/> 
                            : 
                            <Ionicons name="md-checkmark-circle" color="#F7F7EE" size={20}/>
                        }
                        <Text style={styles.textStyle}>   En az bir harf içeriyor</Text>
                    </View>
                    <View style={{flexDirection:"row", alignItems:"center"}}>
                        {this.state.numberOK? 
                            <Ionicons name="md-checkmark-circle" color="green" size={20}/> 
                            : 
                            <Ionicons name="md-checkmark-circle" color="#F7F7EE" size={20}/>
                        }
                    <Text style={styles.textStyle}>   En az bir rakam içeriyor</Text>
                    </View>
                </View>
                {this.state.warningVisible? 
                    <Text style={{color:"crimson", marginTop:20, marginBottom:5}} >Şifreler eşleşmiyor</Text>
                    :
                    <Text style={{marginTop:20, marginBottom:5}}> </Text>
                }
                <TextInput
                    style={styles.inputBox}
                    onChangeText = {(text) => {this.setState({ password: text, warningVisible:false }); this.validate(text);}}
                    placeholder = "şifre"
                    secureTextEntry
                />
                <TextInput
                    style={styles.inputBox}
                    onChangeText = {(text) => this.setState({ re_password: text, warningVisible:false })}
                    placeholder = "şifre (tekrar)"
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.showDialog}
                >
                    <Text style={{fontSize:16, fontWeight:"bold", color:"#23395B"}}>Şifreyi Kaydet</Text>
                </TouchableOpacity>
                <Dialog.Container visible={this.state.confirmDialogVisible}>
                    <Dialog.Description>
                        Şifre oluşturma işlemini onaylıyor musunuz ?
                    </Dialog.Description>
                    <Dialog.Button label="Onayla" onPress={this.handleSave} />
                    <Dialog.Button label="Vazgeç" onPress={this.handleBack} />
                </Dialog.Container>
                <Dialog.Container visible={this.state.currentPassDialogVisible}>
                    <Dialog.Description>
                        Lütfen mevcut şifrenizi giriniz
                    </Dialog.Description>
                    <TextInput
                        style={{height:40, width:200, backgroundColor:"#fff", paddingLeft:7}}
                        onChangeText = {(text) => this.setState({ authPassword: text })}
                        placeholder = "şifre"
                        secureTextEntry
                    />
                    <Dialog.Button label="Onayla" onPress={this.handleAuth} />
                    <Dialog.Button label="Vazgeç" onPress={this.handleCancel} />
                </Dialog.Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#23395B"
    },
    inputBox:{
        height:50,
        width:240,
        marginBottom:20,
        backgroundColor:"#fff",
        borderRadius:3,
        fontSize:20,
        color:"#23395B",
        textAlign:"center"
    },
    button:{
        backgroundColor:"#F2C224",
        height:50,
        width:150,
        marginTop:20,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
    },
    textStyle:{
        color:"#F7F7EE"
    }
});