import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header, Text, ThemeProvider } from 'react-native-elements';
import TopHeader from './components/TopHeader';
import Homepage from './screens/Homepage';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';



const theme = {

  Input: {
    
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
                  <Stack.Screen name="Register" component={Register} options={{ headerTitle: (props) => <TopHeader/> }}/>
                  <Stack.Screen name="Homepage" component={Homepage} options={{ headerTitle: (props) => <TopHeader/> }}/>
                  <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: (props) => <TopHeader/> }}/>
                </Stack.Navigator>
              </NavigationContainer>
            </ThemeProvider>)
      
}


