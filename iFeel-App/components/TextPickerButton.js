import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const TextPickerButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 0,
    padding: 6,
    width: '100%',
    backgroundColor: '#13294B',
    borderTopWidth: 1,
    borderTopColor: '#E84A27',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
  }
});

export { TextPickerButton };
 
 
