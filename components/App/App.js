import React from 'react';
import  Login  from '../Login/Login';
import Home from '../Home/Home'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
      userAPIToken: '',
      userZipCode: ''
    }
  }

  componentDidMount = () => {
    // fetch('https://adoptr-be.herokuapp.com/api/v1/locations')
    //   .then(response => response.json())
    //   .then(result => this.setState({userZipCode: result.zip_code}))
    //   .catch(error => console.log(error))
  }

  showLogin = () => {
    this.setState({showLogin: !this.state.showLogin})
  }

  updateUserToken = (token) => {
    this.setState({userAPIToken: token})
    this.showLogin()
  }

  render() {
    const { showLogin } = this.state;
    let displayComponent;
    if (showLogin) {
       displayComponent = <Login 
       showLogin={this.showLogin}
       updateUserToken={this.updateUserToken}/>
    } else {
      displayComponent = <Home showLogin={this.showLogin} userZipCode={this.state.userZipCode}/>
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
    // backgroundColor: '#fff',
    backgroundColor: '#048BA8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
