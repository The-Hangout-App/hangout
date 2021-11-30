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
        props.navigation.navigate("GroupDetails", {group_id: groupId, joinEnabled: false})
    }

    getActivityName = (actId) => {
        //GET request and filter out the activity name
        return "Sample activity name"
    }

    componentDidMount() {
        //need to add proper route
        console.log(`this is the uid passed from app: ${this.props.getUid()}`)
        this.repo.getUsersGroups(this.props.getUid()).then(act => {
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
                     <TouchableOpacity key={index} onPress={() => this.toGroup(group_id)}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{group.activity_name}</ListItem.Title>
                                <ListItem.Subtitle>{`${group.numMembers} / ${group.maxMembers}`}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Icon name="chevron-forward-outline" type="ionicon" onPress={() => this.toGroup(group.group_id)}/>
                        </ListItem>
                     </TouchableOpacity>
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