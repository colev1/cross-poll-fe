import React from 'react';
import { StyleSheet, Text, View, Slider, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons'


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

    if(this.props.showFilter) {
      return (
        <View style={styles.filterContainer}>
          <Text style={styles.adoptrHeader}> Adoptr </Text>
          <Text style={styles.sliderTitle}>miles: {this.state.miles} </Text>
            <Slider
              step={1}
              value={this.state.miles || 40}
              minimumValue={0}
              maximumValue={60}
              onValueChange={this.handleSliderChange}
              />
              <Text style={styles.sliderTitle}> animal type: </Text>
              <RadioButtons
                style={styles.radioButtons}
                options={ animalOptions }
                onSelection={ this.setSelectedAnimal }
                selectedOption={this.state.selectedAnimal }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
              <Text style={styles.sliderTitle}> animal size: </Text>
              <RadioButtons
                options={ sizeOptions }
                onSelection={ this.setSelectedSize }
                selectedOption={this.state.selectedSize }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
              <Text style={styles.sliderTitle}> animal sex: </Text>
              <RadioButtons
                options={ genderOptions }
                onSelection={ this.setSelectedGender }
                selectedOption={this.state.selectedGender }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
              <TouchableOpacity style={styles.submitBtnContainer}
              onPress={()=>this.props.fetchByFilters(this.state)} >
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
  sliderTitle: {
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
    alignSelf: 'center'
  },
  filterContainer: {
    width: 300,
    height: 700,
    justifyContent: 'space-around'
  },
  selectedRadio: {
    fontWeight: 'bold',
    fontSize: 20,
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
      borderWidth: 2,
      borderColor: 'black',
      margin: 4,
      padding: 2,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#D3D3D3',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    },
    selectedRadioBorder: {
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'black',
      margin: 4,
      padding: 2,
      height: 60,
      alignItems: 'center',
      shadowColor: 'white',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    submitBtn: {
      fontSize: 28,
      padding: 16,
      textAlign: 'center'
    },
    submitBtnContainer: {
      backgroundColor: '#D3D3D3',
      marginTop: 40,
      borderColor: 'black',
      borderRadius: 8,
      borderWidth: 2,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
    }
});