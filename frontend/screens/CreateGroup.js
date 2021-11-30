import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Input, ListItem, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Repository } from "../api/repository";

//Date time picker code adapted from here:
// https://www.npmjs.com/package/@react-native-community/datetimepicker

export default function CreateGroup(props) {

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("");
    const [show, setShow] = useState(false);
    const [dateStr, setDateStr] = useState("");
    const [timeStr, setTimeStr] = useState("");  //str values are posted to the DB
    const [maxMembers, setMaxMembers] = useState(0);

    const repo = new Repository();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setDateStr(`${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getFullYear()}`)
        setTimeStr(`${currentDate.getHours()}:${currentDate.getMinutes()}`)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onCreate = () => {
        setDateStr(`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`)
        setTimeStr(`${date.getHours()}:${date.getMinutes()}`)
        const body = {card_id: props.route.params.card_id, maxMembers: maxMembers, date: dateStr, time: timeStr}
        repo.createGroup(body).then(result => {
            repo.getNewGid().then(id => {
                repo.joinGroup(id[0], props.getUid())
            })
            props.navigation.navigate("Homepage");
        })
    }

    const dateDisplay = () => {
        if (mode == "") {
            return ""
        }
        else {
            return `${timeStr} on ${dateStr}`
        }
    }

    return (
        <View style={styles.container}>
            <Text h3 style={styles.txt}>Create a group</Text>
            <Input placeholder="Max group members" keyboardType="number-pad" onChangeText={text => setMaxMembers(text)}/>
            <Button title="Choose date" buttonStyle={styles.btn} onPress={showDatepicker}/>
            <Button title="Choose time" buttonStyle={styles.btn} onPress={showTimepicker}/>

            <Text>{`Chosen date: ${dateDisplay()}`}</Text>

            <Button title="Create group" buttonStyle={{marginVertical: 20}}/>
            
            {show && <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
            />}
            
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    txt: {
        marginVertical: 20
    },
    rows: {
        flex: 1,
        flexDirection: "row",
        //width: "50%",
        alignSelf: "center",
        justifyContent: "space-around",
        margin: 20
    },
    btn: {
        marginVertical: 20,
        backgroundColor: "#33a5d6"
    }
})