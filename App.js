import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header, Text, ThemeProvider } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import TopHeader from './components/TopHeader';
import Login from './screens/Login';

const theme = {

  Input: {
    color: "#71B6BF"
  },
  Button: {
    buttonStyle: {
      backgroundColor: "#71B6BF",
      justifyContent: "center",
    },
    titleStyle: {
      color: "white",
      textAlign: "center",
      alignItems: "center",
      width: "90%"
    }
  },
  Header: {
    backgroundColor: "#71B6BF"
  }

};

const Stack = createNativeStackNavigator();

export default function App() {
    return (<ThemeProvider theme={theme}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login} options={{ headerTitle: (props) => <TopHeader/> }}/>
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>)
      
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

