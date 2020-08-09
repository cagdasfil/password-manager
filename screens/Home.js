import React from "react";
import { View, StyleSheet, BackHandler, AsyncStorage, ScrollView, TouchableOpacity } from "react-native";
import Passwordcard from "../components/PasswordCard";
import HomeHeader from "../components/HomeHeader";
import { Ionicons } from '@expo/vector-icons';
import AddCardDialog from "../components/AddCardDialog";
import ExitDialog from "../components/ExitDialog";

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addCardVisibility:false,
            passwords:[],
            filteredPasswords:[],
            filteringKey:""
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
        //console.log(this.state.passwords);
    }

    handleDelete = (id) => {
        let newPasswords = this.state.passwords;
        for (let index = 0; index < newPasswords.length; index++) {
            const element = newPasswords[index];
            if(element.id === id){
                newPasswords.splice(index, 1);
                break;
            }
        }
        this.setState({passwords:newPasswords});
        this._storeData("passwords",JSON.stringify(newPasswords));
        //console.log(index,"deleted");
        this.refreshPasswords();
        //this.render();
    }

    filterPasswords = (key) => {
        this.setState({filteringKey:key});
        if(key === ""){
          this.setState({filteredPasswords:this.state.passwords});  
        }
        else{
            let filteredPasswords=[];
            this.state.passwords.map((password, index)=>{
                if(password.title.toLowerCase().includes(key.toLowerCase()) ||
                    password.username.toLowerCase().includes(key.toLowerCase()) ||
                    password.mail.toLowerCase().includes(key.toLowerCase())){
                        filteredPasswords.push(password);
                    }
            });
            this.setState({filteredPasswords:filteredPasswords});  
        }
        //console.log(this.state.filteredPasswords);
    }

    refreshPasswords = () => {
        this._retrieveData("passwords").then((result)=>{
            if(result===null){
                this.setState({passwords:[]});
                this.setState({filteredPasswords:[]});
            }
            else{
                this.setState({passwords:JSON.parse(result)});
                this.filterPasswords(this.state.filteringKey);
            }
        });
    }

    backAction = () => {
        this.refs.exitDialog.openDialog();
        return true;
    };

    exitHandler = () => {
        this.props.navigation.popToTop();
    }

    UNSAFE_componentWillMount(){
        this._retrieveData("passwords").then((result)=>{
            if(result===null){
                this.setState({passwords:[]});
                this.setState({filteredPasswords:[]});
            }
            else{
                this.setState({passwords:JSON.parse(result)});
                this.setState({filteredPasswords:JSON.parse(result)});
            }
        });
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
    }
    
    componentWillUnmount() {
        this.backHandler.remove();
    }

    render(){
        return(
            <View style={styles.container}>
                <HomeHeader filterPasswords={this.filterPasswords} />
                <ScrollView>
                    <View style={{paddingVertical:10}}>
                        {this.state.filteredPasswords.map((password, index)=>{
                            return <Passwordcard 
                                key={index}
                                id={password.id}
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
                <ExitDialog ref="exitDialog" exitHandler={this.exitHandler} />
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