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
    firstName: "",
    lastName: "",
    photoURL: "",
    bio: "",
    age: "",
    gender: "",
    pronoun: "",
  }

  render() {
    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        {this.state.photoURL ? 
        <Avatar
          size="xlarge"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          activeOpacity={0.7}
          source={{uri: this.state.photoURL}}
          //style = {styles.profilePicWrap}
          title={this.state.username.substr(0,1)}
        />
        :
        <Avatar
          size="xlarge"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          activeOpacity={0.7}
          source={require("../assets/default-profile.jpg")}
          //style = {styles.profilePicWrap}
          title={this.state.username.substr(0,1)}
        />
        }
        <Text>{"\n"}</Text>
        <View style= {styles.flexbox}>
          <Input  
            style={styles.text}
            disabled
            value = {this.state.firstName}
            label="First Name" 
            onChangeText={text => this.setState({firstName: text})}/>
          <Input  
            style={styles.text}
            disabled
            value = {this.state.lastName}
            label="Last Name" 
            onChangeText={text => this.setState({lastName: text})}/>
          </View>
            <Input 
              style={styles.inputs}
              disabled
              value = {this.state.pronoun}
              label="Pronouns" 
              onChangeText={text => this.setState({pronoun: text})}/>
            <Input  
              style={styles.inputs}
              disabled
              value = {this.state.gender}
              label="Gender" 
              onChangeText={text => this.setState({gender: text})}/>
            <Input 
              style={styles.inputs}
              disabled
              numberOfLines={4}
              value = {this.state.age}
              label="Age"
              onChangeText={text => this.setState({age: text})}/> 
            <Input 
              style={styles.textin}
              disabled
              multiline
              numberOfLines={4}
              value = {this.state.bio}
              label="Bio" 
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
          age: data[0].age.toString(),
          gender: data[0].gender,
          pronoun: data[0].pronoun,
          photoURL: data[0].photo_url
        })
    })
  }
}

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
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
  textin: {
    width: "50%",
    marginTop: 10,
    borderColor: '#000000',
    borderWidth: 1,
    paddingHorizontal: 5
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
  },
  btn: {
    marginBottom: 10
  }
});
  
export default ProfileReadOnly;