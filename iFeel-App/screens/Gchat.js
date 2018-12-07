import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

class Gchat extends React.Component {
    //Header theming and title
    static navigationOptions = {
        title: 'Chats',
        headerStyle: {
            backgroundColor: '#4caf50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }
        onPressGroup1Redirect() {
            this.setState({
              authenticating: true,
          });

          // Pass name along when switching to new window
          this.props.navigation.navigate('Chat', { name: this.props.navigation.state.params.name })
          }

          get user() {
            // Return name and UID for GiftedChat to parse
            return {
                name: this.props.navigation.state.params.name,
                _id: this.uid,
            };
        }

          render() {
              const {navigate} = this.props.navigation;
              return (
                <Button onPress={() => this.onPressGroup1Redirect()}>Group 1</Button>
                <Button onPress={() => this.onPressGroupRedirect()}>Group 2</Button>
                <Button onPress={() => this.onPressGroupRedirect()}>Group 3</Button>
                <Button onPress={() => this.onPressGroupRedirect()}>Group 4</Button>
                <Button onPress={() => this.onPressGroupRedirect()}>Group 5</Button>
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
  
  export default Gchat; 
  