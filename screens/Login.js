import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

class Login extends React.Component {

    state = {
      username: "",
      password: ""
    }

    render() {
      
        return (<SafeAreaView style={styles.container}>
          <Text h1>Login</Text>
          <Input
            placeholder="Email"
            onChange={(text) => this.setState({username: text})}
            textContentType="emailAddress"
            leftIcon={<Icon name="email"/>}
          />
          <Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry={true} onChange={(text) => this.setState({password: text})}
            leftIcon={<Icon name="lock"/>}
          />
          <Button title="Login"/>
          <Text style={styles.text}>Don't have an account? <Text style={styles.txtLink}>Create account</Text></Text>
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