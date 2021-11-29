import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { Button, Icon, ListItem, Text } from "react-native-elements";
import { Repository } from "../api/repository";

class Groups extends React.Component {

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

    state = {
        groups: [],
        activity: {
            activity_category_id: 1,
            activity_name: "",
            address: "",
            card_id: 0,
            city: "",
            max_age: 1,
            max_num_participants: 1,
            min_age: 0,
            min_num_participants: 1,
            phone_number: "",
            photo_url: "",
            state: "",
            zipcode: "",
        }
    }

    repo = new Repository();

    toGroup = (groupId) => {
        this.props.navigation.navigate("GroupDetails", {gid: groupId})
    }

    toCreateGroup = () => {
        this.props.navigation.navigate("CreateGroup");
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
                <Text h3 style={styles.txtHeader}>{`${this.state.activity.activity_name} Groups:`}</Text>
            </View>
            {this.state.groups.map((group, index) => 
                <TouchableOpacity key={index} onPress={this.toGroup}>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{`Group ${index + 1}`}</ListItem.Title>
                            <ListItem.Subtitle>{`${group.members} / ${group.maxMembers}`}</ListItem.Subtitle>
                        </ListItem.Content>
                        <Icon name="chevron-forward-outline" type="ionicon" onPress={this.toGroup}/>
                    </ListItem>
                </TouchableOpacity>
            )}
            <Button title="Create New Group" buttonStyle={styles.btnCreate} onPress={this.toCreateGroup}/>
        </ScrollView>
        );
    }
}

export default Groups;

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