import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

// A set of icon buttons in navbar.

// Settings gear.
const NavBarSettingsButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image source={require('../assets/settings_gear.png')} />
      </TouchableOpacity>
    )
}

// Add button.
const NavBarAddButton = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Image source={require('../assets/add.png')} />
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      padding: 10,
    }
});

export {
    NavBarSettingsButton,
    NavBarAddButton
};
 
 
