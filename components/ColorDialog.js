import React from "react";
import { StyleSheet } from "react-native";
import Dialog from "react-native-dialog";
import ColorPalette from 'react-native-color-palette';

export default class ColorDialog extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    colors = ["#4267B2", "#FF0000", "#C32AA3", "#007BB5",
                "#FFFC00", "#006400", "#35465d", "#1ED760",
                "#010101", "#FF4500", "#A6B1B7", "#9146FF",
                "#FFC0CB", "#AA2200", "#00AFF0", "#FFFFFF",
                "#9DFFF9", "#696969"];

    handleChoice = (color) => {
        this.setState({visible:false});
        this.props.handleColorChoice(color);
    }

    handleBack = () => {
        this.setState({visible:false});
    }

    openColor = () => {
        this.setState({visible:true});
    }

    render(){
        return (
            <Dialog.Container visible={this.state.visible} onBackButtonPress={this.handleBack} on>
                <ColorPalette
                    onChange={color => this.handleChoice(color)}
                    defaultColor={this.props.chosenColor}
                    colors={this.colors}
                    title={"Kart rengi"}
                />
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