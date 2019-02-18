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

  componentDidMount() {
   
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
           <View key={favoritePet.id}>
            <TouchableOpacity onPress={() => this.deleteFavorite(favoritePet.id)}>
              <Icon
                name='minus-circle'
                type='font-awesome'
                color='red'
                />
            </TouchableOpacity>
            <Text>{favoritePet.name}</Text>
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

  }
});

