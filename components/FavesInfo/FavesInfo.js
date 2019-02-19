import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FavesInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { currentPet } = this.props;
    return (
      <View>
           
              <Text style={styles.petName}>{currentPet.name.$t} </Text>
              <View style={styles.petBreedAge}>
                <Text style={{color:'white'}}>{currentPet.breed.$t}</Text>
                <Text style={{color:'white'}}>{currentPet.age.$t}</Text>
              </View>
           
            <ScrollView style={styles.scroll}>
              <Text style={{fontSize: 15}}>{currentPet.description.$t}</Text>
              <Text style={{fontSize: 15}}>{currentPet.name.$t} can be found at </Text>
            </ScrollView>
            {/* <View styles={styles.shelterInfo}>
              <Text>{shelter.phone}</Text>
              <Text>{shelter.city}{shelter.state}{shelter.zip}</Text>
            </View> */}
            <TouchableOpacity
            style={styles.contactButton}
          >
              <Text style={styles.contactButtonText}> Contact shelter </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.backButton}
          > 
            </TouchableOpacity>
          </View>
    )
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
    textAlign: 'center'
  },
  shelterName: {
    color: 'white',
    fontSize: 15,
    position: 'absolute',
    bottom: 30,
    left: 20,
    marginTop: 20
  },
  shelterInfo: {

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