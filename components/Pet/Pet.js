import React  from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ActivityIndicator, ScrollView } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import APIkey from '../apiKey';
import Loading from '../Loading/Loading';
import { cleanShelters } from '../helpers/helpers';
import { Icon } from 'react-native-elements';

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

  render() {
    if (this.props.loading) {
      return <Loading />
    } else {
      const { name, breed, age, description, photos, shelterId } = this.props.pet;
      const { shelter } = this.props;
      let image = photos[2]
      if (this.props.showInfo) {
        return (
          <View>
            <ImageBackground source = {{uri: image}} style={styles.moreInfoImage}
          imageStyle={styles.borderRad}>
              <Text style={styles.petName}>{name} </Text>
              <View style={styles.petBreedAge}>
                <Text style={{color:'white'}}>{breed}</Text>
                <Text style={{color:'white'}}>{age}</Text>
              </View>
            </ImageBackground>
            <ScrollView style={styles.scroll}>
              <Text style={{fontSize: 15}}>{description}</Text>
              <Text style={{fontSize: 15}}>{name} can be found at {shelter.name}</Text>
            </ScrollView>
            <View styles={styles.shelterInfo}>
              <Text>{shelter.phone}</Text>
              <Text>{shelter.city}{shelter.state}{shelter.zip}</Text>
            </View>
            <TouchableOpacity
            style={styles.contactButton}
          >
              <Text style={styles.contactButtonText}> Contact {shelter.name} </Text>
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
          <View style={styles.navContainer}>
            <TouchableOpacity  onPress={this.props.showFilter}
            style={styles.hamburgerContainer}>
            <Icon
              name='cog'
              type='font-awesome'
              color='#F49D37'
              size={40}
              iconStyle={styles.cog}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.showFavorites}>
              <Icon
              name='heart'
              type='font-awesome'
              color='#D90368'
              size={40}
              iconStyle={styles.cog}/>
            </TouchableOpacity>
            </View> 
            <ImageBackground source = {{uri: image}} style={styles.image}
            imageStyle={styles.borderRad}>
                <Text style={styles.petName}>{name}</Text>
                <View style={styles.shelterContainer}>
                  <Icon
                name='home'
                type='font-awesome'
                color='white'
                size={16}
                iconStyle={styles.home}/>
                  <Text style={styles.shelterName}>{shelter.name}</Text>
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
    left: 20
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
  borderRad: {
    borderRadius: 30,
    // borderWidth: 2,

  },
  contactButton: {

  },
  contactButtonText: {

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
    // height: 50,
    // width: 50,
    // position: 'relative',
    // right: 120,
    // top: 40,
    // marginBottom: 40
  },
  description: {
    height: 200,
    width: 300,
    flex: 1,
    textAlign: 'center'
  },
  shelterName: {
    color: 'white',
    fontSize: 15,
  },
  shelterInfo: {

  },
  shelterContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    color: 'white'
  },
  petBreedAge: {
    position: 'absolute',
    top: 340,
    left: 20
  },
  moreInfoImage: {
    height: 300,
    width: 350,
    marginTop: 10  
  },
  scroll: {
    width: 300,
    height: 100,
    marginLeft: 30,
    marginRight: 10
  },
  cog: {
  
  }
})


