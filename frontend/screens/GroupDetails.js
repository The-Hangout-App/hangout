import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, ListItem, Text } from "react-native-elements";
import { Repository } from "../api/repository";

class GroupDetails extends React.Component {

    state = {
        members: [],
        group: {
            card_id: -1,
            chat_id: -1,
            date: "",
            group_id: -1,
            maxMembers: 0,
            numMembers: 0,
            time: ""
        },
        refreshing: false
    }

    repo = new Repository();
    
    getUserIcon = (user) => {
        if (user.imgUrl == "") {
            return <Avatar icon={{name: "person-outline", type: "ionicon"}} rounded/>
        }
        else {
            return <Avatar source={{uri: user.imgUrl}} rounded/>
        }
    }

    toProfile = (uid) => {
        this.props.navigation.navigate("ProfileReadOnly", {user_id: uid});
    }

    handleJoin = (gid) => {
        this.repo.joinGroup(gid, this.props.getUid())
        this.props.navigation.navigate("Homepage");
    }


    componentDidMount() {
        this.repo.getUsersInGroup(this.props.route.params.group_id).then(users => {
            this.setState({members: users});
            console.log(this.state.members)
        })
        this.repo.getGroupById(this.props.route.params.group_id).then(g => {
            this.setState({group: g[0]})
            console.log("groupdetails")
            console.log(this.state.group);
        })
        console.log("groupdetails", this.state.group);
    }

    _onRefresh = () => {
        this.setState({refreshing: true});
        this.repo.getUsersInGroup(this.props.route.params.group_id).then(users => {
            this.setState({members: users});
            console.log(this.state.members)
        })
        this.repo.getGroupById(this.props.route.params.group_id).then(g => {
            this.setState({group: g[0]})
            console.log("groupdetails")
            console.log(this.state.group);
            this.setState({refreshing: false})
        })
      }

    render() {
        return (
            <ScrollView
                refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}
            >
                <View style={styles.container}>
                    <Text h3 style={styles.txtHeader}>Group members</Text>
                    <Text style={styles.txtHeader}>{`Meeting time: ${this.state.group.time} on ${this.state.group.date}`}</Text>
                </View>
                {this.state.members.map((user, index) => 
                    <TouchableOpacity key={index} onPress={() => this.toProfile(user.user_id)}>
                        <ListItem bottomDivider>
                            <Icon name="person" type="ionicon"/>
                            <ListItem.Content>
                                <ListItem.Title>{user.username}</ListItem.Title>
                            </ListItem.Content>
                            <Icon name="chevron-forward-outline" type="ionicon" onPress={() => this.toProfile(user.user_id)}/>
                        </ListItem>
                    </TouchableOpacity>
                )}
                {this.props.route.params.joinEnabled && 
                <Button title="Join group" buttonStyle={styles.btnCreate} onPress={() => this.handleJoin(this.props.route.params.group_id)}
                    disabled={this.state.group.numMembers == this.state.group.maxMembers}/>}
            </ScrollView>
        )
    }
}

export default GroupDetails;

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
        marginVertical: 15,
        textAlign: "center"
    },
    btnCreate: {
        marginTop: 15,
        width: "90%",
        alignSelf: "center"
    }
})