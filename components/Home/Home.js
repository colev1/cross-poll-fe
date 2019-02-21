import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import APIkey from '../apiKey';
import { cleanPets } from '../helpers/helpers';
import Pet from '../Pet/Pet';
import Filter from '../Filter/Filter';
import { cleanShelters } from '../helpers/helpers';
import Favorites from '../Favorites/Favorites';
import Error from '../Error/Error'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPets: [],
      petIndex: 0,
      gesture: '',
      showInfo: false,
      showFilter: false,
      shelterName: '',
      userZipCode: '',
      showFavorites: false,
      favorites: [],
      loading: true,
      error: false,
      shelter: {},
      cleanedFaves: []
    }
  }

  componentDidMount() {
    this.fetchUserZip()
    this.fetchFavorites()
  }

  displayError = () => {
    this.setState({
      error: true
    })
  }

  fetchUserZip = () => {
    fetch('https://adoptr-be.herokuapp.com/api/v1/locations')
      .then(response => response.json())
      .then(result => this.fetchByZipCode(result))
      .catch(error => this.displayError())
  }


  fetchByZipCode = (result) => {
    const url = `http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=${result.zip_code}&count=50`
    this.setState({
      userLocation: {
        latitude: result.latitude,
        longitude: result.longitude,
        zip_code: result.zip_code
      }
    })
    this.fetchAllAnimals(url);
  }

  fetchAllAnimals = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(pets => cleanPets(pets.petfinder.pets.pet))
      .then(cleanPets => this.setState({allPets: cleanPets}))
      .then(cleanPets => this.fetchShelter())
      .catch(error => this.displayError())
  }

  fetchByFilters = (filterChoices) => {
    const { selectedAnimal, selectedSize } = filterChoices;
    let gender;
    switch(filterChoices.selectedGender) {
      case 'male':
        gender = 'M'
      break;
      case 'female':
        gender = 'F'
      break;
      default:
        gender = ''
    }
    const url = `http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=${this.state.userLocation.zip_code}&animal=${selectedAnimal}&size=${selectedSize}&sex=${gender}`

    this.fetchAllAnimals(url)
    this.setState({showFilter: false})
  }

  fetchShelter = () => {
    const { allPets, petIndex } = this.state;
    let shelterId = allPets[petIndex].shelterId;
    fetch(`http://api.petfinder.com/shelter.get?format=json&key=${APIkey}&id=${shelterId}`)
    .then(response => response.json()) 
    .then(shelter => cleanShelters(shelter.petfinder.shelter))
    .then(cleanShelter => this.setState({shelter: cleanShelter, loading: false}))
    .catch(error => this.displayError())
  }

  addToFavorites = (petId) => {
    const postBody = {
      api_token: this.props.userAPIToken,
      favorite_id: petId
    }
    fetch(`https://adoptr-be.herokuapp.com/api/v1/favorites?api_token=${this.props.userAPIToken}`, {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => this.fetchFavorites())
    .catch(error => this.displayError())
    }

    
  fetchFavorites = () => {
    fetch(`https://adoptr-be.herokuapp.com/api/v1/favorites?api_token=${this.props.userAPIToken}`)
    .then(response => response.json())
    .then(favorites => this.setState({favorites: favorites.data}))
    .then(result => this.displayFaves())
    .catch(error => this.displayError())
  }

  getFavoriteIds = (allFaves) => {
    return allFaves.map(favorite => {
     return fetch(`http://api.petfinder.com/pet.get?format=json&key=${APIkey}&id=${favorite.attributes.favorite_id}`)
      .then(response => response.json())
      .then(result => this.setState({favorites: [...this.state.favorites, [result.petfinder.pet.name.$t]]}))
    })
  }

  displayFaves = async () => {
    
    const pets = await this.state.favorites.map(async favorite => {
      try {
      let url = `http://api.petfinder.com/pet.get?format=json&key=${APIkey}&id=${favorite.attributes.favorite_id}`
      console.log('the url', url)
      const response = await fetch(url)
      return response.json()
      } catch(err) {
        console.log(err)
      }
    })
    const finalPets = await Promise.all(pets)
    const cleanedPets = this.cleanPets(finalPets)
    this.setState({cleanedFaves: cleanedPets})
  }

  cleanPets = (pets) => {
    const realPets = pets.filter(pet => {
        return pet.petfinder.pet
    })
    return realPets.map(currPet => currPet.petfinder.pet)
  }

  changePet = (gesture) => {
    if (this.state.petIndex > 48) {
      this.setState({
        petIndex: 0
      })
    } else {
      let newState = this.state.petIndex = this.state.petIndex + 1
      this.setState({
        petIndex: newState
      })
    }
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  showFilter = () => {
    this.setState({
      showFilter: true
    })
 }               

  showFavorites = () => {
    this.setState({
      showFavorites: true
    })
    this.fetchFavorites()
  }

  returnHome = () => {
    this.setState({
      showInfo: false,
      showFavorites: false
    })
  }

  
  render() {
   const { allPets, petIndex, showInfo, showFilter, shelter, showFavorites, favorites } = this.state;
   const { userAPIToken, signOut } = this.props;
   if(this.state.error) {
     return (
       <Error />
     )
   }
    if(!showFilter && !showInfo && !showFavorites) {
      return (
         <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} 
          loading={this.state.loading}
          showInfo={this.state.showInfo}
          showFilter={this.showFilter}
          fetchShelter={this.fetchShelter} 
          shelter={shelter}
          returnHome={this.returnHome}
          addToFavorites={this.addToFavorites}
          userAPIToken={this.props.userAPIToken}
          showFavorites={this.showFavorites}
          userLocation={this.state.userLocation}
          displayError={this.displayError}
          />
          <TouchableOpacity onPress={this.showInfo}
              style={this.state.loading ? styles.hidden : styles.infoButton}>
            <Text style={styles.infoButtonText}> more information
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else if (showFilter) {
      return (
      <View style={styles.homeContainer}>
        <Filter showFilter={showFilter} fetchByFilters={this.fetchByFilters} signOut={signOut} />
      </View>
      )
    } else if (showInfo) {
      return (
      <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} showInfo={this.state.showInfo} shelter={shelter}
          userAPIToken={this.props.userAPIToken}
          userLocation={this.state.userLocation}
          returnHome={this.returnHome}
          showFavorites={this.showFavorites}
          displayError={this.displayError}/>
        </View>
      )
    } else if (showFavorites) {
      return (
        <View style={styles.favoritesContainer}>
          <Favorites fetchFavorites={this.fetchFavorites} favorites={favorites} userAPIToken={userAPIToken} cleanedFaves={this.state.cleanedFaves} displayFaves={this.displayFaves}
          returnHome={this.returnHome} 
          loading={this.state.loading}
          displayError={this.displayError} />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  infoButton: {
    backgroundColor: '#048BA8',
      borderRadius: 16,
      shadowColor: 'black',
      shadowOffset: { width: 1, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 4,
  },
  hidden: {
    display: 'none'
  },
  arrowDown: {
    color: 'white',
    margin: 0
  },
  infoButtonText: {
    fontSize: 28,
      padding: 16,
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Kohinoor Bangla',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  filter: {
    backgroundColor: 'blue'
  },
  backButton: {
    marginTop: 5
  },
  favoritesContainer: {
    marginTop: 100
  }
});