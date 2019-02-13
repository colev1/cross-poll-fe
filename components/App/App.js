import React from 'react';
import  Login  from '../Login/Login';
import Home from '../Home/Home'
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      showLogin: false
    }
  }

  showLogin = () => {
    this.setState({showLogin: true})
  }

  render() {
    const { showLogin } = this.state;
    let displayComponent;
    if(showLogin) {
       displayComponent = <Login />
    } else {
      displayComponent = <Home showLogin={this.showLogin}/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
