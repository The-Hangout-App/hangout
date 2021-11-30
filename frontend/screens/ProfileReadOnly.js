import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Text, Input, Icon, Avatar } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../api/repository";


class ProfileReadOnly extends React.Component {

    repo = new Repository();

    state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      bio: "",
      age: 0,
      gender: "",
      pronoun: "",
    }

    render() {
        return (<KeyboardAwareScrollView>
            <View style={styles.container}>
            <Avatar
                size= "medium"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                activeOpacity={0.7}
                style = {styles.profilePicWrap}
            />
            <Text>{"\n"}</Text>
            <Text h3>Profile</Text>
            <View style= {styles.flexbox}>
                <Input  
                style={styles.text}
                disabled = {true}
                value = {this.state.firstName}
                placeholder="First Name" 
                onChangeText={text => this.setState({firstName: text})}/>
                <Input  
                style={styles.text}
                disabled = {true}
                value = {this.state.lastName}
                placeholder="Last Name" 
                onChangeText={text => this.setState({lastName: text})}/>
             </View>
              <Text>{"\n"}{"\n"}</Text>
                <Input 
                style={styles.inputs}
                disabled = {true}
                value = {this.state.pronoun}
                placeholder="Pronouns" 
                onChangeText={text => this.setState({pronoun: text})}/>
                
                <Input  
                style={styles.inputs}
                disabled = {true}
                value = {this.state.gender}
                placeholder="Gender" 
                onChangeText={text => this.setState({gender: text})}/>

              <Input  
              style={styles.inputs}
              disabled = {true}
              value = {this.state.age}
              placeholder="Age" 
              onChangeText={text => this.setState({age: text})}/>
           
            <Input 
            style={styles.textin}
            disabled = {true}
            multiline
            numberOfLines={4}
            value = {this.state.bio}
            placeholder="Bio" 
            onChangeText={text => this.setState({bio: text})}/>
            </View>
        </KeyboardAwareScrollView>)
    }

    componentDidMount() {
      this.repo.getUserByID(this.props.route.params.user_id)
      .then(data => {
          console.log("this is profile screen")
          console.log(data);
          this.setState({
        username: data[0].username,
        password: data[0].password,
        firstName: data[0].first_name,
        lastName: data[0].last_name,
        bio: data[0].bio,
        age: data[0].age,
        gender: data[0].gender,
        pronoun: data[0].pronoun,
      })
    }
      );}

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputs: {
      width: "30%",
      height: 50,
      marginTop: 10
    },
    textin: {
        width: "50%",
        marginTop: 10,
        borderColor: '#000000',
        borderWidth: 1
      },
    txtLink: {
      color: "#71B6BF"
    },
    text: {
      width: "50%",
      marginTop: 5
    },
    flexbox:{
        width: '50%',
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
    },
    textbox: {
        marginTop: 10,
        borderColor: '#ffff',
        borderWidth: 5
      },
    profilePicWrap: {
        height: 180,
        width: 180,
        borderRadius: 100,
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 16
    },
    profilePic: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderRadius: 100,
        borderColor: '#fff',
        borderWidth: 4
    }
  });
  
  export default ProfileReadOnly;