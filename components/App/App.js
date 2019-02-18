import React from 'react';
import  Login  from '../Login/Login';
import Home from '../Home/Home'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogin: true,
      userAPIToken: '',
      userZipCode: ''
    }
  }

  showLogin = () => {
    this.setState({showLogin: !this.state.showLogin})
  }

  updateUserToken = (token) => {
    this.setState({userAPIToken: token})
    this.showLogin()
  }

 

  render() {
    const { showLogin, userAPIToken } = this.state;
    let displayComponent;
    if (showLogin) {
       displayComponent = <Login 
       showLogin={this.showLogin}
       updateUserToken={this.updateUserToken}/>
    } else {
      displayComponent = <Home showLogin={this.showLogin} userZipCode={this.state.userZipCode} addToFavorites={this.addToFavorites} userAPIToken={userAPIToken}/>
    }
    return (
      <View style={styles.container}>
        {displayComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Verdana',
    backgroundColor: '#048BA8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
