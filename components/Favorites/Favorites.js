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
      display = <Text style={styles.noFavesMessage}>You don't have any favorites!</Text>
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
            <TouchableOpacity onPress={() => this.showInfo(favoritePet.id.$t)}
            style={styles.arrowRight}>
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
        <TouchableOpacity onPress={this.props.goBack} style={styles.backButton}>
              <Icon
                name='arrow-circle-left'
                type='font-awesome'
                color='#F49D37'
                size={48}
                style={styles.arrowLeft}
                />
            </TouchableOpacity>
        {display}
        <TouchableOpacity onPress={this.goBack} style={styles.icon}>
            <Icon
              name='arrow-circle-left'
              type='font-awesome'
              color='#F49D37'
              size={50}
              iconStyles={styles.backButton}/>
          </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  favoritesContainer: {
    // backgroundColor: '#E5E5E5',
    flex: 1,
    top: 200
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
    // width: '96%',
  },
  arrowLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    marginTop: 20
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#048BA8',
    marginLeft: 20,
    // marginRight: 230
  },
  arrowRight: {
    position: 'absolute',
    right: 10
  },
  delete: {
    marginLeft: 10
  },
  noFavesMessage: {
    fontSize: 40,
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: 'white',
    position: 'relative',
    top: -10,
    // height: 40,
    // left: 10,
    textAlign: 'center',
    zIndex: 4,
    marginLeft: 10
  },
  icon: {
    backgroundColor: '#048BA8',
    position: 'absolute',
    bottom: -250,
  },
  backButton: {
    textAlign: 'center'
  }
});
