import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default class HomeHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isSearchBarOpen:false,
            searchKey:""
        };
    }

    handleSearch = () => {
        this.setState({isSearchBarOpen:true});
    };

    handleClose = () => {
        this.setState({isSearchBarOpen:false});
        this.props.filterPasswords("");
    };

    changeSearchKey = (key) => {
        this.props.filterPasswords(key);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.badge}>
                    <Text style={styles.text}>Şifrelerim</Text>
                    <TouchableOpacity style={styles.searchIcon} onPress={this.handleSearch}>
                        <Ionicons name="md-search" size={20} color="white"/>
                    </TouchableOpacity>
                </View>
                {this.state.isSearchBarOpen? 
                    <View style={styles.searchBar}>
                        <TextInput 
                        style={styles.inputBox}
                        onChangeText = {(text) => {this.changeSearchKey(text)}}
                        maxLength = {16}/>
                        <TouchableOpacity style={styles.closeIcon} onPress={this.handleClose}>
                            <Ionicons name="md-close" size={25} color="white"/>
                        </TouchableOpacity>
                    </View>
                    :
                    null}    
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#23395B"
    },
    badge:{
        position:"relative",
        height:80,
        paddingBottom:10,
        alignItems:"center",
        justifyContent:"flex-end"
    },
    text:{
        color:"#FFFFFF",
        fontSize:20
    },
    searchIcon:{
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
    },
    searchBar:{
        position:"relative",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#23395B"
    },
    inputBox:{
        flex:1,
        marginHorizontal:70,
        marginVertical:10,
        backgroundColor:"white",
        borderRadius:3,
        fontSize:16,
        color:"#23395B",
        textAlign:"center"
    },
    closeIcon:{
        position:"absolute",
        right:40
        //marginHorizontal:20
    }
});