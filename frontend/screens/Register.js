import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

class Register extends React.Component {

    state = {
      fullName: "",
      password: "",
      email: ""
    }

    render() {
        return (<SafeAreaView style={styles.container}>
        <Text h1>Register</Text>

          <Input  
            style={styles.text}
            placeholder="Full Name" 
            onChangeText={text => this.setState({fullName: text})}/>


          <Input  
            style={styles.text}
            placeholder="Email" 
            onChangeText={text => this.setState({email: text})}/>

          <Input  
            style={styles.text}
            placeholder="Password" 
            onChangeText={text => this.setState({password: text})}/>

          <Button title = "Register" onPress = {() => this.props.navigation.navigate('Profile')}></Button>
         
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
  
  export default Register;