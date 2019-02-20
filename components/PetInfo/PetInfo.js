import React  from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ActivityIndicator, ScrollView } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import APIkey from '../apiKey';
import Loading from '../Loading/Loading';
import { cleanShelters } from '../helpers/helpers';
import { Icon } from 'react-native-elements';

export default class PetInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    if(this.props.pet) {
      const { name, breed, age, description, photos, shelterId } = this.props.pet;
        const { shelter } = this.props;
        let image = photos[2]
    return (
      <View style={styles.petInfoContainer}>
                <View style={styles.titlesContainer}>
                  <Text style={styles.petName}> {name} </Text>
                  <Text style={styles.petDescription}>{breed}</Text>
                  <Text style={styles.petDescription}>{age}</Text>
                </View>
            <ImageBackground source = {{uri: image}} 
              style={styles.moreInfoImage}
              imageStyle={styles.borderRad}>
            </ImageBackground>
            <ScrollView style={styles.shelterContainer}>
              {/* <View style={styles.shelterContainer}> */}
              <Text style={styles.description}>{description}</Text>
              <Text style={styles.canBeFound}>{name} can be found at {shelter.name}</Text>
            <View style={styles.shelterInfo}>
              <Text style={styles.phone}>{shelter.phone}</Text>
              <Text style={styles.cityStateZip}>{shelter.city}{shelter.state}{shelter.zip}</Text>
            </View>
              {/* </View> */}
            </ScrollView>
            <TouchableOpacity
            style={styles.contactButton}
            onPress={this.emailShelter}>
              <Text style={styles.contactButtonText}> Email {shelter.name} </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.textButton}
            onPress={this.emailShelter}>
              <Text style={styles.contactButtonText}> Send a text about {name}! </Text>
            </TouchableOpacity>
          </View>
    )
    } else {
      return <Loading />
    }
  }
}

const styles = StyleSheet.create({
  petInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 80,
  },
  petName: {
    textAlign: 'center',
    fontSize: 52,
    color: '#048BA8',
    fontFamily: 'Kohinoor Bangla',
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
    backgroundColor: '#048BA8',
    color: 'white',
    borderRadius: 24,
    borderStyle: 'solid',
    fontSize: 20,
    height: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'center',
    width: 300,
    margin: 10,
  },
  textButton: {
    backgroundColor: '#048BA8',
    color: 'white',
    borderRadius: 24,
    borderStyle: 'solid',
    fontSize: 20,
    height: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'center',
    width: 300,
    marginBottom: 16,
  },
  contactButtonText: {
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    marginTop: 6
  },
  description: {
    width: 360,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  canBeFound: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
    fontSize: 15
  },
  petDescription: {
    fontSize: 28,
    textAlign: 'center',
    color: '#048BA8',
    fontFamily: 'Kohinoor Bangla',
  },
  shelterInfo: {
    marginTop: 0,
    fontSize: 10,
    textAlign: 'center'
  },
  phone: {
    textAlign: 'center',
  },
  cityStateZip: {
    textAlign: 'center'
  },
  titlesContainer: {
    borderRadius: 4,
    textAlign: 'center',
    width: 400,
  },
  shelterContainer: {
    backgroundColor: '#F49D37',
    borderRadius: 4,
    color: 'white',
    marginTop: 4,
    paddingLeft: 8,
    height: 600,
    padding: 4,
    width: 360,
  },
  petBreedAge: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 300,
    // bottom: 60,
    // left: 20,
  },
  moreInfoImage: {
    height: 200,
    width: 350,
  },
})