import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon, Badge } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../api/repository";

class Login extends React.Component {

    repo = new Repository();

    state = {
      username: "",
      password: "",
      usernameErr: "", //error messages for invalid inputs
      pwErr: ""
    }

    handleLogin = () => {
      if (this.state.username == "") {
        this.setState({usernameErr: "Invalid username"});
        return;
      }
      const body = {username: this.state.username, password: this.state.password}
      console.log(body)
      this.repo.login(body).then(data => {
        console.log(data)
        if (data.length > 0) {
          this.props.onLogin(data[0]);
        }
        else {
          this.setState({usernameErr: "Invalid username or password", pwErr: "Invalid username or password"});
        }
      })
      .catch(e => console.log(e));
    }

    render() {
      
        return (<SafeAreaView style={styles.container}>
          <Text h1>Login</Text>
          <Input
            placeholder="Username"
            onChangeText={(text) => this.setState({username: text})}
            leftIcon={<Icon name="person"/>}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.usernameErr}
            autoCapitalize="none"
          />
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true} onChangeText={(text) => this.setState({password: text})}
            leftIcon={<Icon name="lock"/>}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.pwErr}
            inputStyle={styles.inputs}
          />
          <Button title="Login" onPress={this.handleLogin}/>
          <Text style={styles.text}>Don't have an account? <Text style={styles.txtLink} onPress = {() => this.props.navigation.navigate('Register')}>Create account</Text>
          </Text>

          
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
      color: "#71B6BF",
    },
    text: {
      marginTop: 10
    }
  });
  
  export default Login;