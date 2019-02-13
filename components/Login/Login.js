import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';


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

  submitNewUser = (state) => {
    console.log(state)
  }
  
  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.title}>  ADOPTR </Text>
        <TextInput 
          style={styles.input}
          placeholder='first name'
          value={this.state.firstName}
          onChangeText={(value) => this.setState({firstName: value})}
        />
        <TextInput 
          style={styles.input}
          placeholder='last name'
          value={this.state.lastName}
          onChangeText={(value) => this.setState({lastName: value})}
        />
        <TextInput 
          style={styles.input}
          placeholder='username'
          value={this.state.username}
          onChangeText={(value) => this.setState({username: value})}
        />
        <TextInput
          style={styles.input}
          placeholder='password'
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <Button title='submit' onPress={()=>this.submitNewUser(this.state)} /> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: 'blue',
    fontSize: 60,
    width: '100%',
    height: '90%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    fontSize: 48
  },
  title: {
    fontSize: 64,
    color: 'white'
  }
});