import React from 'react';
import { StyleSheet, Text, View, Slider, Button, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { RadioButtons } from 'react-native-radio-buttons'


export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      miles: '',
      selectedAnimal: '',
      size: ''
    }
  }

  componentDidMount = () => {
    console.log('filter mounted')
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

  renderOption = (option, selected, onSelect, index) => {
    const selectedStyle = selected ? styles.selectedRadio : styles.unselectedRadio
    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <Text style={selectedStyle}>{option}</Text>
      </TouchableWithoutFeedback>
    )
  }

  renderContainer = (optionNodes) => {
    return <View>{optionNodes}</View>;
  }


  render() {
    const animalOptions = [
      "dogs",
      "cats",
      "small furry animals",
      "barn animals"
    ];

    if(this.props.showFilter) {
      return (
        <View style={styles.filterContainer}>
          <Text style={styles.sliderTitle}>miles: {this.state.miles} </Text>
            <Slider
              step={1}
              value={this.state.miles || 40}
              minimumValue={0}
              maximumValue={60}
              onValueChange={this.handleSliderChange}
              />
              <RadioButtons
                options={ animalOptions }
                onSelection={ this.setSelectedAnimal }
                selectedOption={this.state.selectedAnimal }
                renderOption={ this.renderOption }
                renderContainer={ this.renderContainer }
              />
              <Text>  {this.state.selectedAnimal} </Text>
        </View>
      )
    }
    else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  sliderTitle: {
    fontSize: 44,
    alignSelf: 'center'
  },
  filterContainer: {
    width: 300,
    flex: 1,
    justifyContent: 'center'
  },
  selectedRadio: {
    fontWeight: 'bold'

  }
});