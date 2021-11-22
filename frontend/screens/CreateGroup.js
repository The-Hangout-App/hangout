import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Icon, Input, ListItem, Text } from "react-native-elements";

export default function CreateGroup(props) {

    return (
        <View>
            <Text h3>Create a group</Text>
            <Input placeholder="Max group members" keyboardType="number-pad"/>
        </View>
    );

}