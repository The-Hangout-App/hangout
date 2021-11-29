import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../api/repository";

class Register extends React.Component {

    repo = new Repository();

    state = {
      password: "",
      confPassword: "",
      email: "",
      errTxt: ""
    }

    handleRegister = () => {
     // if (this.state.password != this.state.confPassword) {
       // this.setState({errTxt: "Passwords do not match"});
       // return;
      //}
      //const body = {username: this.state.email, password: this.state.password};
      //this.repo.createAccount(body);
      this.props.navigation.navigate("Profile");
    }

    render() {
        return (<SafeAreaView style={styles.container}>
        <Text h1 style={styles.text}>Register</Text>

          <Input  
            style={styles.text}
            placeholder="Email" 
            onChangeText={text => this.setState({email: text})}
            leftIcon={<Icon name="email"/>}
          />

          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            onChange={(text) => this.setState({password: text})}
            leftIcon={<Icon name="lock"/>}
            inputStyle={styles.inputs}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.errTxt}
          />

          <Input
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry={true}
            onChange={(text) => this.setState({confPassword: text})}
            leftIcon={<Icon name="lock"/>}
            inputStyle={styles.inputs}
          />

<<<<<<< HEAD
          <Button title = "Register" onPress = {() => this.props.navigation.navigate('Profile')}></Button>
=======
        <Button title="Register" onPress={this.handleRegister}/>

>>>>>>> a1c7fc3feac7004cd1e48f8483cabe2563f40ad4
         
        </SafeAreaView>)
    }

    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs: {
      width: "90%",
    },
    txtLink: {
      color: "#71B6BF"
    },
    text: {
      marginTop: 10,
      marginBottom: 10
    }
  });
  
  export default Register;