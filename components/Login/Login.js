import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';


export default class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: true,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: '',
      error: true,
      errorMessage: ''
    }
  }

  submitUser = () => {
    if(this.state.newUser) {
      this.submitNewUser()
    } else {
      this.submitExistingUser()
    }
  }

  submitExistingUser = () => {
    const { email, password } = this.state;
    const postBody = {
      email,
      password
    }
    fetch('https://adoptr-be.herokuapp.com/api/v1/sessions', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json())
    .then( result => this.checkForError(result))
    .catch(error => console.log(error))
  }

  checkForError = (result) => {
    if(result.error) {
      this.setState({
        error: true,
        errorMessage: result.error
      })
    } else {
      this.props.updateUserToken(result.data.attributes.api_token)
    }
  }

  submitNewUser = () => {
    const { firstName, lastName, email, password, passwordConfirmation } = this.state;
    const postBody = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirmation: passwordConfirmation
    }
    fetch('https://adoptr-be.herokuapp.com/api/v1/users', {
      method: 'POST',
      body: JSON.stringify(postBody),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json())
    .then( result => this.checkForError(result))
    .catch(error => console.log(error))
  }
  
  toggleLogin = () => {
    this.setState({
      newUser: !this.state.newUser
    })
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.title}>  ADOPTR </Text>
          <TouchableOpacity onPress={this.toggleLogin}
            style={styles.signInButton}
          >
            <Text style={styles.buttonText}> sign in </Text>
          </TouchableOpacity> 
          <TouchableOpacity  onPress={this.toggleLogin}
          style={styles.signUpButton}>
          <Text style={styles.buttonText}> sign up </Text>
          </TouchableOpacity > 
        <TextInput 
          style={this.state.newUser ? styles.input : styles.hidden}
          placeholder='first name'
          value={this.state.firstName}
          onChangeText={(value) => this.setState({firstName: value})}
        />
        <TextInput 
          style={this.state.newUser ? styles.input : styles.hidden}
          placeholder='last name'
          value={this.state.lastName}
          onChangeText={(value) => this.setState({lastName: value})}
        />
        <TextInput 
          style={styles.input}
          placeholder='email'
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput
          style={styles.input}
          placeholder='password'
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <TextInput
          style={this.state.newUser ? styles.input : styles.hidden}
          placeholder='confirm password'
          value={this.state.passwordConfirmation}
          onChangeText={(value) => this.setState({passwordConfirmation: value})}
        />
        <Text style={this.state.error ? styles.errorMessage : styles.hidden}>
          {this.state.errorMessage}
        </Text>
        <TouchableOpacity
        style={styles.button}
        onPress={()=>this.submitUser()} > 
          <Text style={styles.submitButtonText}  > 
          submit 
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  signInButtonsContainer: {
    alignItems: 'center',
    color: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 32
  },
  form: {
    backgroundColor: '#048BA8',
    fontSize: 60,
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 24,
    borderStyle: 'solid',
    borderWidth: 2,
    fontSize: 32,
    height: 66,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'center',
    width: 360,
  },
  title: {
    fontSize: 64,
    color: 'white',
  },
  hidden: {
    display: 'none'
  },
  button: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 24,
    borderWidth: 2,
    width: 300,
  },
  submitButtonText: {
    fontSize: 60,
    textAlign: 'center',
  }
});