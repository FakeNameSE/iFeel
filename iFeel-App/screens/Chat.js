// Thank you https://blog.expo.io/how-to-build-a-chat-app-with-react-native-3ef8604ebb3c
// for the tutorial on using Gifted Chat.

// Your run of the mill React-Native imports.
import React, { Component } from 'react';
import { Alert, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
// Our custom components.
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { BotButton } from '../components/BotButton';
import { NavBarSettingsButton } from '../components/NavBarButtons';
// Array of potential bot responses. Might be a fancy schmancy Markov
// chain like thing in the future.
import {botResponses} from '../Constants.js';
// Gifted-chat import. The library takes care of fun stuff like
// rendering message bubbles and having a message composer.
import { GiftedChat } from 'react-native-gifted-chat';
// To keep keyboard from covering up text input.
import { KeyboardAvoidingView } from 'react-native';
// Because keyboard avoiding behavior is platform specific.
import {Platform} from 'react-native';

// To hide the big Expo warning about timers. Firebase listener stuff
// likes them, but react-native does not. There is currently an issue
// open in React-Native to fix this.
console.disableYellowBox = true;

class Chat extends Component {
    //Header theming, title, and navbar button for creating new groups.
    // Need to give header access to functions in instance of screen
    // with this weird, ugly fat arrow params thing, hence why the
    // navigation prop is referred to as navigation and not
    // this.prop.navigation
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chat: ' + navigation.state.params.groupName,
            headerRight: (
                <NavBarSettingsButton onPress={
                    () => navigation.navigate('EditChat', {
                        email: navigation.state.params.email,
                        groupID: navigation.state.params.groupID,
                        groupName: navigation.state.params.groupName
                    })
                }></NavBarSettingsButton>
            ),
            headerStyle: {
                backgroundColor: '#13294B',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        };
    };
    // Constructor to bind state and some functions to this.
    constructor (props) {
        super (props);
        state = {
            messages: [],
            isLoadingEarlier: false,
        };
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this.renderActions = this.renderActions.bind(this);
    }  
   
    // Keep track of messages and some other things through state.
    state = {
        messages: [],
        isLoadingEarlier: false,
    };

    // Reference to where in Firebase DB messages will be stored.
    get ref() {
        return firebase.database().ref('messages/' + this.props.navigation.state.params.groupID);
    }
    
    onLoadEarlier() {
        this.setState((previousState) => {
            return {
                isLoadingEarlier: true,
            };
        }, () => {
            console.log(this.state.isLoadingEarlier)
            this.setState((previousState) => {
                return {
                    isLoadingEarlier: false,
                };
            });
        }); 
    }
        /*
        this.ref
          .orderByKey()
          .startAt('-LTVVuOn41zWjsZ_C_s-')
          .limitToFirst(20)
          .once("value", function(data) {
              console.log('Mes ' + data.key)
          });
          */
        /*
        this.ref
          .limitToFirst(40)
          .once("value", function(snapshot) {
              // Return whatever is associated with snapshot.
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
              this.setState((previousState) => {
                  return {
                      messages: GiftedChat.prepend(previousState.messages, message),
                  };
              });
          });
        */ 
    
    // Get last 20 messages, any incoming messages, and send them to parse.
    on = callback =>
        this.ref
          .limitToLast(20)
          .on('child_added', snapshot => callback(this.parse(snapshot)));
    parse = snapshot => {
        // Return whatever is associated with snapshot.
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
            name: this.props.navigation.state.params.email,
            _id: this.uid,
        };
    }

    // Custom props
    // Button on left in composer
    renderActions() {
        return (
            <BotButton onPress={() => this.botSend()}></BotButton>
        );
    }
    
    //Show me the messages and chat UI! Updates as state updates.
    // Platform specific hack to ensure that the keyboard does
    // not cover the text composer.

    // Old variant had button for bot floating top right with this after
    // everything except KeyboardAvoidingView
    // <BotButton onPress={() => this.botSend()}></BotButton>
    render() {
        return (
        <View style={styles.container}>
            <GiftedChat
                loadEarlier={true}
                isLoadingEarlier={this.state.isLoadingEarlier}
                messages={this.state.messages}
                onSend={this.send}
                user={this.user}
                isAnimated={true}
                onLoadEarlier={this.onLoadEarlier}
                renderActions={this.renderActions}
                placeholder="I feel..."
            />
            <KeyboardAvoidingView behavior={
                Platform.OS === 'android' ?
                'padding' :  null
            } keyboardVerticalOffset={80}
            />
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
