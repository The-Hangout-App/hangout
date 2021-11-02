import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeConsumer, ThemeProvider } from 'react-native-elements';
import { Header } from 'react-native-elements/dist/header/Header';
import { Input } from 'react-native-elements/dist/input/Input';
import Login from './screens/Login';


export default function App() {
    return 	(<View style={styles.container}>
      <Text>Login</Text>
      <Input placeholder="Username"/>
      <Input placeholder="Password" textContentType="password" secureTextEntry={true}/>
  </View>)
      
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
