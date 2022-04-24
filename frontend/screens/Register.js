import React from "react";
import { Alert, StyleSheet } from 'react-native';
import { Button, Text, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../api/repository";

class Register extends React.Component {

    repo = new Repository();

    state = {
      password: "",
      confPassword: "",
      username: "",
      errTxt: ""
    }

    handleRegister = () => {
      
      if (this.state.password != this.state.confPassword) {
        this.setState({errTxt: "Passwords do not match"});
        return;
      }
      const body = {username: this.state.username, password: this.state.password};
      this.repo.createAccount({username: this.state.username, password: this.state.password}).then(data => {
        this.props.navigation.navigate("Login");
        Alert.alert(
          "Welcome to Hangout!",
          "Your profile was created successfully",
          [
            { text: "OK" }
          ]
        );
      }).catch(e => console.log(e));
      
    }

    render() {
        return (<SafeAreaView style={styles.container}>
        <Text h1 style={styles.text}>Register</Text>

          <Input  
            style={styles.text}
            placeholder="Username" 
            onChangeText={text => this.setState({username: text})}
            leftIcon={<Icon name="person"/>}
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({password: text})}
            leftIcon={<Icon name="lock"/>}
            inputStyle={styles.inputs}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.errTxt}
          />

          <Input
            placeholder="Confirm Password"
            textContentType="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({confPassword: text})}
            leftIcon={<Icon name="lock"/>}
            inputStyle={styles.inputs}
          />

        <Button title="Register" onPress={this.handleRegister}/>
         
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