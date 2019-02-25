import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import APIkey from '../apiKey';
import { cleanPets } from '../helpers/helpers';
import Pet from '../Pet/Pet';
import Filter from '../Filter/Filter';
import { cleanShelters } from '../helpers/helpers';
import Favorites from '../Favorites/Favorites';
import Error from '../Error/Error'
import { APIcalls } from '../APIcalls/APIcalls';
import Nav from '../Nav/Nav'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPets: [],
      cleanedFaves: [],
      error: false,
      favorites: [],
      gesture: '',
      loading: true,
      loadingFaves: false,
      petIndex: 0,
      shelter: {},
      shelterName: '',
      showFavorites: false,
      showFilter: false,
      showInfo: false,
      userZipCode: '',
      displayedComponent: 'home'
    }
  }

  componentDidMount() {
    this.fetchUserZip()
    this.fetchFavorites()
  }

  displayError = () => {
    this.setState({
      error: true,
      displayedComponent: 'error',
    })
  }

  fetchUserZip = async () => {
    try {
      const response = await fetch('https://adoptr-be.herokuapp.com/api/v1/locations')
      const result = await response.json()
      return this.fetchByZipCode(result)
    } catch(err) {
      this.displayError()     
    }
  }

  loadDelete = () => {
    this.setState({
      loadingFaves: true
    })
  }

  unLoadDelete = () => {
    this.setState({
      loadingFaves: false
    })
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

  fetchAllAnimals = async (url) => {
    try {
      const response = await fetch(url)
      const pets = await response.json()
      const cleanedPets = cleanPets(pets.petfinder.pets.pet)
      this.setState({ allPets: cleanedPets })
      this.fetchShelter()
    } catch(error) {
      this.displayError()
    }
  }

  fetchByFilters = (filterChoices) => {
    const { selectedAnimal, selectedSize } = filterChoices;
    let gender;
    switch (filterChoices.selectedGender) {
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
    this.setState({ showFilter: false })
  }

  fetchShelter = () => {
    const { allPets, petIndex } = this.state;
    let shelterId = allPets[petIndex].shelterId;
    fetch(`http://api.petfinder.com/shelter.get?format=json&key=${APIkey}&id=${shelterId}`)
      .then(response => response.json())
      .then(shelter => cleanShelters(shelter.petfinder.shelter))
      .then(cleanShelter => this.setState({ shelter: cleanShelter, loading: false }))
      .catch(error => this.displayError())
  }

  addToFavorites = async (petId) => {
    try {
      const postBody = {
        api_token: this.props.userAPIToken,
        favorite_id: petId
      }

      const response = await fetch(`https://adoptr-be.herokuapp.com/api/v1/favorites?api_token=${this.props.userAPIToken}`, {
        method: 'POST',
        body: JSON.stringify(postBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      await response.json()
      this.fetchFavorites()
    } catch(error) {
      this.displayError()
    }
  }


  fetchFavorites = async () => {
    try {
      const response = await fetch(`https://adoptr-be.herokuapp.com/api/v1/favorites?api_token=${this.props.userAPIToken}`)
      const favorites = await response.json()
      this.setState({favorites: favorites.data})
      this.displayFaves()
    } catch(error) {
      this.displayError()
    }
  }

  displayFaves = async () => {
    this.setState({ loadingFaves: true })
    const pets = await this.state.favorites.map(async favorite => {
      try {
        let url = `http://api.petfinder.com/pet.get?format=json&key=${APIkey}&id=${favorite.attributes.favorite_id}`
        const response = await fetch(url)
        return response.json()
      } catch (err) {
        console.log(err)
      }
    })
    const finalPets = await Promise.all(pets)
    const cleanedPets = this.cleanPets(finalPets)
    this.setState({
      cleanedFaves: cleanedPets,
      loadingFaves: false
    })
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

  displayInfo = () => {
    this.setState({
      showInfo: true,
      displayedComponent: 'info'
    })
  }

  showFilter = () => {
    this.setState({
      showFilter: true,
      displayedComponent: 'filter'
    })
  }

  displayFavorites = () => {
    this.setState({
      showFavorites: true,
      displayedComponent: 'favorites'
    })
    this.fetchFavorites()
  }

  returnHome = () => {
    this.setState({
      displayedComponent: 'home',
      showInfo: false,
      showFavorites: false
    })
  }

  emailShelter = (name) => {
    let message = `I am hoping to schedule a meet and greet with ${name} and would love to get in contact with you to schedule a time to do that. I look forward to hearing from you!`
    let postBody = {
      api_token: this.props.userAPIToken,
      shelter_email: 'colevanacore@gmail.com',
      pet_name: name,
      message: message
    }
    fetch('https://adoptr-be.herokuapp.com/api/v1/shelter_notifier', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }

  sendText = (textObj) => {
    const { recipient_phone, pet_name, shelter_name, pet_id } = textObj;
    let postBody = {
      api_token: this.props.userAPIToken,
      recipient_phone,
      pet_name,
      shelter_name,
      pet_id
    }
    fetch('https://adoptr-be.herokuapp.com/api/v1/texts', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => console.log('text sent', result))
      .catch(error => console.log(error))
  }


  render() {
    const { allPets, petIndex, showInfo, showFilter, shelter, showFavorites, favorites } = this.state;
    const { userAPIToken, signOut } = this.props;

    let display;
    
    switch(this.state.displayedComponent) {
      case 'error':
        display = <Error />
        break;
      case 'filter': 
        display = (<Filter 
        showFilter={showFilter} 
        fetchByFilters={this.fetchByFilters} 
        signOut={signOut} />)
        break;
      case 'info':
        display =  (<Pet 
        pet={allPets[petIndex]} 
        changePet={this.changePet} 
        showInfo={this.state.showInfo} 
        shelter={shelter}
        displayInfo={this.displayInfo}
        userAPIToken={this.props.userAPIToken}
        userLocation={this.state.userLocation}
        returnHome={this.returnHome}
        showFavorites={this.showFavorites}
        displayError={this.displayError}
        sendText={this.sendText}
        emailShelter={this.emailShelter} />)
        break;
      case 'favorites':
        display = (<Favorites 
          fetchFavorites={this.fetchFavorites} 
          favorites={favorites} 
          userAPIToken={userAPIToken} 
          cleanedFaves={this.state.cleanedFaves}   
          displayFaves={this.displayFaves}
          returnHome={this.returnHome}
          loading={this.state.loading}
          loadDelete={this.loadDelete}
          unLoadDelete={this.unLoadDelete}
          displayError={this.displayError}
          loadingFaves={this.state.loadingFaves}
          sendText={this.sendText}
          emailShelter={this.emailShelter} />)
        break;
      default:
      display = (<Pet pet={allPets[petIndex]} changePet={this.changePet}
      loading={this.state.loading}
      sendText={this.sendText}
      emailShelter={this.emailShelter}
      displayInfo={this.displayInfo}
      showInfo={this.state.showInfo}
      showFilter={this.showFilter}
      fetchShelter={this.fetchShelter}
      shelter={shelter}
      returnHome={this.returnHome}
      addToFavorites={this.addToFavorites}
      userAPIToken={this.props.userAPIToken}
      userLocation={this.state.userLocation}
      displayError={this.displayError}
    />)
      break;
    }

    return (
      <View style={styles.homeContainer}>
        {display}
        <Nav showFavorites={this.state.showFavorites}
            displayFavorites={this.displayFavorites}
            returnHome={this.returnHome}
            showFilter={this.showFilter}
            showInfo={this.state.showInfo} />
      </View>
    )
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
    marginBottom: 200,
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
    marginTop: 60,
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