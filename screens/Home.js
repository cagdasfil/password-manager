import React from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage } from "react-native";
import Passwordcard from "../components/PasswordCard";
import HomeHeader from "../components/HomeHeader";

export default class Home extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <HomeHeader />
                <Passwordcard />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFFFFF"
    }
});