import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, Input, ListItem, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Repository } from "../api/repository";

class MyGroups extends React.Component {

    state = {
        groupIds: [],
        groups: [],
        refreshing: false
    }

    repo = new Repository();
    
    toGroup = (groupId) => {
        console.log(`sending to group with id: ${groupId}`)
        this.props.navigation.navigate("GroupDetails", {group_id: groupId, joinEnabled: false})
    }

    getActivityName = (actId) => {
        //GET request and filter out the activity name
        return "Sample activity name"
    }

    componentDidMount() {
        //Get list of group ids for this user
        // this.repo.getUsersGroups(this.props.getUid()).then(act => {
        //     console.log("users groups")
        //     console.log(act)
        //     this.setState({groupIds: act})
        //     console.log("check for id")
        //     console.log(this.state.groups)
        // })
        // .then(() => {
        //     //Get group objects based on ids
        //     this.state.groupIds.map((gid, index) => {
        //         this.repo.getGroupById(gid)
        //         .then(data => {
        //             this.setState((state, props) => {
        //                 return {groups: [...state.groups, data]};
        //             })
        //         })
        //     })
        // })
        this.repo.getUsersGroups(this.props.getUid()).then(data => {
            this.setState({groups: data});
        })
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.repo.getUsersGroups(this.props.getUid()).then(act => {
            console.log("users groups")
            console.log(act)
            this.setState({groups: act})
            console.log("check for id")
            console.log(this.state.groups)
        }).catch(e => console.log(e));

        //Get group objects based on ids
        this.state.groupIds.map((gid, index) => {
            this.repo.getGroupById(gid)
            .then(data => {
                console.log("group data", data)
                this.setState((state, props) => {
                    state.groups.push(data);
                    return {groups: state.groups};
                })
            })
        })
        this.setState({refreshing: false})
      }

    render() {
        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
            >
                <View style={styles.container}>
                    <Text h3 style={styles.txtHeader}>My groups</Text>
                </View>
                {this.state.groups.map((group, index) => 
                     <TouchableOpacity key={index} onPress={() => this.toGroup(group.group_id)}>
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