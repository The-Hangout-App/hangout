import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, Input, ListItem, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Repository } from "../api/repository";

class MyGroups extends React.Component {

    state = {
        groups: [],
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
        this.repo.getActivity(this.props.route.params.card_id).then(act => {
            this.setState({activity: act[0]})
            console.log(this.state.activity)
        }).catch(e => console.log(e));
        this.repo.getGroups(this.props.route.params.card_id).then(groupsList => {
            console.log(groupsList);
            this.setState({groups: groupsList})
            console.log(this.state.groups)
        }).catch(e => console.log(e));
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text h3 style={styles.txtHeader}>My groups</Text>
                </View>
                {groups.map((group, index) => 
                    <TouchableOpacity key={group.gid} onPress={() => toGroup()}>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title>{getActivityName(group.actId)}</ListItem.Title>
                                <ListItem.Subtitle>{`${group.members} / ${group.maxMembers}`}</ListItem.Subtitle>
                            </ListItem.Content>
                            <Icon name="chevron-forward-outline" type="ionicon" onPress={() => toGroup()}/>
                        </ListItem>
                    </TouchableOpacity>
                )}
            </ScrollView>
        );
    }
}

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