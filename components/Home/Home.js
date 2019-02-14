import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import APIkey from '../apiKey';
import { cleanPets } from '../helpers/helpers';
import Pet from '../Pet/Pet';
import Filter from '../Filter/Filter';
import {swipeDirections} from 'react-native-swipe-gestures';
import { cleanShelters } from '../helpers/helpers';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPets: [],
      petIndex: 0,
      gesture: '',
      showInfo: false,
      showFilter: false,
      shelterName: ''
    }
  }

  componentDidMount() {
    fetch(`http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=80202`)
    .then(response => response.json())
    .then(pets => cleanPets(pets.petfinder.pets.pet))
    .then(cleanPets => this.setState({allPets: cleanPets}))
    .then(cleanPets => this.fetchShelter())
    .catch(error => console.log(error))
  }

  fetchShelter = () => {
    const { allPets, petIndex } = this.state;
    let shelterId = allPets[petIndex].shelterId;
    console.log('id', shelterId)
    fetch(`http://api.petfinder.com/shelter.get?format=json&key=${APIkey}&id=${shelterId}`)
    .then(response => response.json()) 
    .then(shelter => cleanShelters(shelter.petfinder.shelter))
    .then(cleanShelter => this.setState({shelterName: cleanShelter.name}))
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
  )}
 }               
                  
  goBack = () => {
    this.setState({
      showInfo: false
    })
  }
  
  render() {
   const { allPets, petIndex, showInfo, showFilter, shelterName } = this.state;
    if(!showFilter && !showInfo) {
      return (
         <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} 
          showInfo={this.state.showInfo}
          showFilter={this.showFilter}
          fetchShelter={this.fetchShelter} 
          shelterName={shelterName}/>
          <TouchableOpacity onPress={this.showInfo}
              style={styles.infoButton}>
            <Text style={styles.infoButtonText}> more information </Text>
          </TouchableOpacity>
        </View>
      )
    } else if (showFilter) {
      return (
      <View style={styles.homeContainer}>
        <Filter showFilter={showFilter} />
      </View>
      )
    } else if (showInfo) {
      return (
      <View style={styles.homeContainer}>
          <Pet pet={allPets[petIndex]} changePet={this.changePet} showInfo={this.state.showInfo} shelterName={shelterName}/>
          <TouchableOpacity onPress={this.goBack}
              style={styles.infoButton}
            >
              <Text style={styles.infoButtonText}> go back </Text>
          </TouchableOpacity>
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
    marginBottom: 40,
  },
  filter: {
    backgroundColor: 'blue'
  }
});