import React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        value={value}
        // Otherwise there is an ugly line under the text entrie fields
        underlineColorAndroid='transparent'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: '#eee',
    borderBottomWidth: 2,
  
  },
  label: {
    padding: 5,
    paddingBottom: 5,
    color: '#333',
    fontSize: 17,
    fontWeight: '700',
    width: '100%',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    paddingTop: 5,
    //color: '#333',
    backgroundColor: 'white',
    marginBottom: 5,
    fontSize: 18,
    width: '100%',
    borderRadius: 2,
  }
});

export { Input };




/*
<KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.container}>
          <Text>
            Welcome to iFeel!
          </Text>
          <TextInput
            placeholder="username or email"
            placeholderTextColor='black'
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            placeholder="password"
            placeholderTextColor='black'
            returnKeyType="go"
            secureTextEntry
            style={styles.input}
            ref={(input) => this.passwordInput = input}
          />
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  input: {
    height: 40,
    width: 250,
    backgroundColor: 'orange',
    marginBottom: 20,
    paddingHorizontal: 15
  },
  buttonContainer: {
    width: 100,
    backgroundColor: 'blue',
    paddingVertical: 15
  },
  buttonText: {
    textAlign: 'center',
    color: 'white'
  }
});
*/
