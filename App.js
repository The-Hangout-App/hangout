import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ThemeConsumer, ThemeProvider } from 'react-native-elements';
import { Header } from 'react-native-elements/dist/header/Header';
import Login from './screens/Login';


export default function App() {
  return (
    <ThemeProvider>
      <Header placement="left"
        leftComponent={{ icon: 'menu', color: '#fff' }}
        centerComponent={{ text: 'Hangout', style: { color: '#fff' } }}
        rightComponent={{ icon: 'home', color: '#fff' }}
      />
    </ThemeProvider>
      
      
    </View>
  );
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
