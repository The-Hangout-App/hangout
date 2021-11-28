import React, { useState, useMemo } from "react";
import { StyleSheet, View } from 'react-native';
import ActivityCard from '../components/ActivityCard'
import TinderCard from 'react-tinder-card'
import styled from "styled-components";
import { Button } from "react-native-elements";

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

const alreadyRemoved = [];

export default function Homepage(props) {

  const [activities, setActitivies] = useState([{title: "In n Out Burger", imgSource: "https://www.usmagazine.com/wp-content/uploads/2018/08/in-n-out-burger-Republican-Party.jpg"}, {title: "In n Out Burger 2", imgSource: "https://www.usmagazine.com/wp-content/uploads/2018/08/in-n-out-burger-Republican-Party.jpg"}]);
  const [lastDirection, setLastDirection] = useState();
  const [currentActivity, setCurrentActivity] = useState(activities[0]);

  let actState = activities;

  const childRefs = useMemo(() => Array(activities.length).fill(0).map(i => React.createRef()), [])

  const swiped = (direction, titleToDelete) => {
    console.log('removing: ' + titleToDelete + ' to the ' + direction)
    setLastDirection(direction)
    alreadyRemoved.push(titleToDelete)
  }

  const outOfFrame = (title) => {
    console.log(title + ' left the screen!')
    actState = actState.filter(act => act.title !== title)
    setActitivies(actState)
    setCurrentActivity(activities[0])
  }

  const swipe = (dir) => {
    const cardsLeft = activities.filter(activity => !alreadyRemoved.includes(activity.title))
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].title // Find the card object to be removed
      const index = activities.map(activity => activity.title).indexOf(toBeRemoved) // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved) // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir) // Swipe the card!

    }
  }

  const handleSwipe = (dir) => {
    swipe(dir);
    act = activities[activities.length - 1]

    if (dir === "right") {
      props.navigation.navigate("Groups", {activity: act, group: 1});
    }
  }

  return (
    <Container>
      <CardContainer>
        {activities.map((character, index) =>
          <TinderCard ref={childRefs[index]} key={character.title} onSwipe={(dir) => swiped(dir, character.title)} onCardLeftScreen={() => outOfFrame(character.title)}>
            <Card>
              <CardImage source={{uri: character.imgSource}}>
                <CardTitle>{character.title}</CardTitle>
              </CardImage>
            </Card>
          </TinderCard>
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
    </Container>
  )

}

/*return (<View>
    {activities.map((act, index) =>
      <TinderCard ref={childRefs[index]} key={act.title}
        onSwipe={(dir) => swiped(dir, act.title)}
        onCardLeftScreen={() => outOfFrame(act.title)}
        preventSwipe={["up", "down"]}>

        <ActivityCard activity={act}/>

      </TinderCard>
    )}*/

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
});