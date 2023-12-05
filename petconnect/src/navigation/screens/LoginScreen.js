// import all necessary tools/components
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../../firebase.ignore.js';
import { useNavigation } from '@react-navigation/native';

const registration = 'Registration';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  // redirect to registration page
  const handleRegister = () => {
    navigation.navigate(registration);
  };

  // login functionality  
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with: ' + user.email);
      })
      .catch(error => alert(error.message));
  };

  // create the login screen front end
  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputcontainer}>
        <View>
          <Image source={require('./images/dogcatlogo.png')} style={styles.image} />
          <Text style={styles.header}>PetConnect</Text>
        </View>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
          placeholderTextColor="#000"
        />
        <TextInput
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#000"
        />
        <View style={styles.line}></View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

// styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputcontainer: {
    width:'80%',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    paddingTop: 1,
    fontWeight: 'bold', 
    color: '#BBBEFE',
    
  },
  image: {
    alignSelf: 'center',
    width: 300,
    height: 110,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 1,
  },
  button: {
    backgroundColor: '#BBBEFE',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,

  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#BBBEFE',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#BBBEFE',
    fontSize: 16,

  },
  line: {
    borderBottomColor: '#BBBEFE', 
    borderBottomWidth: 1,
    marginVertical: 10,
  }
})