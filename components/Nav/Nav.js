import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
    <View style={styles.navContainer}>
      <TouchableOpacity onPress={this.props.signOut}
        style={styles.hamburgerContainer}>
        <Icon
          name='sign-out'
          type='font-awesome'
          color={this.props.displayedComponent==='login' ? '#048BA8' : 'grey'}
          size={48}
          iconStyle={styles.cog} />
          <Text> sign out </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.props.showFilter}
        style={styles.hamburgerContainer}>
        <Icon
          name='cog'
          type='font-awesome'
          color={this.props.displayedComponent==='filter' ? '#048BA8' : 'grey'}
          size={48}
          iconStyle={styles.cog} />
          <Text> filters </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.props.returnHome} style={styles.hamburgerContainer}>
        <Icon
          name='home'
          type='font-awesome'
          color={this.props.displayedComponent==='home' ? '#048BA8' : 'grey'}
          size={48}
          iconStyle={styles.heart} />
          <Text> home </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.props.displayFavorites} style={styles.hamburgerContainer}>
        <Icon
          name='heart'
          type='font-awesome'
          color={this.props.displayedComponent==='favorites' ? '#048BA8' : 'grey'}
          size={48}
          iconStyle={this.props.displayedComponent === 'favorites' ? styles.chosenNav : styles.unchosenNav} />
          <Text > favorites </Text>
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  navContainer: {
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 420,
    backgroundColor: 'white',
  },
  hamburgerIcon: {
    height: 50,
    width: 50,
    color: 'black',
  },
  hamburgerContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  petTitle: {
    fontFamily: 'Kohinoor Bangla',
    fontWeight: 'bold',
    fontSize: 36,
    zIndex: 4,
    color: 'white',
  },
  hidden: {
    display: 'none'
  },
})


