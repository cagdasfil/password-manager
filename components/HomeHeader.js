import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class HomeHeader extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Şifrelerim</Text>
                <TouchableOpacity style={styles.search}>
                    <Ionicons name="md-search" size={20} color="white"/>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        position:"relative",
        backgroundColor:"#23395B",
        height:80,
        paddingBottom:10,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    text:{
        color:"#FFFFFF",
        fontSize:20
    },
    search:{
        position:"absolute",
        bottom:0,
        right:0,
        width:26,
        height:26,
        margin:10,
        marginRight:13,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
        borderRadius:15,
        borderColor:"white"
    }
});