import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import ViewCardDialog from "./ViewCardDialog.js";

export default class PaswordCard extends React.Component{

    constructor(props){
        super(props);
        this.state={
        };
    }

    handleClick = () => {
        this.refs.viewCardDialog.openDialog();
    }

    handleDelete = () => {
        this.props.handleDelete(this.props.id);
        this.refs.viewCardDialog.closeDialog();
    }

    render(){
        return (
            <View>
                <TouchableOpacity style={{
                    justifyContent:"center",
                    backgroundColor:this.props.password.cardColor,
                    borderColor:"#23395B",
                    borderWidth:1,
                    height:80,
                    marginHorizontal:15,
                    marginTop:10,
                    borderRadius:5,
                    padding:10
                    }}
                    onPress={this.handleClick.bind(this)}
                >
                    <Text 
                        numberOfLines={1}
                        style={{
                        flex:1,
                        fontSize:18,
                        fontWeight:"bold",
                        color:this.props.password.fontColor
                    }}>
                        {this.props.password.title}
                    </Text>
                    <Text
                        numberOfLines={1} 
                        style={{
                        flex:1,
                        fontSize:18,
                        flexWrap:"nowrap",
                        color:this.props.password.fontColor
                    }}>
                        {this.props.password.username!==""? this.props.password.username : this.props.password.mail}
                    </Text>
                </TouchableOpacity>
                <ViewCardDialog ref="viewCardDialog" password={this.props.password} handleDelete={this.handleDelete}/>
            </View>
        );
    }
};
