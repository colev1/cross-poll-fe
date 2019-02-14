import React from 'react';
import { StyleSheet, Text, View, Slider, Button, TouchableOpacity } from 'react-native';

export default class Filter extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    console.log('filter mounted')
  }

  render() {
    if(this.props.showFilter) {
      return (
        <View>
          <Text style={styles.sliderTitle}> SLIDER</Text>
            <Slider
            step={1}
            maximumValue={100}
            // onValueChange={this.change.bind(this)}
            value={value}
          />
          <Text> blah</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});