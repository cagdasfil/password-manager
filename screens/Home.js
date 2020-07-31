import React from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView, Button, TouchableOpacity } from "react-native";
import Passwordcard from "../components/PasswordCard";
import HomeHeader from "../components/HomeHeader";
import { Ionicons } from '@expo/vector-icons';
import AddCardDialog from "../components/AddCardDialog";

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addCardVisibility:false,
            passwords:[]
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

    openDialog = () => {
        this.refs.addCardDialog.openDialog();
        console.log(this.state.passwords);
    }

    handleDelete = (index) => {
        let newPasswords = this.state.passwords;
        newPasswords.splice(index, 1);
        this.setState({passwords:newPasswords});
        this._storeData("passwords",JSON.stringify(newPasswords));
        console.log(index,"deleted");
        this.refreshPasswords();
    }

    refreshPasswords = () => {
        this._retrieveData("passwords").then((result)=>{
            if(result===null){
                this.setState({passwords:[]});
            }
            else{
                this.setState({passwords:JSON.parse(result)});
            }
        });
    }

    UNSAFE_componentWillMount(){
        this._retrieveData("passwords").then((result)=>{
            if(result===null){
                this.setState({passwords:[]});
            }
            else{
                this.setState({passwords:JSON.parse(result)});
            }
        });
    }

    render(){
        return(
            <View style={styles.container}>
                <HomeHeader />
                <ScrollView>
                    <View style={{paddingVertical:10}}>
                        {this.state.passwords.map((password, index)=>{
                            return <Passwordcard 
                                key={index}
                                index={index}
                                password={password}
                                handleDelete={this.handleDelete}
                            />
                        })}
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.addButton} onPress={this.openDialog.bind(this)}>
                    <Ionicons name="md-add" size={40} color="white"/>
                </TouchableOpacity>
                <AddCardDialog ref="addCardDialog" passwords={this.state.passwords} refreshPasswords={this.refreshPasswords}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    addButton:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#23395B",
        width:60,
        height:60,
        borderWidth:2,
        borderRadius:30,
        borderColor:"white",
        position:"absolute",
        right:10,
        bottom:20
    }
});