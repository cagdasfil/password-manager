import React from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage, Image } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Login extends React.Component{

    constructor(props){
        super(props);
        this.state={
            enteredPassword:"",
        }
    }

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

    authUser = () => {
        this._retrieveData("main_password").then((result)=>{
            if(result===this.state.enteredPassword){
                this.setState({enteredPassword:""});
                this.textInput.clear();
                this.props.navigation.navigate("Home");
            }
            else if(result){
                alert("Yanlış şifre girdiniz");
            }
            else{
                alert("Henüz şifre oluşturulmadı");
            }
        });
    }

    register = () => {
        this.props.navigation.navigate("Register");
    }
    
    clear = () => {
        AsyncStorage.clear();
    }

    render(){
        return(
            <View style={styles.container}>
                <Image
                    style={{width:250, height:250}}
                    source={require("../assets/images/logo.png")} 
                />
                <View style={{flexDirection:"row"}}>
                    <TextInput
                        style={styles.inputBox}
                        onChangeText = {(text) => this.setState({ enteredPassword: text })}
                        placeholder = "şifre"
                        secureTextEntry
                        ref={input => { this.textInput = input }}
                    />
                </View>
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.authUser}
                    >
                        <Text style={{fontSize:16, fontWeight:"bold", color:"#23395B"}}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.newPassword}>
                    <TouchableOpacity
                        onPress={this.register}
                    >
                        <Text style={{color: "#fff", fontWeight:"bold", fontSize:16}} >Yeni Şifre Oluştur</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={this.clear}
                >
                    <Text style={{textAlign:"center", fontWeight:"700"}}>Temizle</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

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
        marginTop:10,
        marginBottom:40,
        backgroundColor:"#fff",
        borderRadius:3,
        fontSize:20,
        color:"#23395B",
        textAlign:"center"
    },
    loginButton:{
        backgroundColor:"#F2C224",
        height:50,
        width:120,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:25,
    },
    newPassword:{
        marginTop:80,
    }
});