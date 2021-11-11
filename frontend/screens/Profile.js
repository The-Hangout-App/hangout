import React from "react";
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input, Icon, Avatar } from "react-native-elements";
import { Card } from "react-native-elements/dist/card/Card";
import { SafeAreaView } from "react-native-safe-area-context";



class Profile extends React.Component {

    state = {
      firstName: "",
      lastName: "",
      bio: "",
      age: 0,
      gender: "",
      pronoun: ""
    }

    
    render() {
        return (<SafeAreaView style={styles.container}>
            

            <Avatar
                size= "medium"
                rounded
                icon={{name: 'user', type: 'font-awesome'}}
                activeOpacity={0.7}
                style = {styles.profilePicWrap}
            />
            <br/>
            <Text h3>Profile</Text>
            <View style= {styles.flexbox}>
                <Input  
                style={styles.text}
                placeholder="First Name" 
                onChangeText={text => this.setState({firstName: text})}/>
                <Input  
                style={styles.text}
                placeholder="Last Name" 
                onChangeText={text => this.setState({lastName: text})}/>
             </View>
            <br/>
            <br/>
            <br/>
                <Input  
                style={styles.inputs}
                placeholder="Pronouns" 
                onChangeText={text => this.setState({pronoun: text})}/>
                <Input  
                style={styles.inputs}
                placeholder="Gender" 
                onChangeText={text => this.setState({gender: text})}/>

                <Input  
                style={styles.inputs}
                placeholder="Age" 
                onChangeText={text => this.setState({gender: text})}/>
           
            <Input 
            style={styles.textin}
            multiline
            numberOfLines={4}
            placeholder="Bio" 
            onChangeText={text => this.setState({bio: text})}/>
            
        </SafeAreaView>)
    }

    

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
        borderWidth: '5'
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
  
  export default Profile;