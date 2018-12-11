// Your run of the mill React-Native imports.
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
// Our custom components.
import { Input } from '../components/Input';
import { Button } from '../components/Button';

class CreateAccount extends React.Component {
    // Store useful state on this screen, namely what information the
    // user entered to create their new account.
    state = { email: '', password: '', errorMessage: null }

    // Header theming and title
    static navigationOptions = {
        title: 'Create Account',
        headerStyle: {
            backgroundColor: '#13294b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }

    // Method run when the user hits the create account button.
    handleSignUp = () => {
        // Sends the entered information to Firebase to create the
        // account.
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => this.props.navigation.navigate('Main'))
          // If something goes wrong, tell the user.
          .catch(error => this.setState({ errorMessage: error.message }))
    }

    // Helper method to render the screen.
    // Renders our custom text inputs and button.
    renderCurrentState() {
        return (
            <View style={styles.form}>
              <Input
                placeholder='Enter your email...'
                label='Email'
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
              />
              <Input
                placeholder='Enter your password...'
                label='Password'
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
              <Button onPress={() => this.handleSignUp()}>Create an account!</Button>
              <Text>{this.state.error}</Text>
            </View>
        )
    }

    // Actually render the screen with the given stylesheet.
    render(){
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

export default CreateAccount; 
