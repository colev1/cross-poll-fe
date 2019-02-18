import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons'



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
      errorMessage: '',
      selectedOption: 'sign up'
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
      newUser: false,
      error: false,
      errorMessage: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  toggleSignUp = () => {
    this.setState({
      newUser: true,
      error: false,
      errorMessage: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  setSelected = (selectedOption) => {
    this.setState({
      selectedOption
    })
  }

  renderOption = (option, selected, onSelect, index) => {
    const selectedRadio = selected ? styles.selectedRadio : styles.unselectedRadio
    const selectedText = selected ? styles.selectedText : styles.unselectedText
    return (
      <TouchableOpacity onPress={onSelect} key={index} style={selectedRadio} >
        <Text style={selectedText}>{option}</Text>
      </TouchableOpacity>
    )
  }

  renderContainer = (optionNodes) => {
    return (<View style={styles.radioButtons}>
        {optionNodes}
          </View>)
  }

  render() {
    const selectOptions = ["sign in", "sign up"]

    return (
      <View style={styles.form}>
        <Text style={styles.title} >  AdoptR </Text>
          <RadioButtons
                style={styles.radioButtons}
                options={ selectOptions }
                onSelection={ this.setSelected }
                selectedOption={this.state.selectedOption }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
        <TextInput 
          style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
          placeholder='first name'
          autoCapitalize={"none"}
          value={this.state.firstName}
          onChangeText={(value) => this.setState({firstName: value})}
        />
        <TextInput 
          style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
          placeholder='last name'
          autoCapitalize={"none"}
          value={this.state.lastName}
          onChangeText={(value) => this.setState({lastName: value})}
        />
        <TextInput 
          type='email'
          autoCapitalize={"none"}
          style={styles.input}
          placeholder='email'
          value={this.state.email}
          onChangeText={(value) => this.setState({email: value})}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='password'
          autoCapitalize={"none"}
          value={this.state.password}
          onChangeText={(value) => this.setState({password: value})}
        />
        <TextInput
          style={this.state.selectedOption === 'sign up' ? styles.input : styles.hidden}
          secureTextEntry={true}
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
    paddingTop: 200,
    paddingBottom: 100
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
    position: 'absolute',
    top: 60,
    zIndex: 3
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
    position: 'absolute',
    bottom: 50,
  },
  submitButtonText: {
    fontSize: 60,
    textAlign: 'center',
  },
  selectedText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 28
  },
  unselectedText: {
    fontSize: 28,
  },
  radioButtons: {
    display: 'flex',
    flexDirection: 'row',
    width: 260,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 160,
    zIndex: 2
  }
});