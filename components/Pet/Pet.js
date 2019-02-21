import React from 'react';
import PetInfo from '../PetInfo/PetInfo';
import Loading from '../Loading/Loading';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { Icon } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";

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

  findDistance = () => {
    const { latitude, longitude } = this.props.shelter;
    const { userLocation } = this.props;
    const url = `https://adoptr-be.herokuapp.com/api/v1/distances?user_lat=${userLocation.latitude}&user_long=${userLocation.longitude}&shelter_lat=${latitude}&shelter_long=${longitude}`
    fetch(url)
      .then(response => response.json())
      .then(result => this.setState({ distance: result.distance }))
      .catch(error => this.props.displayError())
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
          <GestureRecognizer
            style={styles.swiper}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeRight={(state) => this.onSwipeRight(state)}
            config={config}
          >
            <View style={styles.navContainer}>
              <TouchableOpacity onPress={this.props.showFilter}
                style={styles.hamburgerContainer}>
                <Icon
                  name='cog'
                  type='font-awesome'
                  color='#048BA8'
                  size={48}
                  iconStyle={styles.cog} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.props.showFavorites} style={styles.hamburgerContainer}>
                <Icon
                  name='heart'
                  type='font-awesome'
                  color='#048BA8'
                  size={48}
                  iconStyle={styles.heart} />
              </TouchableOpacity>
            </View>
            <ImageBackground source={{ uri: image }} style={styles.image}
              imageStyle={styles.borderRad}>
              <View style={styles.shelterContainer}>
                <Text style={styles.petTitle}> {name} </Text>
                <View style={styles.petDescription}>
                  <Icon
                    name='home'
                    type='font-awesome'
                    color='black'
                    size={20}
                    iconStyle={styles.home} />
                  <Text style={styles.petText}> {shelter.name} </Text>
                </View>
                <View style={styles.petDescription}>
                  <Icon
                    name='map-marker'
                    type='font-awesome'
                    color='black'
                    size={20}
                    iconStyle={styles.home} />
                  <Text style={styles.petText}>  {this.state.distance} miles away </Text>
                </View>
              </View>
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
    left: 20,
    fontFamily: 'Kohinoor Bangla',
    textAlign: 'center',
  },
  swiper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    marginBottom: 40,
  },
  image: {
    height: 600,
    width: 400,
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
    marginRight: 4,
  },
  navContainer: {
    flex: 1,
    flexDirection: 'row',
    top: 80,
    justifyContent: 'space-between',
    width: 360,
    height: 100
  },
  hamburgerIcon: {
    height: 50,
    width: 50,
    color: 'black',
  },
  hamburgerContainer: {
    padding: 10,
    borderRadius: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 70,
    borderColor: 'white',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  petTitle: {
    fontSize: 32,
    color: 'black',
    marginLeft: 8,
    fontFamily: 'Kohinoor Bangla',
  },
  petDescription: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 8,
  },
  petText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Kohinoor Bangla',
    marginLeft: 4,
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
    position: 'absolute',
    bottom: 30,
    left: 20,
    marginTop: 20,
    width: 360,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    paddingLeft: 8,
  },
  scroll: {
    width: 300,
    height: 80,
    marginLeft: 30,
    marginRight: 10
  },
})


