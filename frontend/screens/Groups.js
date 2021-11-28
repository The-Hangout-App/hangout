import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { Button, Icon, ListItem, Text } from "react-native-elements";
import { Repository } from "../api/repository";

export default function Groups(props) {

    /* Receives Props:
    - activity: activity that was swiped on
    - 
    
    
    Group object format:
    {
        gid: number,
        members: number,
        maxMembers: number
    }
    */

    const [groups, setGroups] = useState([{gid: 1, members: 3, maxMembers: 5}, {gid: 2, members: 3, maxMembers: 5}]);

    const repo = new Repository();

    const toGroup = (groupId) => {
        props.navigation.navigate("GroupDetails", {gid: groupId})
    }

    const toCreateGroup = () => {
        props.navigation.navigate("CreateGroup");
    }

    useEffect(() => {
        repo.getActivity(props.route.params.cardId).then(act => {
            var body = {}
            repo.createGroup(act)
        })
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text h3 style={styles.txtHeader}>{`${props.route.params.activity.title} Groups:`}</Text>
            </View>
            {groups.map((group, index) => 
                <TouchableOpacity key={group.gid} onPress={() => toGroup()}>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{`Group ${index + 1}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${group.members} / ${group.maxMembers}`}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Icon name="chevron-forward-outline" type="ionicon" onPress={() => toGroup()}/>
                    </ListItem>
                </TouchableOpacity>
            )}
            <Button title="Create New Group" buttonStyle={styles.btnCreate} onPress={toCreateGroup}/>
        </ScrollView>
    );

}

/*{list.map((group, index) => {

            <ListItem key={group.gid} bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>{`Group ${index}`}</ListItem.Title>
                    <ListItem.Subtitle>{`${group.members} / ${group.maxMembers}`}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon name="RightOutlined" type="antdesign"/>
            </ListItem>

            })}
            */

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
    }
})