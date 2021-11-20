import React from "react";
import { StyleSheet } from 'react-native';
import { Button, Text, Input, Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import ActivityCard from '../components/ActivityCard'
import TinderCard from 'react-tinder-card'

class Homepage extends React.Component {

    state = {
      activities: [{title: "In n Out Burger", imgSource: "https://www.usmagazine.com/wp-content/uploads/2018/08/in-n-out-burger-Republican-Party.jpg"}]
      
    }
    render() {
        return (
        <SafeAreaView>
        
          {this.state.activities.map((act) =>
            <TinderCard>
                <ActivityCard activity={act}/>
            </TinderCard>
          )
          }  
          
          
        </SafeAreaView>)


    }

    componentDidMount() {
      //API call here
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
      width: "90%",
      height: 50,
      borderColor: "black",
      borderWidth: 2
    },
    txtLink: {
      color: "#71B6BF"
    },
    text: {
      marginTop: 10
    }
  });
  
  export default Homepage;