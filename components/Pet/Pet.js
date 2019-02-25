import React from 'react';
import PetInfo from '../PetInfo/PetInfo';
import Loading from '../Loading/Loading';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import { LinearGradient } from 'expo';


export default class Pet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gestureName: '',
      distance: 0,
    }
  }

  componentWillUnmount = () => {
    this.setState({
      distance: ''
    })
  }

  onSwipe = (gestureName, gestureState) => {
    const { SWIPE_RIGHT, SWIPE_LEFT } = swipeDirections;
    this.setState({
      gestureName
    })
    this.findDistance()
    switch (gestureName) {
      case SWIPE_RIGHT:
        showMessage({
          message: "Liked!",
          description: 'Pet added to favorites',
          type: "success",
          floating: true
        });
        this.props.changePet()
        break;
      case SWIPE_LEFT:
        showMessage({
          message: "Disliked!",
          description: 'Keep swiping to find a pet!',
          type: "danger",
          floating: true
        });
        this.props.changePet()
        break;
    }
  }

  onSwipeRight = () => {
    const { addToFavorites, userAPIToken, fetchShelter, pet } = this.props;
    fetchShelter()
    addToFavorites(pet.id)
  }

  findDistance = async () => {
    try {
      const { latitude, longitude } = this.props.shelter;
      const { userLocation } = this.props;
      const url = `https://adoptr-be.herokuapp.com/api/v1/distances?user_lat=${userLocation.latitude}&user_long=${userLocation.longitude}&shelter_lat=${latitude}&shelter_long=${longitude}`

      const response = await fetch (url)
      const result = await response.json()
      this.setState({
        distance: result.distance
      })
    } catch(error) {
      this.props.displayError()
    }
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    } else {
      const { name, photos } = this.props.pet;
      const { shelter } = this.props;
      let image = photos[2]
      if (this.props.showInfo) {
        return (
          <PetInfo pet={this.props.pet} shelter={shelter} sendText={this.props.sendText} emailShelter={this.props.emailShelter} returnHome={this.props.returnHome} loading={this.props.loading} />
        )
      } else {
        return (
          <View style={styles.swiper}>
          <GestureRecognizer
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
          >
            <ImageBackground source={{ uri: image }} style={styles.image}
              imageStyle={styles.borderRad}>
          <LinearGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,.2)', 'rgba(0,0,0,1)']} style={styles.gradient}></LinearGradient>
              <View style={styles.shelterContainer}>
                <Text style={styles.petTitle}> {name} </Text>
                <View style={styles.petDescription}>
                  <Icon
                    name='home'
                    type='font-awesome'
                    color='white'
                    size={20}
                    iconStyle={styles.home} />
                  <Text style={styles.petText}> {shelter.name} </Text>
                </View>
                <View style={styles.petDescription}>
                  <Icon
                    name='map-marker'
                    type='font-awesome'
                    color='white'
                    size={20}
                    iconStyle={styles.locationIcon} />
                  <Text style={styles.petText}>  {this.state.distance} miles away </Text>
                <TouchableOpacity onPress={this.props.displayInfo}
                  style={this.props.loading ? styles.hidden : styles.infoButton}>
                  <Icon
                    name='info-circle'
                    type='font-awesome'
                    color='#048BA8'
                    size={44}
                    iconStyle={styles.infoIcon} />
                </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </GestureRecognizer>
          </View>
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
  gradient: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 30,
  },
  petName: {
    fontSize: 40,
    color: 'white',
    position: 'absolute',
    bottom: 60,
    left: 20,
    fontFamily: 'Kohinoor Bangla',
    textAlign: 'center',
    zIndex: 3,
  },
  swiper: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 500,
  },
  image: {
    height: 600,
    width: 400,
    marginTop: 80,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  moreInfoImage: {
    marginTop: 5
  },
  borderRad: {
    borderRadius: 30,
  },
  contactButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 2,
    fontSize: 20,
    height: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'center',
    width: 300,
    marginBottom: 35,
    marginLeft: 23,
    marginTop: 10
  },
  contactButtonText: {
    textAlign: 'center',
    fontSize: 15,
    marginTop: 3
  },
  home: {
    marginRight: 1,
  },
  locationIcon: {
    marginRight: 1,
    marginLeft: 1,
  },
  navContainer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 420,
    backgroundColor: 'white',
  },
  hamburgerIcon: {
    height: 50,
    width: 50,
    color: 'black',
  },
  hamburgerContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petTitle: {
    fontFamily: 'Kohinoor Bangla',
    fontWeight: 'bold',
    fontSize: 36,
    zIndex: 4,
    color: 'white',
  },
  petDescription: {
    zIndex: 3,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8,
  },
  petText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Kohinoor Bangla',
    marginLeft: 1,
  },
  description: {
    height: 200,
    width: 300,
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15
  },
  shelterContainer: {
    borderRadius: 4,
    bottom: 30,
    left: 20,
    marginTop: 20,
    paddingLeft: 8,
    position: 'absolute',
    width: 360,
    zIndex: 3,
  },
  scroll: {
    width: 300,
    height: 80,
    marginLeft: 30,
    marginRight: 10
  },
  infoButton: {
    position: 'absolute',
    right: 0,
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  infoButtonText: {
    fontSize: 10,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Kohinoor Bangla',
  },
  hidden: {
    display: 'none'
  },
})


