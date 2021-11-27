import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, ListItem, Text } from "react-native-elements";

export default function GroupDetails(props) {

    const [members, setMembers] = useState([{uid: 1, name: "Bob", imgUrl: ""}]);
    
    const getUserIcon = (user) => {
        if (user.imgUrl == "") {
            return <Avatar icon={{name: "person-outline", type: "ionicon"}} rounded/>
        }
        else {
            return <Avatar source={{uri: user.imgUrl}} rounded/>
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text h3 style={styles.txtHeader}>{`${props.route.params}`}</Text>
            </View>
            {members.map((user, index) => 
                <TouchableOpacity key={index} onPress={() => ""}>
                    <ListItem bottomDivider>
                        {getUserIcon(user)}
                        <ListItem.Content>
                            <ListItem.Title>{user.name}</ListItem.Title>
                        </ListItem.Content>
                        <Icon name="chevron-forward-outline" type="ionicon" onPress={() => ""}/>
                    </ListItem>
                </TouchableOpacity>
            )}
            <Button title="Join group" buttonStyle={styles.btnCreate}/>
        </ScrollView>
    )

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
    }
})