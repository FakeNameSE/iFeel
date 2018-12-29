// Your run of the mill React-Native imports.
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
// Our custom components.
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { NavBarAddButton } from '../components/NavBarButtons';

class CreateChat extends React.Component {
    //Header theming, title, and navbar button for creating new groups.
    static navigationOptions = {
        title: 'Create Chat',
        headerStyle: {
            backgroundColor: '#13294B',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    // Stores new group state, e.g. what group name, and members have
    //been entered, and the user object.
    state = {
        groupName: '',
        groupMembers: '',
        error: '',
    }

    // Helper function to get user UID.
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    // Helper function to render the screen.
    renderCurrentState() {
        // Render the textboxes and buttons.
        return (
          <View style={styles.form}>
            <Input
              placeholder='Enter the group name...'
              label='Group name'
              onChangeText={groupName => this.setState({ groupName })}
              value={this.state.groupName}
            />
            <Input
              placeholder='Enter new members...'
              label='Members'
              onChangeText={groupMembers => this.setState({ groupMembers })}
              value={this.state.groupMembers}
            />
            <Button onPress={() => Alert.alert('Create', this.state.groupName + ' ' + this.state.groupMembers)}>Create!</Button>
            <Text>{this.state.error}</Text>
          </View>
        )
    }
    // Actually render the screen.
    render() {
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#E84A27',
  },
  form: {
    flex: 1
  }
});
  
export default CreateChat; 
