import React from "react";
import { StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Repository } from "../api/repository";


class ActivityDetails extends React.Component {

    state = {
        activity_category_id: -1,
        activity_name: "",
        address: "",
        phone_number: "",
        photo_url: "",
        min_num_participants: 0,
        max_num_participants: 0,
        min_age: 0,
        max_age: 0,
        city: "",
        state: "",
        zipcode: 0
    }

    repo = new Repository();

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <Image/>

                <Input
                    style={styles.text}
                    disabled
                    label="Activity name"
                    value = {this.state.activity_name}
                    onChangeText={text => this.setState({activity_name: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Address"
                    value = {this.state.address}
                    onChangeText={text => this.setState({address: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Phone number"
                    leftIcon="phone"
                    value = {this.state.phone_number}
                    keyboardType="phone-pad"
                    onChangeText={text => this.setState({phone_number: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Address"
                    value = {this.state.address}
                    onChangeText={text => this.setState({address: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Photo URL"
                    value = {this.state.photo_url}
                    onChangeText={text => this.setState({photo_url: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Max group size"
                    value = {this.state.max_num_participants}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({max_num_participants: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="City"
                    value = {this.state.city}
                    onChangeText={text => this.setState({city: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="State"
                    value = {this.state.State}
                    onChangeText={text => this.setState({state: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Zipcode"
                    value = {this.state.zipcode}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({zipcode: text})}
                />
            </KeyboardAwareScrollView>
        )
    }

    componentDidMount() {
        this.repo.getActivity(props.route.params.card_id)
        .then(data => {
            
        })
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10
    },
    inputs: {
      width: "30%",
      height: 50,
      marginTop: 10
    },
})