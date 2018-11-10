import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './Input';
import { Button } from './Button';
class Chat extends Component {
    static navigationOptions = {
        title: 'Chat',
        headerStyle: {
            backgroundColor: '#13294b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    onPressLogOut() {
        firebase.auth().signOut()
        .then(() => {
            this.setState({
                email: '',
                password: '',
                authenticating: false,
                user: null,
                })
                }, error => {
                    console.error('Sign Out Error', error);
                })
        .then(() => this.props.navigation.navigate('Main', { user: this.state.name }));
    }
    render() {
        return (
        <View style={styles.container}>
            <Text>Logged In</Text>
        </View>
        )}}
        
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
