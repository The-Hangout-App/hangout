import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Input, ListItem, Text } from "react-native-elements";
import DateTimePicker from '@react-native-community/datetimepicker'
import { Repository } from "../api/repository";

//Date time picker code adapted from here:
// https://www.npmjs.com/package/@react-native-community/datetimepicker

export default function CreateGroup(props) {


    const repo = new Repository();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("");
    const [show, setShow] = useState(false);
    const [dateStr, setDateStr] = useState("");
    const [timeStr, setTimeStr] = useState("");  //str values are posted to the DB

    const state = {
        maxMembers: 0
    }

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

    const setState= (i) =>{
        state.maxMembers = i;
    }

    const onCreate = () => {
        let x = setDateStr(`${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`)
        let y = setTimeStr(`${date.getHours()}:${date.getMinutes()}`)
        //API post
        let body = {
            "card_id": 1 ,//props.route.params.cardId,
            "maxMembers": state.maxMembers,
            "date": x,
            "time": y
        }
        repo.createGroup(body);
    };

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
            <Input placeholder="Max group members" keyboardType="number-pad" onChange={(text) => setState({maxMembers: text})}/>
            <Button title="Choose date" buttonStyle={styles.btn} onPress={showDatepicker}/>
            <Button title="Choose time" buttonStyle={styles.btn} onPress={showTimepicker}/>

            <Text>{`Chosen date: ${dateDisplay()}`}</Text>

            <Button title="Create group" buttonStyle={{marginVertical: 20}} onPress = {onCreate}/>
            
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