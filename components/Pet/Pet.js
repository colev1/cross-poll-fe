import React  from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { hamburgerIcon } from '../../assets/Hamburger_icon.svg.png';
import APIkey from '../apiKey';
import Loading from '../Loading/Loading';

import { cleanShelters } from '../helpers/helpers';

export default class Pet extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      gestureName: '',
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
    this.props.fetchShelter()
  }

  render() {
    if (!this.props.pet) {
      return <Loading />
    } else {
      const { name, breed, age, description, photos, shelterId } = this.props.pet;
      const { shelterName } = this.props;
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
            <View styles={styles.description}>
              <Text>{description}</Text>
              <Text>{name} can be found at {shelterName}</Text>
            </View>
            <TouchableOpacity
            style={styles.contactButton}
          >
              <Text style={styles.contactButtonText}> Contact {shelterName} </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.backButton}
          > 
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
            <TouchableOpacity  onPress={this.props.showFilter}
            style={styles.hamburgerContainer}>
              <Image source={require('../../assets/Hamburger_icon.svg.png')} style={styles.hamburgerIcon} />
            </TouchableOpacity>
            <ImageBackground source = {{uri: image}} style={styles.image}
            imageStyle={styles.borderRad}>
            
                <Text style={styles.petName}>{name}</Text>
                <Text style={styles.shelterName}>{shelterName}</Text>
              
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
    left: 20
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

  },
  hamburgerIcon: {
    height: 50,
    width: 50,
    // position: 'relative',
    // right: 120,
    // top: 40,
    marginBottom: 40
  },
  hamburgerContainer: {
    height: 50,
    width: 50,
    position: 'relative',
    right: 120,
    top: 40,
    marginBottom: 40
  },
  description: {
    height: 200,
    width: 300
  },
  shelterName: {
    color: 'white',
    fontSize: 15,
    position: 'absolute',
    bottom: 30,
    left: 20,
    marginTop: 20

  }
})


