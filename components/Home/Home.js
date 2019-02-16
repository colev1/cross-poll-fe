import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import APIkey from '../apiKey';
import { cleanPets } from '../helpers/helpers';
import Pet from '../Pet/Pet';
import Filter from '../Filter/Filter';
import {swipeDirections} from 'react-native-swipe-gestures';
import { cleanShelters } from '../helpers/helpers';
import { Icon } from 'react-native-elements';
import Favorites from '../Favorites/Favorites';

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
      shelter: {},
      showFavorites: false
    }
  }

  componentDidMount() {
    this.fetchUserZip()
  }

  fetchUserZip = () => {
    fetch('https://adoptr-be.herokuapp.com/api/v1/locations')
      .then(response => response.json())
      .then(result => this.fetchByZipCode(result.zip_code))
      .catch(error => console.log(error))
  }

  fetchByZipCode = (zipCode) => {
    const url = `http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=${zipCode}`
    this.setState({
      userZipCode: zipCode
    })
    this.fetchAllAnimals(url);
  }

  fetchAllAnimals = (url) => {
    fetch(url)
      .then(response => response.json())
      .then(pets => cleanPets(pets.petfinder.pets.pet))
      .then(cleanPets => this.setState({allPets: cleanPets}))
      .then(cleanPets => this.fetchShelter())
      .catch(error => console.log(error))
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
    const url = `http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=${this.state.userZipCode}&animal=${selectedAnimal}&size=${selectedSize}&sex=${gender}`
    this.fetchAllAnimals(url)
    this.setState({showFilter: false})
  }

  fetchShelter = () => {
    const { allPets, petIndex } = this.state;
    let shelterId = allPets[petIndex].shelterId;
    fetch(`http://api.petfinder.com/shelter.get?format=json&key=${APIkey}&id=${shelterId}`)
    .then(response => response.json()) 
    .then(shelter => cleanShelters(shelter.petfinder.shelter))
    .then(cleanShelter => this.setState({shelter: cleanShelter}))
    .catch(error => console.log(error))
  }

  changePet = (gesture) => {
    let newState = this.state.petIndex = this.state.petIndex + 1
    this.setState({
      petIndex: newState
    })
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
                  
  goBack = () => {
    this.setState({
      showInfo: false
    })
  }

  showFavorites = () => {
    console.log('favorites!')
    this.setState({
      showFavorites: true
    })
  }
  
  render() {
   const { allPets, petIndex, showInfo, showFilter, shelter, showFavorites } = this.state;
   const { addToFavorites, userAPIToken } = this.props;
    if(!showFilter && !showInfo && !showFavorites) {
      return (
         <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} 
          showInfo={this.state.showInfo}
          showFilter={this.showFilter}
          fetchShelter={this.fetchShelter} 
          shelter={shelter}
          addToFavorites={addToFavorites}
          userAPIToken={userAPIToken}
          showFavorites={this.showFavorites}/>
          <TouchableOpacity onPress={this.showInfo}
              style={styles.infoButton}>
            <Text style={styles.infoButtonText}> more information
              {/* <Icon
                name='angle-down'
                type='font-awesome'
                />  */}
            </Text>
          </TouchableOpacity>
        </View>
      )
    } else if (showFilter) {
      return (
      <View style={styles.homeContainer}>
        <Filter showFilter={showFilter} fetchByFilters={this.fetchByFilters} />
      </View>
      )
    } else if (showInfo) {
      return (
      <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} showInfo={this.state.showInfo} shelter={shelter}/>
          <TouchableOpacity onPress={this.goBack}
              style={styles.backButton}
            >
            <Icon
              name='arrow-circle-left'
              type='font-awesome'
              color='#F49D37'/>
          </TouchableOpacity>
        </View>
      )
    } else if (showFavorites) {
      return (
        <View>
          <Favorites />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  infoButton: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 24,
    borderWidth: 2,
    width: 300,
  },
  infoButtonText: {
    fontSize: 30,
    textAlign: 'center',
  },
  homeContainer: {
    
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },
  filter: {
    backgroundColor: 'blue'
  }
});