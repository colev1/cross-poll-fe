import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

export default class Pet extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      gestureName: ''
    }
  }

  onSwipe = (gestureName, gestureSate) => {
    const { SWIPE_RIGHT, SWIPE_LEFT } = swipeDirections;
    this.setState({
      gestureName
    })

    switch (gestureName) {
      case SWIPE_LEFT:
        this.props.changePet()
        break;
    }
  }

  onSwipeLeft = () => {
    console.log('swiping left')
  }

  render() {
    if (props.pet) {
      petDisplay = <Text>{props.pet.name}</Text>
    } else {
      petDisplay = <Text>Loading!</Text>
    }
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer onSwipe={(direction, state) => this.onSwipe(direction, state)}
      onSwipeLeft={(state) => this.onSwipeLeft(state)}
      config={config}
      >
        <View>
          {petDisplay}
        </View>
      </GestureRecognizer> 
    )

  } 
}


