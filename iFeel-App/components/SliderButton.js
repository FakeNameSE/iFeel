import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const SliderButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 0,
    padding: 5,
    width: '30%',
    backgroundColor: '#13294B',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  }
});

export { SliderButton };
 
