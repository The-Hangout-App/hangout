import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Input, ListItem, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker'

export default function MyGroups(props) {

    const [groups, setGroups] = useState([{gid: 1, members: 3, maxMembers: 5, actId: 3}, {gid: 2, members: 3, maxMembers: 5, actId: 4}]);

    const toGroup = (groupId) => {
        props.navigation.navigate("GroupDetails", {gid: groupId})
    }

    const getActivityName = (actId) => {
        //GET request and filter out the activity name
        return "Sample activity name"
    }

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
            <Button title="Create New Group" buttonStyle={styles.btnCreate}/>
        </ScrollView>
    );

}