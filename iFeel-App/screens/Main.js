import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const { EmojiOverlay } = require('react-native-emoji-picker');

class Main extends React.Component {
    // Header theming and title
    static navigationOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: '#13294b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
    state = {
        showPicker: false,
        email: '',
        password: '',
        authenticating: false,
        user: null,
        error: '',
    }

    // Initialize Firebase
    componentWillMount() {
    var config = {
        apiKey: "AIzaSyAt72bLIRK35d_sKPWDn5Rd6wZyGFpt7AY",
        authDomain: "ifeel-d97fc.firebaseapp.com",
        databaseURL: "https://ifeel-d97fc.firebaseio.com",
        projectId: "ifeel-d97fc",
        storageBucket: "ifeel-d97fc.appspot.com",
        messagingSenderId: "639485736592"
        }

        firebase.initializeApp(config);
    }

    onPressSignIn() {
        this.setState({
            authenticating: true,
        });

        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => this.setState({
              authenticating: false,
              user,
              error: '',
        }))
        // Pass name along when switching to new window
        .then(() => this.props.navigation.navigate('Chat', { name: this.state.email }))
        .catch(() => this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
        }))
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
          });
    }

    onPressKeyboard(emoji) {
      this.setState({showPicker: false})
      console.log(emoji)
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
        <Button onPress={() => this.onPressSignIn()}>Let me in!</Button>
        <Button onPress={() => this.setState({showPicker: true})}>Keyboard</Button>

        <EmojiOverlay 
          style={styles.emojiPicker} 
          visible={this.state.showPicker}
          onTapOutside={() => this.setState({showPicker: false})}
          horizontal={true}
          onEmojiSelected={this.onPressKeyboard}/>
        
        <Text>{this.state.error}</Text>
      </View>
    )

  }
  render() {
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

export default Main; 
