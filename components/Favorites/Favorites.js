import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import APIkey from '../apiKey';
import { cleanPets } from '../helpers/helpers';
import FavesInfo from '../FavesInfo/FavesInfo';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      favorites: [],
      currentPet: {},
      showInfo: false
    })
  }

  componentDidMount = () => {
    console.log(this.props.favorites)
  }

  

  showInfo = (petId) => {
    this.setState({
      showInfo: true
    })
    this.getPet(petId)


  }

  getPet = (petId) => {
    fetch(`fetch(http://api.petfinder.com/pet.get?format=json&key=${APIkey}&id=${petId}`)
    .then(response => response.json())
    .then(pet => this.setState({currentPet: pet.petfinder.pet}))
    .then(error => console.log(error))
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
    .then(result => this.reRenderFavorites())
    .catch(error => console.log(error))
  }

  reRenderFavorites = () => {
    this.props.fetchFavorites()
    this.props.displayFaves();
  }
  

  render() {
    const { cleanedFaves } = this.props;
    const { showInfo, currentPet } = this.state;
    let display;
    if (showInfo) {
      return (
        <FavesInfo currentPet={currentPet} />
      )

    } else if (cleanedFaves.length === 0) {
      display = <Text>You don't have any cleanedFaves!</Text>
    } else {
      display = cleanedFaves.map((favoritePet) => {
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

