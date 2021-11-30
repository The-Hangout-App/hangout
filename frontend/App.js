import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text} from 'react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Header, ThemeProvider } from 'react-native-elements';
import TopHeader from './components/TopHeader';
import Homepage from './screens/Homepage';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Groups from './screens/Groups';
import GroupDetails from './screens/GroupDetails';
import CreateGroup from './screens/CreateGroup';


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
const Tab = createBottomTabNavigator();

export default function App() {
    return (<ThemeProvider theme={theme}>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login}/>
                  <Stack.Screen name="Register" component={Register}/>
                  <Stack.Screen name="Homepage" component={Homepage} options={{headerBackVisible: false}}/>
                  <Stack.Screen name="Profile" component={Profile}/>
                  <Stack.Screen name="Groups" component={Groups}/>
                  <Stack.Screen name="GroupDetails" component={GroupDetails}/>
                  <Stack.Screen name="CreateGroup" component={CreateGroup}/>
                </Stack.Navigator>
                </NavigationContainer>
            </ThemeProvider>);
      
}


