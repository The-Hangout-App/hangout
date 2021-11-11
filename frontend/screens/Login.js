import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon, Badge } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

class Login extends React.Component {

    state = {
      email: "",
      password: "",
      emailErr: "", //error messages for invalid inputs
      pwErr: ""
    }

    handleLogin = () => {
      if (this.state.email == "") {
        this.setState({emailErr: "Invalid email"});
      }
    }


    render() {
      
        return (<SafeAreaView style={styles.container}>
          <Text h1>Login</Text>
          <Input
            placeholder="Email"
            onChange={(text) => this.setState({email: text})}
            textContentType="emailAddress"
            leftIcon={<Icon name="email"/>}
            ref={emailRef}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.emailErr}
          />
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true} onChange={(text) => this.setState({password: text})}
            leftIcon={<Icon name="lock"/>}
            ref={pwRef}
            errorStyle={{ color: 'red' }}
            errorMessage={this.state.pwErr}
          />
          <Button title="Login" onPress={this.handleLogin}/>
          <Text style={styles.text}>Don't have an account? <Text style={styles.txtLink} onPress = {() => this.props.navigation.navigate('Register')}>Create account</Text></Text>
        </SafeAreaView>)

    }

    

}

const emailRef = React.createRef()
const pwRef = React.createRef()

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs: {
      width: "90%",
      height: 50,
      borderColor: "black",
      borderWidth: 2
    },
    txtLink: {
      color: "#71B6BF"
    },
    text: {
      marginTop: 10
    }
  });
  
  export default Login;