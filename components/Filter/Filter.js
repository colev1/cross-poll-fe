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
                      My current location: {this.props.userLocation.zip_code} 
                      </Text>
            {/* <TouchableOpacity style={this.state.showChangeLocation ? styles.hidden : styles.changeLocButton}
            onPress={()=> this.setState({
              showChangeLocation: true
            })}>
            <Text style={this.state.showChangeLocation ? styles.hidden : styles.changeLocText}>
            change location </Text></TouchableOpacity> */}
          </View>
          {/* <View style={this.state.showChangeLocation ? styles.submitLocationContainer : styles.hidden}>
            <TextInput style={this.state.showChangeLocation ? styles.inputZip : styles.hidden} placeholder='00000'
            value={this.state.newZipCode}
            onChangeText={(value) => this.setState({ newZipCode: value })}> 
            <Icon
            name='arrow-right'
            type='font-awesome'
            color='black'
            size={12}
            iconStyle={styles.locationIcon} /> 
            </TextInput>
            <TouchableOpacity style={this.state.showChangeLocation ? styles.submitLocButton : styles.hidden}
            onPress={this.submitNewLocation}>
            <Text> submit </Text> 
            </TouchableOpacity>
          </View> */}
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
    top: 28,
    right: 140,
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
    marginBottom: -20,
    padding: 0,
  },
  submitLocationContainer: {
    // flex: 1,
    // top: 100,
    // position: 'absolute',
    // flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  filterContainer: {
    width: 300,
    height: 724,
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  changeLocButton: {
    width: 200,
    // height: 40,
    marginTop: 40,
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
    backgroundColor: 'white'
  },
  changeLocText: {
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
  },
  selectedRadio: {
    // fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    padding: 12,
    fontFamily: 'Kohinoor Bangla',
  },
  radioButtons: {
    // borderColor: 'black',
    // borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    
    // padding: 2,
    // minWidth: 120
  },
  unselectedRadio: {
    padding: 12,
    fontSize: 20,
    fontFamily: 'Kohinoor Bangla',
  },
  radioBorder: {
    // borderRadius: 4,
    borderColor: 'black',
    margin: 1,
    // width: 100,
    // padding: 2,
    // height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  selectedRadioBorder: {
    borderRadius: 4,
    // margin: 4,
    // padding: 2,
    // width: 100,
    // height: 60,
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
  submitLocButton: {
    backgroundColor: '#048BA8',
    borderRadius: 16,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  submitLocButtonText: {
    fontSize: 12,
    padding: 4,
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
  },
  hidden: {
    display: 'none'
  }
});