import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Loading from '../Loading/Loading';
import { cleanPet } from '../helpers/helpers';

export default class FavesInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentPet, shelter } = this.props;
    const image = currentPet.photos[2]

    if (currentPet) {
      return (
        <View>
          <ImageBackground source = {{uri: image}} style={styles.moreInfoImage}
          imageStyle={styles.borderRad}>
            <Text style={styles.petName}>{currentPet.name} </Text>
            <View style={styles.currentPetBreedAge}>
              <Text style={{color:'white'}}>{currentPet.breed}</Text>
              <Text style={{color:'white'}}>{currentPet.age}</Text>
            </View>
          </ImageBackground>
            <ScrollView style={styles.scroll}>
              <Text style={{fontSize: 15}}>{currentPet.description}</Text>
              <Text style={{fontSize: 15}}>{currentPet.name} can be found at </Text>
              <View style={styles.shelterInfo}>
              <Text style={styles.phone}>{shelter.phone}</Text>
              <Text style={styles.cityStateZip}>{shelter.city}{shelter.state}{shelter.zip}</Text>
            </View>
            <TouchableOpacity
            style={styles.contactButton}>
              <Text style={styles.contactButtonText}> Contact {shelter.name} </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.backButton}> 
            </TouchableOpacity>
            </ScrollView>
        </View>
      )
    } else {
      return (
        <Loading  />
      )
    }
    
    
  }
}

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
  moreInfoImage: {
    marginTop: 5
  },
  borderRad: {
    borderColor: 'white',
    borderRadius: 30,
    borderWidth: 2
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
  hamburgerIcon: {
    height: 50,
    width: 50,
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
    width: 300,
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 15
  },
  canBeFound: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
    fontSize: 15
  },
  shelterName: {
    color: 'white',
    fontSize: 15,
    position: 'absolute',
    top: 415,
    left: 20,
    marginTop: 20
  },
  shelterInfo: {
    marginTop: 0,
    fontSize: 10,
    textAlign: 'center'
  },
  phone: {
    textAlign: 'center'
  },
  cityStateZip: {
    textAlign: 'center'
  },
  petBreedAge: {
    position: 'absolute',
    top: 240,
    left: 20
  },
  moreInfoImage: {
    height: 300,
    width: 350,
    marginTop: 10  
  },
  scroll: {
    width: 300,
    height: 80,
    marginLeft: 30,
    marginRight: 10
  },
  cog: {
    position: 'absolute',
    top: -10
  },
  heart: {
    position: 'absolute',
    top: -58, 
    left: 100
  }
})


