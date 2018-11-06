import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './Input';
import { Button } from './Button';
class Chat extends Component {
  render() {
    return (
    <View style={styles.container}>
          <Text>Logged In</Text>
    </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#E84A27',
  },
  form: {
    flex: 1
  }
});
export default Chat; 
