import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  
  render() {
    return ( 
      <View>
        <Button title = 'go to login'
        onPress={this.props.showLogin}/>
      </View>
    )
  }
}