import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Text} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import { Header, Icon, TabView, ThemeProvider } from 'react-native-elements';
import TopHeader from './components/TopHeader';
import Homepage from './screens/Homepage';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';
import Groups from './screens/Groups';
import GroupDetails from './screens/GroupDetails';
import CreateGroup from './screens/CreateGroup';
import { GroupsNav, HomeNav, LoginNav, ProfileNav } from './StackNavs';

const theme = {

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

  const [loggedIn, setLoggedIn] = useState(false);

  function login() {
    setLoggedIn(true);
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        
        {!loggedIn ?
        <Stack.Navigator initialRouteName="Login" screenOptions={{
          headerStyle: styles.header,
          headerTitle: "Hangout",
          headerTitleStyle: styles.title
        }}>
          <Stack.Screen name="Login">
            {() => <Login onLogin={login}/>}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
        :
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'red',
            inactiveTintColor: 'black'
          }}
          screenOptions={({ route }) => ({
            headerStyle: styles.header,
            headerTitle: "Hangout",
            headerTitleStyle: styles.title,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              else if (route.name === 'My Groups') {
                iconName = focused ? 'people' : 'people-outline';
              }
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} type="ionicon"/>;
            },
            tabBarActiveTintColor: '#71B6BF',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen
            name="Profile"
            component={ProfileNav}
          />
          <Tab.Screen
            name="Home"
            component={HomeNav}
          />
          <Tab.Screen
            name="My Groups"
            component={GroupsNav}
          />
        </Tab.Navigator>
        }

      </NavigationContainer>
    </ThemeProvider>
  );
};

// export default function App() {
//     return (<ThemeProvider theme={theme}>
//               <NavigationContainer>
//               <Tab.Navigator
//           tabBarOptions={{
//             labelStyle: {fontSize:18},
//             activeTintColor: 'red',
//             inactiveTintColor: 'black'
//           }}
//         >
//           <Tab.Screen
//             name="Profile"
//             component={Profile}
//           />
//           <Tab.Screen
//             name="Homepage"
//             component={Homepage}
//           />
//           <Tab.Screen
//             name="My Groups"
//             component={Groups}
//           />
//         </Tab.Navigator><Tab.Navigator
//           tabBarOptions={{
//             labelStyle: {fontSize:18},
//             activeTintColor: 'red',
//             inactiveTintColor: 'black'
//           }}
//         >
//           <Tab.Screen
//             name="Profile"
//             component={Profile}
//           />
//           <Tab.Screen
//             name="Homepage"
//             component={Homepage}
//           />
//           <Tab.Screen
//             name="My Groups"
//             component={Groups}
//           />
//         </Tab.Navigator>
//                 <Stack.Navigator initialRouteName="CreateGroup" screenOptions={{
//                   headerStyle: styles.header,
//                   headerTitle: "Hangout",
//                   //headerTitleAlign: "center",
//                   headerTitleStyle: styles.title
//                 }}>
//                   <Stack.Screen name="Login" component={Login}/>
//                   <Stack.Screen name="Register" component={Register}/>
//                   <Stack.Screen name="Homepage" component={Homepage} options={{headerBackVisible: false}}/>
//                   <Stack.Screen name="Profile" component={Profile}/>
//                   <Stack.Screen name="Groups" component={Groups}/>
//                   <Stack.Screen name="GroupDetails" component={GroupDetails}/>
//                   <Stack.Screen name="CreateGroup" component={CreateGroup}/>
//                 </Stack.Navigator>
//                 </NavigationContainer>
//             </ThemeProvider>);
      
// }


const styles = StyleSheet.create({
  header: {
    backgroundColor: "#71B6BF",
  },
  title: {
    color: "white"
  }
})