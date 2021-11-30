import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, ListItem, Text } from "react-native-elements";
import { Repository } from "../api/repository";

class GroupDetails extends React.Component {

    state = {
        members: [],
        group: {}
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


    componentDidMount() {
        this.repo.getUsersInGroup(this.props.route.params.group_id).then(users => {
            this.setState({members: users});
        })
        this.repo.getGroupById(this.props.route.params.group_id).then(g => {
            console.log(g)
            this.setState({group: g})
            console.log("groupdetails")
            console.log(this.state.group)
        })
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text h3 style={styles.txtHeader}>Group members</Text>
                    <Text style={styles.txtHeader}>{`Meeting time: ${this.state.group.time} on ${this.state.group.date}`}</Text>
                </View>
                {this.state.members.map((user, index) => 
                    <TouchableOpacity key={index} onPress={() => ""}>
                        <ListItem bottomDivider>
                            <Avatar rounded size="small" title="AB"/>
                            <ListItem.Content>
                                <ListItem.Title>{user.username}</ListItem.Title>
                            </ListItem.Content>
                            <Icon name="chevron-forward-outline" type="ionicon" onPress={() => this.props.navigation.navigate("ProfileReadOnly",{profileID: this.state.members[index].id})}/>
                        </ListItem>
                    </TouchableOpacity>
                )}
                {this.props.route.params.joinEnabled && <Button title="Join group" buttonStyle={styles.btnCreate}/>} 
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