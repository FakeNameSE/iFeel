import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Round button to hit to have the bot send a message.
const BotButton = ({ onPress, children }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{ children }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 20,
    width: 70,
    height: 70,
    backgroundColor: '#13294B',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent:'center',
    position: "relative",
    alignSelf: 'flex-end',
  },
  text: {
    color: 'white',
    //fontWeight: '700',
    //fontSize: 18,
  }
});

export { BotButton }; 