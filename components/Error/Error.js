import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';


const Error = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.errorMessage}>
          Oops, your connection seems off...
        </Text>
        <Icon
              name='paw'
              type='font-awesome'
              color='black'
              size= {36}
              iconStyle={styles.pawprint}
            />
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
    color: 'black',
    textAlign: 'center',
  }
})

export default Error;