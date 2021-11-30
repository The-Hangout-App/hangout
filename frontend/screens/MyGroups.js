import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, Input, ListItem, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Repository } from "../api/repository";

class MyGroups extends React.Component {

    state = {
        groups: []
    }


    repo = new Repository();
    toGroup = (groupId) => {
        props.navigation.navigate("GroupDetails", {gid: groupId})
    }

    getActivityName = (actId) => {
        //GET request and filter out the activity name
        return "Sample activity name"
    }


    componentDidMount() {
        //need to add proper route
        
        this.repo.getUsersGroups(3).then(act => {
            this.setState({groups: act})
            console.log(this.state.groups)
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text h3 style={styles.txtHeader}>My groups</Text>
                </View>
                {this.state.groups.map((group, index) => 
                    // <TouchableOpacity key={group.gid} onPress={() => toGroup()}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{group.activity_name}</ListItem.Title>
                                <ListItem.Subtitle>{`${group.numMembers} / ${group.maxMembers}`}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Icon name="chevron-forward-outline" type="ionicon" onPress={() => toGroup()}/>
                        </ListItem>
                    // </TouchableOpacity>
                )}
            </ScrollView>
        );
    }
}

export default MyGroups;

const styles = StyleSheet.create({
    btnJoin: {
        backgroundColor: "#71B6BF"
    },
    icoStyle: {
        backgroundColor: "#71B6BF",
        borderRadius: 1
    },
    container: {
        alignItems: "center"
    },
    txtHeader: {
        margin: 15,
        textAlign: "center"
    },
    btnCreate: {
        marginTop: 15,
        width: "90%",
        alignSelf: "center"
    }
})