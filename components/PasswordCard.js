import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class PaswordCard extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity>
                    <Text>Google</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#888",
        height:100,
        margin:20,
        borderRadius:5,
        padding:10
    }
});