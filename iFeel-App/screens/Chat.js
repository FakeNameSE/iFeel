// Thank you https://blog.expo.io/how-to-build-a-chat-app-with-react-native-3ef8604ebb3c
// for the tutorial on using Gifted Chat.

import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { SendButton } from '../components/SendButton';
import {botResponses} from '../Constants.js';
//import { Firebase } from './Firebase';
import { GiftedChat } from 'react-native-gifted-chat';
// To keep keyboard from covering up text input.
import { KeyboardAvoidingView } from 'react-native';
// Because keyboard avoiding behavior is platform specific.
import {Platform} from 'react-native';
console.disableYellowBox = true;

class Chat extends Component {
    // Header theming and title.
    static navigationOptions = {
        title: 'Chat',
        headerStyle: {
            backgroundColor: '#d35400',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    
    // Way to keep track of messages through state
    state = {
        messages: [],
    };s

    // Reference to where in Firebase DB messages will be stored.
    get ref() {
        return firebase.database().ref('messages');
    }
    // Get last 20 messages, any incoming messages, and send them to parse.
    on = callback =>
        this.ref
          .limitToLast(20)
          .on('child_added', snapshot => callback(this.parse(snapshot)));
    parse = snapshot => {
        // Return whatever is associates with snapshot.
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        // Convert timestamp to JS date object.
        const timestamp = new Date(numberStamp);
        // Create object for Gifted Chat. id is unique.
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    };
    // To unsubscribe from database
    off() {
        this.ref.off();
    }

    // Helper function to get user UID.
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
    // Get timestamp for saving messages.
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }

    // Helper function that takes array of messages and prepares all of
    // them to be sent.
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    botSend = messages => {
        //const { text, user } = messages[0];
        text = botResponses[Math.floor(Math.random() * botResponses.length)];
        user = this.user;
            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
    };
    
    // Save message objects. Actually sends them to server.
    append = message => this.ref.push(message);

    // When we open the chat, start looking for messages.
    componentDidMount() {
        this.on(message =>
          this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message),
          }))
        );
    }
    // Unsubscribe when we close the chat screen.
    componentWillUnmount() {
        this.off();
    }

    // Used to display the current user's messages on the other side of
    // the screen.
    get user() {
        // Return name and UID for GiftedChat to parse
        return {
            name: this.props.navigation.state.params.name,
            _id: this.uid,
        };
    }
    
    //Show me the messages and chat UI! Updates as state updates.
    render() {
        return (
        <View style={styles.container}>
            <SendButton onPress={() => this.botSend()}>Bot!</SendButton>
            <GiftedChat
                messages={this.state.messages}
                onSend={this.send}
                user={this.user}
            />
            <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={80} />
         </View>
        );
    }
    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
    //alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: 'row',
    backgroundColor: '#E84A27',
  },
  form: {
    flex: 1
  }
});
export default Chat; 
