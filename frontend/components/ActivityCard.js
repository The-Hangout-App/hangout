import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Card, Header, Icon, Image, Text, ThemeProvider } from 'react-native-elements';

export default function ActivityCard(props) {

    //Props.activity will be in dictionary format, with activity information fed in from DB

    return (
        <Card>
            <Card.Title>{props.activity.title}</Card.Title>
            <Card.Divider/>
            <Image source={{uri: props.activity.imgSource}}/>
        </Card>
    );


}