import React from "react";
import { View, Text, StyleSheet, TextInput, AsyncStorage, ScrollView } from "react-native";
import Home from "../Home";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

export default class HomeStack extends React.Component{
    render(){
        return(
            <NavigationContainer independent={true}>
                <Drawer.Navigator initialRouteName="Home">
                    <Drawer.Screen name="Home" component={Home} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"lightgray"
    }
});