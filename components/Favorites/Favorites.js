import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchFavorites()
    
  }

  render() {
    // this.props.favorites.map((favoritePet) => {

    // })
    return(
      <View>
        <Text>Favorites!</Text>
      </View>
    )
  }
}

