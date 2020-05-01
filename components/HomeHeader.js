import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class HomeHeader extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                    <Text style={styles.text}>Şifrelerim</Text>
            </View>
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
        color:"#FFFFFF"
    }
});