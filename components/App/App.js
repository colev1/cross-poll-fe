import React from 'react';
import  Login  from '../Login/Login';
import Home from '../Home/Home'
import FlashMessage from "react-native-flash-message";
import { StyleSheet, View } from 'react-native';


export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogin: true,
      userAPIToken: '',
      userZipCode: '',
      userLocation: {}
    }
  }

  showLogin = () => {
    this.setState({showLogin: !this.state.showLogin})
  }

  updateUserToken = (token) => {
    this.setState({userAPIToken: token})
    this.showLogin()
  }

  addToFavorites = (petId) => {
    const postBody = {
      apiToken: this.state.userAPIToken,
      favoriteId: petId
    }

    fetch('https://adoptr-be.herokuapp.com/api/v1/favorites', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log(error))
  }

  signOut = () => {
    this.setState({
      showLogin: true
    })
  }

  render() {
    const { showLogin, userAPIToken } = this.state;
    let displayComponent;
    if (showLogin) {
       displayComponent = <Login 
       showLogin={this.showLogin}
       updateUserToken={this.updateUserToken}/>
    } else {
      displayComponent = <Home showLogin={this.showLogin} addToFavorites={this.addToFavorites} userAPIToken={userAPIToken}
      userLocation={this.state.userLocation}
      signOut={this.signOut}/>
    }
    return (
      <View style={styles.container}>
        {displayComponent}
        <FlashMessage position="top" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Verdana',
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
