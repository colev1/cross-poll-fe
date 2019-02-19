import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import APIkey from '../apiKey';
import { cleanPets } from '../helpers/helpers';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      favorites: []
    })
  }

  componentDidMount = () => {
    console.log(this.props.favorites)
    this.displayFaves(this.props.favorites)
  }

  displayFaves = async (favoriteIds) => {
    const pets = await favoriteIds.map(async favorite => {
      const response = await fetch(`http://api.petfinder.com/pet.get?format=json&key=${APIkey}&id=${favorite.attributes.favorite_id}`)
      return response.json()
    })
    const finalPets = await Promise.all(pets)

    const cleanedPets = this.cleanPets(finalPets)
    this.setState({favorites: cleanedPets})
    // return finalPets
  }

  showInfo = (petId) => {

  }

  cleanPets = (pets) => {
    const realPets = pets.filter(pet => {
        return pet.petfinder.pet
    })
    return realPets.map(currPet => currPet.petfinder.pet)
  }



  deleteFavorite = (petId, userToken) => {
    const { userAPIToken } = this.props;
    const postBody = {
      api_token: userToken,
      favorite_id: petId
    }
    fetch(`https://adoptr-be.herokuapp.com/api/v1/favorites?api_token=${userAPIToken}`, {
      method: 'DELETE',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => this.rerenderFavorites())
    .catch(error => console.log(error))
  }

  rerenderFavorites = () => {
    this.props.fetchFavorites()
    this.displayFaves(this.props.favorites)
  }
  

  render() {
    const { favorites } = this.state;
    let display;
    if (favorites.length === 0) {
      display = <Text>You don't have any favorites!</Text>
    } else {
      display = favorites.map((favoritePet) => {
         return (
           <View key={favoritePet.id.$t} style={styles.favoritePetContainer}>
            <TouchableOpacity onPress={() => this.deleteFavorite(favoritePet.id.$t)}>
              <Icon
                name='minus-circle'
                type='font-awesome'
                color='#E74544'
                style={styles.delete}
                />
            </TouchableOpacity>
            <Text style={styles.name}>{favoritePet.name.$t}</Text>
            <TouchableOpacity onPress={() => this.showInfo(favoritePet.id.$t)}>
              <Icon
                name='angle-right'
                type='font-awesome'
                color='#F49D37'
                />
            </TouchableOpacity>
           </View>
         ) 
       })
    }

    return(
      <View style={styles.favoritesContainer}>
        {display}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  favoritesContainer: {
    backgroundColor: '#E5E5E5',

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
    paddingLeft: 10

  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#048BA8',
    marginLeft: 20,
    marginRight: 230
  },
  delete: {
    marginLeft: 10
  }
});

