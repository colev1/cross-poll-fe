import React from 'react';
import { StyleSheet, Text, View, Slider, TouchableOpacity, TextInput } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { Icon } from 'react-native-elements';

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      miles: '',
      selectedAnimal: '',
      selectedSize: '',
      selectedGender: '',
      selectedLocation: '',
      showChangeLocation: false,
      newZipCode: ''
    }
  }

  handleSliderChange = (value) => {
    this.setState({
      miles: value
    })
  }

  setSelectedAnimal = (selectedAnimal) => {
    this.setState({
      selectedAnimal
    });
  }

  setSelectedSize = (selectedSize) => {
    this.setState({
      selectedSize
    });
  }

  setSelectedGender = (selectedGender) => {
    this.setState({
      selectedGender
    });
  }

  showCurrLocation = () => {
    this.setState({
      showChangeLocation: true
    })
  }

  renderOption = (option, selected, onSelect, index) => {
    const selectedStyle = selected ? styles.selectedRadio : styles.unselectedRadio
    const selectedBorder = selected ? styles.selectedRadioBorder : styles.radioBorder
    return (
      <TouchableOpacity onPress={onSelect} key={index} style={selectedBorder}>
        <Text style={selectedStyle}>{option}</Text>
      </TouchableOpacity>
    )
  }

  renderContainer = (optionNodes) => {
    return (<View style={styles.radioButtons}>
      {optionNodes}
    </View>)
  }

  submitNewLocation = () => {
    console.log('hi')
  }



  render() {
    const animalOptions = [
      "dog",
      "cat",
      "horse",
      "reptile",
      "smallfurry"
    ];

    const sizeOptions = [
      "small",
      "medium",
      "large"
    ]

    const genderOptions = [
      "male",
      "female"
    ]

    if (this.props.showFilter) {
      return (
        <View style={styles.filterContainer}>
          <View style={styles.submitLocationContainer}>
            <Icon
              name='map-marker'
              type='font-awesome'
              color='black'
              size={28}
              iconStyle={styles.locationIcon} />
      <Text style={styles.sliderTitle}> 
                My current location: <Text style={styles.blue}>
                {this.props.userLocation.zip_code} 
                </Text>
                </Text>
          </View>
          <Text style={styles.sliderTitle}> type: </Text>
          <RadioButtons
            style={styles.radioButtons}
            options={animalOptions}
            onSelection={this.setSelectedAnimal}
            selectedOption={this.state.selectedAnimal}
            renderOption={this.renderOption}
            renderContainer={this.renderContainer}
          />
          <Text style={styles.sliderTitle}>  size: </Text>
          <RadioButtons
            options={sizeOptions}
            onSelection={this.setSelectedSize}
            selectedOption={this.state.selectedSize}
            renderOption={this.renderOption}
            renderContainer={this.renderContainer}
          />
          <Text style={styles.sliderTitle}>  sex: </Text>
          <RadioButtons
            options={genderOptions}
            onSelection={this.setSelectedGender}
            selectedOption={this.state.selectedGender}
            renderOption={this.renderOption}
            renderContainer={this.renderContainer}
          />
          <TouchableOpacity style={styles.submitBtnContainer}
            onPress={() => this.props.fetchByFilters(this.state)} >
            <Text style={styles.submitBtn}> find a pet! </Text>
          </TouchableOpacity>
        </View>
      )
    }
    else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  adoptrHeader: {
    fontFamily: 'Kohinoor Bangla',
    fontSize: 60,
    textAlign: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  locationIcon: {
    position: 'relative',
    top: 8,
    left: 10,
  },
  inputZip: {
    color: 'grey',
    fontSize: 20,
    width: 150,
    paddingLeft: 16,    borderRadius: 16,
    fontFamily: 'Kohinoor Bangla',
    backgroundColor: 'white',
  },
  sliderTitle: {
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
    alignSelf: 'center',
    marginBottom: -30,
    padding: 0,
  },
  submitLocationContainer: {
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    flexDirection: 'row',
    height: 80,
    justifyContent: 'space-around',
    shadowColor: 'black',
    width: 300,
  },
  filterContainer: {
    width: 400,
    height: 724,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
  },
  selectedRadio: {
    fontSize: 20,
    color: 'white',
    padding: 12,
    fontFamily: 'Kohinoor Bangla',
  },
  radioButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  blue: {
    color: '#048BA8',
  },
  unselectedRadio: {
    padding: 12,
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
  },
  radioBorder: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    justifyContent: 'center',
    margin: 1,
  },
  selectedRadioBorder: {
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'center',
    backgroundColor: '#048BA8'
  },
  submitBtn: {
    fontSize: 20,
    padding: 8,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Kohinoor Bangla',
  },
  submitBtnContainer: {
    backgroundColor: '#048BA8',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: 166,
  },
});