// Thank you https://www.youtube.com/watch?v=pnBsuXTK8po for the
// tutorial on authentication with firebase.

import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

class CreateAccount extends React.Component {
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
    
    handleSignUp = () => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(() => this.props.navigation.navigate('Main'))
          .catch(error => this.setState({ errorMessage: error.message }))
      }

    renderCurrentState() {
        if (this.state.authenticating) {
            return (
              <View style={styles.form}>
                <ActivityIndicator size='large' />
              </View>
            )
        }
        if (this.state.user !== null) {
        /*return (
        <View style={styles.form}>
          <Text>Logged In</Text>
          <Button onPress={() => this.onPressLogOut()}>Let me out!</Button>
        </View>
        )
        */
        }

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
  render(){
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
