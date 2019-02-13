import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';


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
        <TouchableOpacity
        style={styles.button}
        onPress={()=>this.submitNewUser(this.state)} > 
        <Text style={styles.buttonText}  > 
        submit 
        </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#048BA8',
    fontSize: 60,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    fontSize: 48,
    backgroundColor: 'white',
    shadowColor: '#000',
    width: 360,
    height: 80,
    textAlign: 'center',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
  },
  title: {
    fontSize: 64,
    color: 'white'
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 2,
    width: 300,
  },
  buttonText: {
    fontSize: 60,
    textAlign: 'center'
  }
});