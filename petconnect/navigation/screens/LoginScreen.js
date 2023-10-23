import { View, Image, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';




const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/shiba.jpg')} // Replace with your logo image path
          style={styles.logo}
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Set your background color
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust the width and height based on your logo size
    height: 150,
  },
  loginButton: {
    backgroundColor: '#007bff', // Button background color
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#fff', // Button text color
    fontSize: 18,
  },
});

export default LoginScreen;
