import React, { useState, useMemo, useEffect, Children } from "react";
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import ActivityCard from '../components/ActivityCard'
import TinderCard from 'react-tinder-card'
import styled from "styled-components/native";

import { Button } from "react-native-elements";
import { Repository } from "../api/repository";

//Swiping functionality code is adapted from here: 
//https://www.npmjs.com/package/react-tinder-card
//https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js

const Container = styled.View` 
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`

const Header = styled.Text`
    color: #000;
    font-size: 30px;
    margin-bottom: 30px;
`

const CardContainer = styled.View`
    width: 90%;
    max-width: 260px;
    height: 300px;
    marginTop: 40px;
`

const Card = styled.View`
    position: absolute;
    background-color: #fff;
    width: 100%;
    max-width: 260px;
    height: 300px;
    shadow-color: black;
    shadow-opacity: 0.2;
    shadow-radius: 20px;
    border-radius: 20px;
    resize-mode: cover;
`

const CardImage = styled.ImageBackground`
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 20px;
`

const CardTitle = styled.Text`
    position: absolute;
    bottom: 0;
    margin: 10px;
    color: #fff;
`

const Buttons = styled.View`
    margin: 20px;
    z-index: -100;
    width: 50%;
    justifyContent: space-between;
`

var alreadyRemoved = [];

export default function Homepage(props) {

  const repo = new Repository();

  const [activities, setActitivies] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [currentActivity, setCurrentActivity] = useState(activities[0]);
  const [childRefs, setChildRefs] = useState([]);

  let actState = activities;
  //const childRefs = useMemo(() => Array(activities.length).fill(0).map(i => React.createRef()), [activities])
  //let childRefs = []

  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  const refresh = () => {
    repo.getCards().then(cards => {
      setActitivies(cards)
      var copy = [...activities];
      console.log(copy)
      shuffleArray(copy);
      setActitivies(copy);
      actState = activities;
      setCurrentActivity(activities[0]);
      setChildRefs(Array(activities.length).fill(0).map(i => React.createRef()));

      alreadyRemoved = [];
    }).catch(e => console.log(e));
  }

  const swiped = (direction, titleToDelete) => {
    console.log('removing: ' + titleToDelete + ' to the ' + direction)
    setLastDirection(direction)
    alreadyRemoved.push(titleToDelete)
  }

  const outOfFrame = (title) => {
    console.log(title + ' left the screen!')
    actState = actState.filter(act => act.activity_name !== title)
    setActitivies(actState)
    setCurrentActivity(activities[0])
  }

  const swipe = (dir) => {
    const cardsLeft = activities.filter(activity => !alreadyRemoved.includes(activity.activity_name))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].activity_name // Find the card object to be removed
      const index = activities.map(activity => activity.activity_name).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!

    }
  }

  const handleSwipe = (dir) => {
    swipe(dir);
    const act = activities[activities.length - 1];

    if (dir === "right") {
      props.navigation.navigate("Groups", {card_id: act.card_id});
    }
  }

  useEffect(() => {
    repo.getCards().then(cards => {
      setActitivies(cards)
      setChildRefs(Array(cards.length).fill(0).map(i => React.createRef()));
      actState = activities;
    }).catch(e => console.log(e));
  }, []);

  return (
    <Container>
      <CardContainer>
        {activities.map((character, index) =>
          <TouchableOpacity onPress={() => props.navigation.navigate("ActivityDetails")}>
            <TinderCard ref={childRefs[index]} key={character.activity_name} onSwipe={(dir) => swiped(dir, character.activity_name)} onCardLeftScreen={() => outOfFrame(character.activity_name)}>
              <Card>
                <CardImage source={{uri: character.photo_url}}>
                  <CardTitle>{character.activity_name}</CardTitle>
                </CardImage>
              </Card>
            </TinderCard>
          </TouchableOpacity>
          
        )}
      </CardContainer>
      <Buttons>
        <Button icon={{name: "close", color: "white"}}
            buttonStyle={styles.btnReject}
            iconContainerStyle={{width: "100%"}}
            onPress={() => handleSwipe("left")}
            disabled={activities.length === 0}
        />
        <Button icon={{name: "check", color: "white"}}
            buttonStyle={styles.btnAccept}
            iconContainerStyle={{width: "100%"}}
            onPress={() => handleSwipe("right")}
            disabled={activities.length === 0}
        />
      </Buttons>
      <View>
        <Button title="Refresh" buttonStyle={styles.btnRefresh} onPress={refresh}/>
      </View>
    </Container>
  )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    },
    groupContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 20,
      zIndex: -100
    },
    btnReject: {
      backgroundColor: "#ed3c00",
      width: "100%",
    },
    btnAccept: {
        backgroundColor: "#71B6BF",
        width: "100%",
        marginTop: 10
    },
    btnRefresh: {
      backgroundColor: "#33a5d6",
    }
});