import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import Loading from '../Loading/Loading';
import { Icon } from 'react-native-elements';
import { showMessage } from "react-native-flash-message";
import Modal from "react-native-modal";

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
      let image = photos[2]
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
          <View style={styles.titlesContainer}>
            <Text style={styles.petName}> {name} </Text>
            <Text style={styles.petDescription}>{breed}</Text>
            <Text style={styles.petDescription}>{age}</Text>
          </View>
          <ImageBackground source={{ uri: image }}
            style={styles.moreInfoImage}
            imageStyle={styles.borderRad}>
          </ImageBackground>
          <ScrollView style={styles.shelterContainer}>
            <Text style={styles.description}>{description} </Text>
          </ScrollView>
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
            <Text style={styles.contactButtonText}> Email {shelter.name} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textButton}
            onPress={() => this.setState({
              sendText: true
            })}>
            <Text style={styles.contactButtonText}> Send a text about {name}! </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.returnHome}>
            <Icon
              name='arrow-circle-left'
              type='font-awesome'
              color='#F49D37'
              size={50}
              iconStyles={styles.backButton} />
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
    marginTop: 80,
  },
  modalContainer: {
    paddingTop: 100
  },
  petName: {
    textAlign: 'center',
    fontSize: 44,
    color: 'black',
    marginBottom: 0,
    fontFamily: 'Kohinoor Bangla',
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
    marginTop: 5
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
  sendButtonText: {
    textAlign: 'center',
    borderRadius: 24,
    fontSize: 14,
    color: '#048BA8',
    margin: 20,
  },
  contactButton: {
    backgroundColor: '#048BA8',
    color: 'white',
    borderRadius: 24,
    borderStyle: 'solid',
    fontSize: 20,
    height: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'center',
    width: 300,
    margin: 10,
  },
  textButton: {
    backgroundColor: '#048BA8',
    color: 'white',
    borderRadius: 24,
    borderStyle: 'solid',
    fontSize: 20,
    height: 30,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    textAlign: 'center',
    width: 300,
    marginBottom: 16,
  },
  contactButtonText: {
    textAlign: 'center',
    left: 0,
    fontSize: 14,
    color: 'white',
    marginTop: 6,
    fontFamily: 'Kohinoor Bangla',
  },
  description: {
    width: 360,
    textAlign: 'auto',
    fontSize: 16,
    margin: 8,
    color: 'black',
    fontFamily: 'Kohinoor Bangla',
    lineHeight: 20,
  },
  canBeFound: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 0,
    fontSize: 15
  },
  petDescription: {
    fontSize: 28,
    marginTop: 0,
    paddingTop: 0,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Kohinoor Bangla',
  },
  shelterInfo: {
    marginTop: 0,
    fontSize: 10,
    textAlign: 'center',
  },
  phone: {
    textAlign: 'center',
  },
  cityStateZip: {
    textAlign: 'center'
  },
  titlesContainer: {
    borderRadius: 4,
    textAlign: 'center',
    width: 400,
  },
  shelterContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    color: 'black',
    marginTop: 4,
    height: 600,
    textAlign: 'center',
    width: 400,
  },
  petBreedAge: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 300,
  },
  moreInfoImage: {
    height: 200,
    width: 350,
  },
  hidden: {
    display: 'none',
  },
})