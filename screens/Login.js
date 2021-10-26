import React from "react";
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Input } from "react-native-elements/dist/input/Input";

class Login extends React.Component {

    render() {
        return 	(<View style={styles.container}>
                    <Text>Login</Text>
                    <Input placeholder="Username"/>
                    <Input placeholder="Password" textContentType="password" secureTextEntry={true}/>
                </View>)
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
  });
  
  export default Login;