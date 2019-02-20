import React  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';


const Error = () => {
    return (
      <View style={styles.container}>
        <Text>
          Oops, your connection seems off...
        </Text>
        <Icon
              name='paw'
              type='font-awesome'
              color='white'
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
})

export default Error;