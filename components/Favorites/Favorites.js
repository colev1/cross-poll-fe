import APIkey from '../apiKey';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { cleanPet, cleanShelters } from '../helpers/helpers';
import PetInfo from '../PetInfo/PetInfo'

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      favorites: [],
      currentPet: {},
      showInfo: false,
      shelter: {},
      loading: false,
    })
  }

  getPet = async (petId) => {
    try {
      let url = `http://api.petfinder.com/pet.get?format=json&key=${APIkey}&id=${petId}`

      const response = await fetch(url)
      const pet = await response.json()
      const cleanedPet = cleanPet(pet.petfinder.pet)
      await this.fetchShelter(cleanedPet.shelterId)
      this.setState({
        currentPet: cleanedPet,
        showInfo: true
      })
    } catch(error)  {
      this.props.displayError()
    }
  }

  fetchShelter = async (shelterId) => {
    try {
      let url = `http://api.petfinder.com/shelter.get?format=json&key=${APIkey}&id=${shelterId}`
      const response = await fetch(url)
      const shelter = await response.json()
      const cleanShelter = await cleanShelters(shelter.petfinder.shelter)
      this.setState({shelter: cleanShelter})
    } catch(error) {
      this.props.displayError()
    }
  }

  deleteFavorite = async (petId, userToken) => {
    try {
      this.props.loadDelete()
      const { userAPIToken } = this.props;
      const postBody = {
        api_token: userToken,
        favorite_id: petId
      }
      let url = `https://adoptr-be.herokuapp.com/api/v1/favorites?api_token=${userAPIToken}`

      const response = await fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(postBody),
        headers: {
        'Content-Type': 'application/json'
        }
      })
      await response.json()
      await this.reRenderFavorites()
    } catch(error) {
      this.props.displayError()
    }
  }

  reRenderFavorites = () => {
    this.props.fetchFavorites()
    this.props.displayFaves();
  }


  render() {
    const { cleanedFaves } = this.props;
    const { showInfo, currentPet, shelter } = this.state;
    let display;
    let icon = ( <Icon
      name='minus-circle'
      type='font-awesome'
      color='#E74544'
      style={styles.delete}
    />)
    if (this.props.loadingFaves) {
      icon = <ActivityIndicator size="small" color="red" />
    }
    if (showInfo) {
      return (
        <View style={styles.homeContainer}>
          <PetInfo pet={currentPet} shelter={shelter} returnHome={this.props.returnHome} loading={this.props.loading}
          sendText={this.props.sendText}
          emailShelter={this.props.emailShelter} />
        </View>
      )
    } else if (cleanedFaves.length === 0) {

      display = 
      <View style={styles.noFavesContainer}>
        <Text style={styles.noFavesMessage}> You don't have any favorites!</Text>
        <Icon
          name='ban'
          type='font-awesome'
          color='#F49D37'
        />
      </View>
    } else {
      display = cleanedFaves.map((favoritePet) => {
        return (
          <View key={favoritePet.id.$t} style={styles.favoritePetContainer}>
            <TouchableOpacity onPress={() => this.deleteFavorite(favoritePet.id.$t)}>
              {icon}
            </TouchableOpacity>
            <Text style={styles.name}>{favoritePet.name.$t}</Text>
            <TouchableOpacity onPress={() => this.getPet(favoritePet.id.$t)}
              style={styles.arrowRight}>
              <Icon
                name='angle-right'
                type='font-awesome'
                color='grey'
              />
            </TouchableOpacity>
          </View>
        )
      })
    }
    return (
        <ScrollView contentContainerStyle={styles.favoritesContainer}>
          {display}
        </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  favoritesContainer: {
    backgroundColor: '#E5E5E5',
    flex: 1,
    justifyContent: 'center'
  },
  favoritePetContainer: {
    backgroundColor: 'white',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 5,
    width: 370,
    height: 50,
    textAlign: 'left',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#048BA8',
    marginLeft: 20,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    fontWeight: 'bold'
  },
  delete: {
    marginLeft: 10
  },
  noFavesMessage: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla',
  },
  backButton: {
    textAlign: 'center',
    zIndex: 4,
  },
  icon: {
    backgroundColor: '#048BA8',
    position: 'absolute'
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 0,
  }

});
