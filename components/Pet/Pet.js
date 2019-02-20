import React  from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ActivityIndicator, ScrollView } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import APIkey from '../apiKey';
import Loading from '../Loading/Loading';
import { cleanShelters } from '../helpers/helpers';
import { Icon } from 'react-native-elements';
import PetInfo from '../PetInfo/PetInfo'

export default class Pet extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      gestureName: '',
      distance: '',
    }
  }

  componentDidMount = () => {
    // this.findDistance()
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
      case SWIPE_LEFT:
        this.props.changePet()
        break;
      case SWIPE_RIGHT:
        this.props.changePet()
        break;
    }
  }

  onSwipeLeft = () => {
    const { addToFavorites, userAPIToken, fetchShelter, pet  } = this.props;
    fetchShelter()
    addToFavorites(pet.id)
  }

  onSwipeRight = () => {
    console.log('swiping right!')
  }

  findDistance = () => {
    const {latitude, longitude} = this.props.shelter;
    const {userLocation} = this.props;
    const url = `https://adoptr-be.herokuapp.com/api/v1/distances?user_lat=${userLocation.latitude}&user_long=${userLocation.longitude}&shelter_lat=${latitude}&shelter_long=${longitude}`
    fetch(url)
      .then(response => response.json())
      .then(result => this.setState({distance: result.distance}))
      .then(error => console.log(error))
  }

  emailShelter = () => {
    const {name} = this.props.pet;
    let message = `I am hoping to schedule a meet and greet with ${name} and would love to get in contact with you to schedule a time to do that. I look forward to hearing from you!`
    const shelterEmail = this.props.shelter.email
    let postBody = {
      api_token: this.props.userAPIToken,
      shelter_email: 'colevanacore@gmail.com',
      pet_name: name,
      message: message
    }
    console.log('TEXT OBJECT', postBody)
    fetch('https://adoptr-be.herokuapp.com/api/v1/shelter_notifier', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => console.log('result',result))
      .then(error => console.log('error',error))
  }

  sendText = (textObj) => {
    const {recipient_phone, pet_name, shelter_name, pet_id} = textObj;
    let postBody = {
      api_token: this.props.userAPIToken,
      recipient_phone,
      pet_name,
      shelter_name,
      pet_id
    }
    console.log('TEXT OBJECT', postBody)
    fetch('https://adoptr-be.herokuapp.com/api/v1/texts', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => console.log('result',result))
      .then(error => console.log('error',error))
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    } else {
      const { name, breed, age, description, photos, shelterId } = this.props.pet;
      const { shelter } = this.props;
      let image = photos[2]
      if (this.props.showInfo) {
        return (
          <PetInfo pet={this.props.pet} shelter={shelter} sendText={this.sendText} emailShelter={this.emailShelter}/>
        )
      } else {
        return (
          <GestureRecognizer 
            style={styles.swiper}
            onSwipe={(direction, state) => this.onSwipe(direction, state)}
            onSwipeLeft={(state) => this.onSwipeLeft(state)}
            config={config}
          >
          <View style={styles.navContainer}>
            <TouchableOpacity  onPress={this.props.showFilter}
            style={styles.hamburgerContainer}>
            <Icon
              name='cog'
              type='font-awesome'
              color='#F49D37'
              size={48}
              iconStyle={styles.cog}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.showFavorites} style={styles.hamburgerContainer}>
              <Icon
              name='heart'
              type='font-awesome'
              color='#D90368'
              size={48}
              iconStyle={styles.heart}/>
            </TouchableOpacity>
            </View> 
            <ImageBackground source = {{uri: image}} style={styles.image}
            imageStyle={styles.borderRad}>
                <View style={styles.shelterContainer}>
                <Text style={styles.petTitle}> {name} </Text>
                <View style={styles.petDescription}> 
                  <Icon
                      name='home'
                      type='font-awesome'
                      color='white'
                      size={20}
                      iconStyle={styles.home}/>
                  <Text style={styles.petText}> {shelter.name} </Text> 
                </View>
                <View style={styles.petDescription}>
                  <Icon
                      name='map-marker'
                      type='font-awesome'
                      color='white'
                      size={20}
                      iconStyle={styles.home}/> 
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
    // marginBottom: 40
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
    color: 'white',
    fontFamily: 'Kohinoor Bangla',
  },
  petDescription: {
    display: 'flex',
    flexDirection: 'row',
  },
  petText: {
    fontSize: 16,
    color: 'white',
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
    backgroundColor: '#F49D37',
    paddingLeft: 8,
    color: 'white'
  },
  scroll: {
    width: 300,
    height: 80,
    marginLeft: 30,
    marginRight: 10
  },
})


