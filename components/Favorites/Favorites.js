import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ImageBackground, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      reRender: false
    })
  }

  showInfo = (petId) => {

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
    .then(result => this.props.fetchFavorites())
    .catch(error => console.log(error))
  }
  

  render() {
    const { favorites } = this.props;
    let display;
    if (favorites.length === 0) {
      display = <Text>You don't have any favorites!</Text>
    } else {
      display = favorites.map((favoritePet) => {
         return (
           <View key={favoritePet.id} style={styles.favoritePetContainer}>
            <TouchableOpacity onPress={() => this.deleteFavorite(favoritePet.id)}>
              <Icon
                name='minus-circle'
                type='font-awesome'
                color='#E74544'
                style={styles.delete}
                />
            </TouchableOpacity>
            <Text style={styles.name}>{favoritePet.name}</Text>
            <TouchableOpacity onPress={() => this.showInfo(favoritePet.id)}>
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

