import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import {auth} from '../../firebase.ignore.js'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigation = useNavigation()

    const handleSignUp = () => {
      auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered ' + user.email);
        })
        .catch(error => alert(error.message))
    }


    const handleLogin = () => {
      auth
      .signInWithEmailAndPassword(email,password)
      .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with: ' + user.email);
        })
        .catch(error => alert(error.message))
    }

  return (
   <KeyboardAvoidingView
      style={styles.container} 
      behavior='padding' >
    <View 
      style = {styles.inputcontainer}>
      <TextInput 
        placeholder='Email' 
        value={email} 
        onChangeText={text => setEmail(text) } 
        style = {styles.input} 
        placeholderTextColor="#000">

      </TextInput>
      <TextInput 
        placeholder='Password' 
        value={password} 
        onChangeText={text => setPassword(text)} 
        style = {styles.input} 
        secureTextEntry 
        placeholderTextColor="#000">
      </TextInput>
    </View>
    <View style = {styles.buttonContainer}>
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.button}
      >
       <Text style={styles.buttonText}>Login</Text> 
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}
      >
       <Text style={[styles.buttonOutlineText]}>Register</Text> 
      </TouchableOpacity>
    </View>
   </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputcontainer: {
    width:'80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: 700,
    fontSize: 16,

  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,

    
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: 700,
    fontSize: 16,

  },
})