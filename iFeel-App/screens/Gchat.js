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
            backgroundColor: '#f57c00',
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

        renderCurrentState() {
      return (
        <View style={styles.form}>
          <Button onPress={() => this.onPressGroup1Redirect()}>Group 1</Button>
          <Button onPress={() => this.onPressGroup1Redirect()}>Group 2</Button>
          <Button onPress={() => this.onPressGroup1Redirect()}>Group 3</Button>
          <Button onPress={() => this.onPressGroup1Redirect()}>Group 4</Button>
          <Button onPress={() => this.onPressGroup1Redirect()}>Group 5</Button>
        </View>
      )
  
    }
        
          render() {
              const {navigate} = this.props.navigation;
              return (
                <View style={styles.container}>
                  {this.renderCurrentState()}
                </View>
              );
            }

          
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#1976d2',
    },
    form: {
      flex: 1
    }
  });
  
  export default Gchat; 
  