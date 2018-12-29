import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

// Round button to hit to have the bot send a message.
const BotButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image source={require('../assets/bot.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    //marginTop: 10,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: '#13294B',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent:'center',
    //position: "absolute",
    //alignSelf: 'flex-end',
  }
});

export { BotButton }; 
