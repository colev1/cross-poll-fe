import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';


export default class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      firstName: '',
      lastName: '',
      password: ''
    }
  }
  
  render() {
    return (
      <View>
        <TextInput 
          placeholder='first name'
          value={this.state.firstName}
          onChangeText={(value) => this.setState({firstName: value})}
        />
        <TextInput 
          placeholder='last name'
          value={this.state.lastName}
          onChangeText={(value) => this.setState({lastName: value})}
        />
        <TextInput 
          placeholder='username'
          value={this.state.username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput 
          placeholder='password'
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <Text> {this.state.username} </Text>
      </View>
    )
  }
}