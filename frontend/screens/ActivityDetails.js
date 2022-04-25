import React from "react";
import { StyleSheet, View } from "react-native";
import { Image, Input, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Repository } from "../api/repository";


class ActivityDetails extends React.Component {

    state = {
        activity: {
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
    }

    repo = new Repository();

    render() {
        return (
            <KeyboardAwareScrollView>
                <Text h2 style={{marginTop: 10, textAlign: "center"}}>{this.state.activity.activity_name}</Text>
                <View style={{marginVertical: 20, alignItems: "center"}}>
                    <Image style={{borderRadius: 10, width: 200, height: 200}}
                    source={{uri: this.state.activity.photo_url}}/>
                </View>

                {/* <Input
                    style={styles.text}
                    disabled
                    label="Activity"
                    value = {this.state.activity.activity_name}
                    onChangeText={text => this.setState({activity_name: text})}
                /> */}
                <Input
                    style={styles.text}
                    disabled
                    label="Address"
                    value = {this.state.activity.address}
                    onChangeText={text => this.setState({address: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Phone number"
                    leftIcon="phone"
                    value = {this.state.activity.phone_number}
                    keyboardType="phone-pad"
                    onChangeText={text => this.setState({phone_number: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Photo URL"
                    value = {this.state.activity.photo_url}
                    onChangeText={text => this.setState({photo_url: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Max group size"
                    value = {this.state.activity.max_num_participants.toString()}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({max_num_participants: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="City"
                    value = {this.state.activity.city}
                    onChangeText={text => this.setState({city: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="State"
                    value = {this.state.activity.state}
                    onChangeText={text => this.setState({state: text})}
                />
                <Input
                    style={styles.text}
                    disabled
                    label="Zipcode"
                    value = {this.state.activity.zipcode}
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({zipcode: text})}
                />
            </KeyboardAwareScrollView>
        )
    }

    componentDidMount() {
        this.repo.getActivity(this.props.route.params.card_id)
        .then(data => {
            this.setState({activity: data[0]})
            console.log(this.state.activity)
        }).catch(e => console.log(e))
    }

}
export default ActivityDetails;

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