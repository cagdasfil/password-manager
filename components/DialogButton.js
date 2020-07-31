import React from "react";
import {StyleSheet} from "react-native";
import Dialog from "react-native-dialog";

export default class DialogButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Dialog.Button style={styles.container} label={this.props.label} onPress={this.props.onPress} />
        );
    }
}

const styles = StyleSheet.create({
    container:{
        color:"#23395B",
        fontWeight:"bold",
        fontSize:16
    }
});