// Your run of the mill React-Native imports.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
// Our custom components.
import { Input } from '../components/Input';
import { Button } from '../components/Button';

class Gchat extends React.Component {
    //Header theming and title
    static navigationOptions = {
        title: 'Chats',
        headerStyle: {
            backgroundColor: '#13294B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
      }

    // Function to run when group button is clicked
    onPressGroup1Redirect() {
        // Pass name along when switching to chat screen
        this.props.navigation.navigate('Chat', { name: this.props.navigation.state.params.name })
    }
    // Helper method to render page.
    renderCurrentState() {
        // Just a bunch of dummy buttons all doing the same thing for
        // now.
        // TODO give ability to select real groups here. Would involve
        // having a user database with what groups they are allowed to
        // view, and dynamically generate buttons or something of that
        // sort which would redirect to the appropriate chat page.
        // Each group would probably have a hash as a unique identifier.
        // Implementation of groups will probably mean having an extra
        // ref layer on top of the current message ref in the Firebase
        // NoSQL database. This ref would be for the particular group. 
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
    // Actually render page.
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                {this.renderCurrentState()}
            </View>
        );
    }
}

// Stylesheet, who says this app can't be beautiful and smart?
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      flexDirection: 'row',
      backgroundColor: '#E84A27',
    },
    form: {
      flex: 1
    }
  });
  
export default Gchat; 
  
