import React from 'react';
import { StyleSheet, Text, View, Slider, TouchableOpacity } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons';
import { Icon } from 'react-native-elements';

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      miles: '',
      selectedAnimal: '',
      selectedSize: '',
      selectedGender: ''
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



  render() {
    const animalOptions = [
      "dog",
      "cat",
      "horse",
      "reptile",
      "smallfurry"
    ];

    const sizeOptions = [
      "S",
      "M",
      "L"
    ]

    const genderOptions = [
      "male",
      "female"
    ]

    if (this.props.showFilter) {
      return (
        <View style={styles.filterContainer}>
          <View style={styles.title}>
            <Text style={styles.titleText}>
              AdoptR
          </Text>
            <Icon
              name='paw'
              type='font-awesome'
              color='white'
              size={36}
              iconStyle={styles.pawprint}
            />
          </View>
          <Text style={styles.sliderTitle}>miles: {this.state.miles} </Text>
          <Slider
            step={1}
            value={this.state.miles}
            minimumValue={0}
            maximumValue={60}
            onValueChange={this.handleSliderChange}
          />
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
          <TouchableOpacity onPress={this.props.signOut}><Text style={styles.signOut}>Sign Out</Text></TouchableOpacity>
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
  sliderTitle: {
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
    alignSelf: 'center'
  },
  filterContainer: {
    width: 300,
    height: 724,
    justifyContent: 'space-around',
    // marginBottom: 10,
  },
  selectedRadio: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    padding: 4,
    fontFamily: 'Kohinoor Bangla',
  },
  radioButtons: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 2,
    minWidth: 120
  },
  unselectedRadio: {
    fontSize: 20,
    padding: 4,
    fontFamily: 'Kohinoor Bangla',
  },
  radioBorder: {
    borderRadius: 4,
    borderColor: 'black',
    margin: 4,
    padding: 2,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  selectedRadioBorder: {
    borderRadius: 4,
    margin: 4,
    padding: 2,
    height: 60,
    alignItems: 'center',
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    justifyContent: 'center',
    backgroundColor: '#048BA8'
  },
  submitBtn: {
    fontSize: 28,
    padding: 16,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Kohinoor Bangla',
  },
  submitBtnContainer: {
    backgroundColor: '#048BA8',
    borderRadius: 16,
    marginTop: 40,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  title: {
    borderRadius: 24,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    alignItems: 'center',
    backgroundColor: '#048BA8',
    color: 'white',
    width: 280,
    flexDirection: 'row',
    fontFamily: 'Kohinoor Bangla',
    fontSize: 50,
    justifyContent: 'center',
    padding: 10,
    shadowColor: 'black',
    textAlign: 'center',
    zIndex: 3,
  },
  titleText: {
    fontFamily: 'Kohinoor Bangla',
    fontSize: 52,
    textAlign: 'center',
    color: 'white',
  },
  pawprint: {
    color: 'white',
    marginLeft: 20
  },
  signOut: {
    color: '#048BA8',
    marginTop: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});