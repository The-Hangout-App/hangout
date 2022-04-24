import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { Slider, Button, Text, Input, Icon, Avatar } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { Repository } from "../api/repository";
//import { Slider } from '@rneui/themed';

class Profile extends React.Component {
  
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
    
  handleSave = () =>{
    console.log("saving profile")
    this.forceUpdate();
    let body = {
      username: this.state.username,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      pronoun: this.state.pronoun,
      gender: this.state.gender,
      age: Number(this.state.age),
      bio:this.state.bio
    }
    this.repo.updateUser(this.props.getUid(), body);
  }

  handleLogout = () => {
    this.props.onLogout();
    this.forceUpdate();
  }

  render() {

    return (
      <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Avatar
          size="xlarge"
          rounded
          icon={{name: 'user', type: 'font-awesome'}}
          activeOpacity={0.7}
          source={{uri: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.drodd.com%2Fimages10%2Fbeach-pictures3.jpg&f=1&nofb=1"}}
          //style = {styles.profilePicWrap}
          title={this.state.username.substr(0,1)}
        />
        <Text>{"\n"}</Text>
        <View style= {styles.flexbox}>
          <Input  
            style={styles.text}
            disabled = {false}
            value = {this.state.firstName}
            placeholder="First Name" 
            onChangeText={text => this.setState({firstName: text})}/>
          <Input  
            style={styles.text}
            disabled = {false}
            value = {this.state.lastName}
            placeholder="Last Name" 
            onChangeText={text => this.setState({lastName: text})}/>
          </View>
            <Input 
                style={styles.inputs}
                disabled = {false}
                value = {this.state.photoURL}
                placeholder="Profile picture URL" 
                onChangeText={text => this.setState({photoURL: text})}/>
            <Input 
              style={styles.inputs}
              disabled = {false}
              value = {this.state.pronoun}
              placeholder="Pronouns" 
              onChangeText={text => this.setState({pronoun: text})}/>
            <Input  
              style={styles.inputs}
              disabled = {false}
              value = {this.state.gender}
              placeholder="Gender" 
              onChangeText={text => this.setState({gender: text})}/>
              <View style={[styles.contentView]}>
                <Slider
                  value={this.state.age} //change to value
                  onValueChange={(val) => this.setState({age: val})}
                  maximumValue={99}
                  minimumValue={16}
                  step={1}
                  allowTouchTrack
                  trackStyle={{height:5, backgroundColor:'transparent'}}
                  thumbStyle={{height:20, width: 20, backgroundColor:'transparent'}}
                  thumbProps={{
                    children: (
                      <Icon
                        size={20}
                        reverse 
                        containerStyle={{ bottom: 20, right: 20 }}
                      />
                      ),
                    }}
                  />
              </View>
              <View style={{justifyContent: 'left'}}>
                <Text style={{fontSize: 20}}>Age: {this.state.age}</Text>
                <Text></Text>
              </View>
            <Input 
              style={styles.textin}
              disabled = {false}
              multiline
              numberOfLines={4}
              value = {this.state.bio}
              placeholder="Bio" 
              onChangeText={text => this.setState({bio: text})}/>
            <Button title="Save" onPress={this.handleSave} style={styles.btn}/>
            <Button title="Logout" onPress={this.handleLogout} buttonStyle={{backgroundColor: "red", marginTop: 15}}/>
          </View>
        </KeyboardAwareScrollView>)
  }

  componentDidMount() {
    this.repo.getUserByID(this.props.getUid())
    .then(data => this.setState({
      username: data[0].username,
      firstName: data[0].first_name,
      lastName: data[0].last_name,
      bio: data[0].bio,
      age: data[0].age.toString(),
      gender: data[0].gender,
      pronoun: data[0].pronoun,
    })
  )}
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
  
export default Profile;