import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground } from 'react-native';
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

    if (!this.props.pet) {
      return <Text>Loading!</Text>
    } else {
      const { name, breed, age, description, photos, shelterId } = this.props.pet;
      let image = photos[2]
      if (this.props.showInfo) {
        return (
          <View>
            <ImageBackground source = {{uri: image}} style={styles.image}
          imageStyle={styles.borderRad}>
              <Text style={styles.petName}>{name} </Text>
              <Text>{breed}</Text>
              <Text>{age}</Text>
            </ImageBackground>
            <View>
              <Text>{description}</Text>
              <Text>{name} can be found at {shelterId}</Text>
            </View>
            <TouchableOpacity
            style={styles.contactButton}
          >
            <Text style={styles.contactButtonText}> Contact {shelterId} </Text>
          </TouchableOpacity>
        </View>
        )
      } else {
        return (
          <GestureRecognizer 
            style={styles.swiper}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            config={config}
          >
            <ImageBackground source = {{uri: image}} style={styles.image}
            imageStyle={styles.borderRad}>
              <Text style={styles.petName}>{name} </Text>
            </ImageBackground>
        </GestureRecognizer>
        )
      }
    } 
  } 
}
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

const styles = StyleSheet.create({
  petName: {
    fontSize: 40,
    color: 'white',
    position: 'absolute',
    bottom: 60,
    left: 50
  },
  swiper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500
  },
  image: {
    height: 500,
    width: 350,
  },
  borderRad: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 2
  },
  contactButton: {

  },
  contactButtonText: {

  }
})


