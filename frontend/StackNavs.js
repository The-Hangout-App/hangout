import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Groups from './screens/Groups';
import Homepage from './screens/Homepage';
import Profile from './screens/Profile';
import GroupDetails from './screens/GroupDetails'
import CreateGroup from './screens/CreateGroup';
import MyGroups from './screens/MyGroups';
import Login from './screens/Login';
import Register from './screens/Register';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const ProfileNav = () => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={Profile}/>
        </Stack.Navigator>
    )
}
export {ProfileNav}

const HomeNav = () => {
    return (
        <Stack.Navigator initialRouteName="Homepage" screenOptions={{headerShown: false}}>

            <Stack.Screen name="Homepage" component={Homepage}/>
            <Stack.Screen name="Groups" component={Groups}/>
            <Stack.Screen name="GroupDetails" component={GroupDetails}/>
            <Stack.Screen name="CreateGroup" component={CreateGroup}/>

        </Stack.Navigator>
    );
}
export {HomeNav}

const GroupsNav = () => {
    return (
        <Stack.Navigator initialRouteName="MyGroups" screenOptions={{headerShown: false}}>

            <Stack.Screen name="MyGroups" component={MyGroups}/>
            <Stack.Screen name="GroupDetails" component={GroupDetails}/>

        </Stack.Navigator>
    );
}
export {GroupsNav}

const LoginNav = () => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerStyle: styles.header,
            headerTitle: "Hangout",
            headerTitleStyle: styles.title
        }}>

            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>

        </Stack.Navigator>
    );
}
export {LoginNav}

const styles = StyleSheet.create({
    header: {
      backgroundColor: "#71B6BF",
    },
    title: {
      color: "white"
    }
})