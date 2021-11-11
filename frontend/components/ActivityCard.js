import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Image } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';

export default function ActivityCard(props) {

    //Props.activity will be in dictionary format, with activity information fed in from DB

    return (
        <Card>
            <Card.Title>{props.activity.title}</Card.Title>
            <Card.Divider/>
            <Image source={{uri: props.activity.imgSource}} style={styles.img}/>
            <View style={styles.groupContainer}>
                <Button icon={{name: "close", color: "white"}}
                    buttonStyle={styles.btnReject}
                    iconContainerStyle={{width: "100%"}}
                />
                <Button icon={{name: "check", color: "white"}}
                    buttonStyle={styles.btnAccept}
                    iconContainerStyle={{width: "100%"}}
                />
            </View>
        </Card>
    );


}

/*  */

const styles = StyleSheet.create({
    btnReject: {
        backgroundColor: "#ed3c00",
        width: "50%"
    },
    btnAccept: {
        backgroundColor: "#71B6BF",
        width: "50%"
    },
    groupContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",

        alignSelf: "center"
    },
    img: {
        width: "100%",
        height: "50%"
    }
})