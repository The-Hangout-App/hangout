import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon, Badge } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../api/repository";

class Login extends React.Component {

    repo = new Repository();

    state = {
      email: "",
      password: "",
      emailErr: "", //error messages for invalid inputs
      pwErr: ""
    }

    handleLogin = () => {
      if (this.state.email == "") {
        this.setState({emailErr: "Invalid email"});
        return;
      }
      this.repo.login(this.state.email, this.state.password).then(data => {
        console.log(data)
        if (data.length > 0) {
          this.props.navigation.navigate("Homepage");
        }
        else {
          this.setState({emailErr: "Invalid email or password", pwErr: "Invalid email or password"});
        }
      })
      .catch(e => console.log(e));
      this.props.onLogin();
    }

    render() {
      
        return (<SafeAreaView style={styles.container}>
          <Text h1>Login</Text>
          <Input
            placeholder="Email"
            onChange={(text) => this.setState({email: text})}
            textContentType="emailAddress"
            leftIcon={<Icon name="email"/>}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.emailErr}
          />
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true} onChange={(text) => this.setState({password: text})}
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