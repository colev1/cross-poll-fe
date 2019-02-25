// import APIkey from '../apiKey';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
// import { cleanPet, cleanShelters } from '../helpers/helpers';

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <View style={styles.navContainer}>
                  <TouchableOpacity onPress={this.props.showFilter}
                    style={styles.hamburgerContainer}>
                    <Icon
                      name='sign-out'
                      type='font-awesome'
                      color='grey'
                      size={48}
                      iconStyle={styles.cog} />
                      <Text> sign out </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.showFilter}
                    style={styles.hamburgerContainer}>
                    <Icon
                      name='cog'
                      type='font-awesome'
                      color='grey'
                      size={48}
                      iconStyle={styles.cog} />
                      <Text> filters </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.returnHome} style={styles.hamburgerContainer}>
                    <Icon
                      name='home'
                      type='font-awesome'
                      color='grey'
                      size={48}
                      iconStyle={styles.heart} />
                      <Text> home </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.props.displayFavorites} style={styles.hamburgerContainer}>
                    <Icon
                      name='heart'
                      type='font-awesome'
                      color='grey'
                      size={48}
                      iconStyle={styles.heart} />
                      <Text> favorites </Text>
                  </TouchableOpacity>
                </View>
    )
  }
}


const styles = StyleSheet.create({
  navContainer: {
    // flex: 1,
    padding: 24,
    flexDirection: 'row',
    // bottom: 200,
    // zIndex: 4,
    // paddingLeft: 40,
    justifyContent: 'space-around',
    width: 420,
    backgroundColor: 'white',
    // height: 100
  },
  hamburgerIcon: {
    height: 50,
    width: 50,
    color: 'black',
  },
  hamburgerContainer: {
    // padding: 10,
    // borderRadius: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // width: 70,
    // height: 70,
    // borderColor: 'white',
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: { width: 2, height: 3 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
  },
  petTitle: {
    fontFamily: 'Kohinoor Bangla',
    fontWeight: 'bold',
    fontSize: 36,
    zIndex: 4,
    color: 'white',
    // marginLeft: 8,
  },
  hidden: {
    display: 'none'
  },
})


