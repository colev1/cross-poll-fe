import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import Loading from '../Loading/Loading';
import { Icon } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";
import { LinearGradient } from 'expo';

export default class PetInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sendText: false,
      recipientPhone: ''
    }
  }

  sendText = () => {
    let { name, id } = this.props.pet;
    let textObj = {
      recipient_phone: this.state.recipientPhone,
      pet_name: name,
      shelter_name: this.props.shelter.name,
      pet_id: id
    }
    showMessage({
      message: "Success!",
      description: `Text message sent to ${this.state.recipientPhone}`,
      type: "success",
      floating: true
    });
    this.setState({ sendText: false })
    this.props.sendText(textObj)
  }

  emailShelter = () => {
    showMessage({
      message: "Success!",
      description: `Email sent to ${this.props.shelter.name}`,
      type: "success",
      floating: true
    });
    this.props.emailShelter(this.props.pet.name)
  }

  render() {
    if (this.props.loading) {
      return <Loading />
    }
    if (this.props.pet && this.props.shelter) {
      const { name, breed, age, description, photos, shelterId } = this.props.pet;
      const { shelter } = this.props;

      let image;
      if(photos[7]) {
        image = photos[7]
      } else {
        image=photos[2]
      }
      return (
        <View style={styles.petInfoContainer}>
          <Modal
            transparent={true}
            animationType="slide"
            visible={this.state.sendText}
            style={styles.textModal}
            onBackdropPress={() => this.setState({ sendText: false })}
          >
            <Text style={styles.textFriends}>
              Send a text about {name}!
                </Text>
            <TextInput
              style={styles.inputNumber}
              title='enter number'
              placeholder='0000000000'
              autoCapitalize={"none"}
              value={this.state.recipientPhone}
              onChangeText={(value) => this.setState({ recipientPhone: value })}
            >
            </TextInput>
            <TouchableOpacity
              style={styles.sendTextBtn}
              onPress={this.sendText}>
              <Text style={styles.sendButtonText}> send text </Text>
            </TouchableOpacity>
          </Modal>
          <ImageBackground source={{ uri: image }}
            style={styles.moreInfoImage}
            imageStyle={styles.borderRad}>
            <LinearGradient colors={['rgba(0,0,0,0)','rgba(0,0,0,.2)', 'rgba(0,0,0,1)']} style={styles.gradient}></LinearGradient>
            <View style={styles.titlesContainer}>
              <Text style={styles.petName}> {name} </Text>
              <Text style={styles.petDescription}>{breed}</Text>
              <Text style={styles.petDescription}>{age}</Text>
            </View>
          </ImageBackground>
          <View style={styles.shelterInfo}>
            <Text style={styles.canBeFound}>
              {shelter.name}
            </Text>
            <Text style={styles.phone}>{shelter.phone}</Text>
            <Text style={styles.cityStateZip}>{shelter.city}, {shelter.state} - {shelter.zip}</Text>
          </View>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={this.emailShelter}>
            <Icon
            name='envelope'
            type='font-awesome'
            size={40}
            iconStyle={styles.text}
          />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => this.setState({
              sendText: true
            })}>
            <Icon
            name='comment'
            type='font-awesome'
  
            size={40}
            iconStyle={styles.email}
          />
          </TouchableOpacity>
        </View>
      )
    } else {
      return <Loading />
    }
  }
}

const styles = StyleSheet.create({
  petInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50
  },
  modalContainer: {
    paddingTop: 100
  },
  petName: {
    textAlign: 'left',
    color: 'white',
    marginBottom: 0,
    fontFamily: 'Kohinoor Bangla',
    fontSize: 36,
    fontWeight: 'bold'
  },
  image: {
    height: 600,
    width: 400,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  moreInfoImage: {
    marginTop: -10,
    height: 520,
    width: 400,
  },
  inputNumber: {
    backgroundColor: 'white',
    color: '#F49D37',
    fontSize: 36,
    width: 240,
    borderRadius: 16,
    fontFamily: 'Kohinoor Bangla',
  },
  borderRad: {
    borderRadius: 30,
  },
  textModal: {
    position: 'absolute',
    top: 200,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: '#048BA8',
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  textFriends: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla',
  },
  sendTextBtn: {
    backgroundColor: 'white',
    color: '#048BA8',
    borderRadius: 24,
    borderStyle: 'solid',
    fontSize: 20,
    marginTop: 40,
    width: 200,
  },
  backButton: {
    marginTop: 5
  },
  contactButton: {
    color: 'white',
    position: 'absolute',
    top: 610,
    left: 150
  },
  textButton: {
    color: 'white',
    textAlign: 'right',
    position: 'absolute',
    top: 610,
    left: 220
  },
  description: {
    width: 360,
    textAlign: 'auto',
    fontSize: 16,
    margin: 8,
    fontFamily: 'Kohinoor Bangla',
    lineHeight: 20,
  },
  canBeFound: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
    fontSize: 17
  },
  petDescription: {
    fontSize: 16,
    paddingTop: 0,
    textAlign: 'left',
    color: 'white',
    fontFamily: 'Kohinoor Bangla',
    marginLeft: 10
  },
  shelterInfo: {
    marginTop: 50,
    fontSize: 10,
    textAlign: 'center',
    position: 'absolute',
    top: 470,
    fontFamily: 'Kohinoor Bangla',
  },
  phone: {
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla',
    fontSize: 17
  },
  cityStateZip: {
    textAlign: 'center',
    fontFamily: 'Kohinoor Bangla',
    fontSize: 17
  },
  titlesContainer: {
    borderRadius: 4,
    textAlign: 'center',
    width: 400,
    marginTop: 360,
    zIndex: 5,
    marginLeft: 10,
  },
  shelterContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    color: 'black',
    marginTop: 150,
    height: 600,
    textAlign: 'center',
    width: 400,
  },
  hidden: {
    display: 'none',
  },
  gradient: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 30,
  },
  text: {
    color: '#048BA8',
    fontSize: 35
  },
  email: {
    color: '#048BA8',
    fontSize: 33
  }
})