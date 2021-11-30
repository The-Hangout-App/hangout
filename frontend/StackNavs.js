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
import ProfileReadOnly from './screens/ProfileReadOnly';

const Stack = createNativeStackNavigator();

const ProfileNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="Profile" screenOptions={{
            headerStyle: styles.header,
            headerTitle: "Hangout",
            headerTitleStyle: styles.title
        }}>
            <Stack.Screen name="Profile">
                {(props2) => <Profile {...props2} getUid={props.getUid} onLogout={props.onLogout}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
export {ProfileNav}

const HomeNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="Homepage" screenOptions={{
            headerStyle: styles.header,
            headerTitle: "Hangout",
            headerTitleStyle: styles.title
        }}>

            <Stack.Screen name="Homepage" component={Homepage}/>
            <Stack.Screen name="Groups">
                {(props2) => <Groups {...props2} getUid={props.getUid}/>}
            </Stack.Screen>
            <Stack.Screen name="GroupDetails">
                {(props2) => <GroupDetails {...props2} getUid={props.getUid}/>}
            </Stack.Screen>
            <Stack.Screen name="CreateGroup">
                {(props2) => <CreateGroup {...props2} getUid={props.getUid}/>}
            </Stack.Screen>
            <Stack.Screen name="ProfileReadOnly" component={ProfileReadOnly}/>

        </Stack.Navigator>
    );
}
export {HomeNav}

const GroupsNav = (props) => {
    return (
        <Stack.Navigator initialRouteName="MyGroups" screenOptions={{
            headerStyle: styles.header,
            headerTitle: "Hangout",
            headerTitleStyle: styles.title
        }}>

            <Stack.Screen name="MyGroups">
                {(props2) => <MyGroups {...props2} getUid={props.getUid}/>}
            </Stack.Screen>
            <Stack.Screen name="GroupDetails">
                {(props2) => <GroupDetails {...props2} getUid={props.getUid}/>}
            </Stack.Screen>
            <Stack.Screen name="ProfileReadOnly" component={ProfileReadOnly}/>

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