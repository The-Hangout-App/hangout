import React from "react";
import { Repository } from "../api/repository";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Header, Image, Input, Text, Button } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

class SuggestActivity extends React.Component {
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
            zipcode: 0,
        },
        //use following for dropdown
        value: 0,
        setValue: 0, 
        isFocus: 0,
        setIsFocus: 0,
        dropDownData: [
            {label: 'Food', value: '1'},
            {label: 'Physical Activity', value: '2'},
            {label: 'Arts & Culture', value: '3'}
        ]
    }

    repo = new Repository();

    renderLabel = () => {
        if(this.state.value || this.state.isFocus) {
            return (
                <Text>
                    Activity type
                </Text>
            );
        }
        return null;
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                <Text h2 style={{marginTop: 10, textAlign: "center", marginBottom:20}}>Suggest An Activity</Text>
                {this.renderLabel()}
                <Dropdown
                    style={[styles.dropdown, this.state.isFocus]}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={this.state.dropDownData}
                    search
                    maxHeight={210}
                    labelField="label"
                    valueField="value"
                    placeholder={!this.state.isFocus ? 'Select Activity Type' : '...'}
                    searchPlaceholder="Search..."
                    value={this.state.value}
                    onFocus={() => this.setState({setIsFocus: 1})}
                    onBlur={() => this.setState({setIsFocus: 0})}
                    onChange={item => {
                      this.setState({
                          setValue: item.value,
                          activity_category_id: this.state.value,
                          setIsFocus: 0 //0 is false
                      })
                    }}
                  />
                <Input
                    style={styles.text}
                    label="Activity"
                    onChangeText={text => this.setState({activity_name: text})}
                />
                <Input
                    style={styles.text}
                    label="Address"
                    onChangeText={text => this.setState({address: text})}
                />
                <Input
                    style={styles.text}
                    label="Phone number"
                    leftIcon="phone"
                    keyboardType="phone-pad"
                    onChangeText={text => this.setState({phone_number: text})}
                />
                <Input
                    style={styles.text}
                    label="Photo URL"
                    onChangeText={text => this.setState({photo_url: text})}
                />
                <Input
                    style={styles.text}
                    label="Max group size"
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({max_num_participants: text})}
                />
                <Input
                    style={styles.text}
                    label="City"
                    onChangeText={text => this.setState({city: text})}
                />
                <Input
                    style={styles.text}
                    label="State"
                    onChangeText={text => this.setState({state: text})}
                />
                <Input
                    style={styles.text}
                    label="Zipcode"
                    keyboardType="number-pad"
                    onChangeText={text => this.setState({zipcode: text})}
                />
                <Button title={"Submit Activity"} buttonStyle={{width: "50%", alignSelf: 'center', marginBottom: 15}} onPress={this.repo.addNewActivity(this.state.activity)}></Button>
            </KeyboardAwareScrollView>
        )
    }
}
export default SuggestActivity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
      },
    inputs: {
        width: "30%",
        height: 50,
        marginTop: 10,
    },
    text: {
        width: "50%",
        marginTop: 5
      },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 25
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    selectedTextStyle: { //style for each item in drop down 
      fontSize: 16,
    },
    inputSearchStyle: { //style for search box
      height: 40,
      fontSize: 16,
    },
  });