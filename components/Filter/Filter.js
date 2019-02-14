import React from 'react';
import { StyleSheet, Text, View, Slider, Button, TouchableOpacity } from 'react-native';

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      miles: 0,
      animal: '',
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

  render() {
    if(this.props.showFilter) {
      return (
        <View style={styles.filterContainer}>
          <Text style={styles.sliderTitle}> miles </Text>
            <Slider
              step={1}
              value={this.state.miles || 40}
              minimumValue={0}
              maximumValue={100}
              onValueChange={this.handleSliderChange}
              />
              <Text>miles: {this.state.miles} </Text>
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
    // backgroundColor: 'blue',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  filterContainer: {
    width: 300,
    flex: 1,
    justifyContent: 'center'
  }
});