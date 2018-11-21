import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './Input';
import { Button } from './Button';
import { Firebase } from './Firebase';
import { GiftedChat } from 'react-native-gifted-chat';

class Chat extends Component {
    // Header theming and title.
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
    // Way to keep track of messages through state
    state = {
        messages: [],
    };

    // When we open the chat, start looking for messages.
    componentDidMount() {
        Firebase.shared.on(message =>
          this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, message),
          }))
        );
    }
    // Unsubscribe when we close the chat screen.
    componentWillUnmount() {
        Firebase.shared.off();
    }

    get user() {
        // Return name and UID for GiftedChat to parse
        return {
            name: this.props.navigation.state.params.name,
            _id: Firebase.shared.uid,
        };
    }
    
    //Show me the messages and chat UI! Updates as state updates.
    render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={Firebase.shared.send}
            user={this.user}
          />
        );
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
