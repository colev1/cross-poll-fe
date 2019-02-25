import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';


const Error = () => {
  return (
    <View style={styles.container}>
      <Icon
        name='paw'
        type='font-awesome'
        color='black'
        size={36}
        iconStyle={styles.pawprint}
      />
      <Text style={styles.errorMessage}>
        Oops, your connection seems off...
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  errorMessage: {
    fontSize: 28,
    fontFamily: 'Kohinoor Bangla',
    color: 'black',
    textAlign: 'center',
  }
})

export default Error;