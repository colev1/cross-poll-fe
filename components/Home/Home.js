import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import APIkey from '../apiKey';
import cleanPets from '../helpers/helpers';
import Pet from '../Pet/Pet';
import {swipeDirections} from 'react-native-swipe-gestures';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allPets: [],
      petIndex: 0,
      gesture: ''
    }
  }

  componentDidMount() {
    fetch(`http://api.petfinder.com/pet.find?format=json&key=${APIkey}&location=80202`)
    .then(response => response.json())
    .then(pets => cleanPets(pets.petfinder.pets.pet))
    .then(cleanPets => this.setState({allPets: cleanPets}))
    .then(result => console.log(result))
  }

  changePet = (gesture) => {
    let newState = this.state.petIndex = this.state.petIndex + 1
    this.setState({
      petIndex: newState
    })
  }
  
  render() {
    const { allPets, petIndex } = this.state;
    return ( 
      <View>
        <Pet pet={allPets[petIndex]} changePet={this.changePet}/>
      </View>
    )
  }
}