import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import {auth, db} from '../../../firebase.ignore.js'
import { useNavigation } from '@react-navigation/native'


const Registration = () => {
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name, setName] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
  

    const handleSignUp = () => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log('Registered ' + user.email);

          // Create a user document in the "users" collection
          db.collection('users')
            .doc(user.uid)
            .set({
              name: name,
              age: age,
              gender: gender,
              likes: [], // Initialize likes as an empty array
              email: email,
            })
            .then(() => {
              console.log('User document added to Firestore');
            })
            .catch((error) => {
              console.error('Error adding user document:', error);
            });
        })
        .catch((error) => alert(error.message));
    };



  return (
   <KeyboardAvoidingView
      style={styles.container} 
      behavior='padding' >
    <View 
      style = {styles.inputcontainer}>
      <View>
        <Image source={require('./images/dogcatlogo.png')} style={styles.image}/> 
        <Text style={styles.header}>Registration</Text>
      </View>
      <TextInput 
        placeholder='Name' 
        value={name} 
        onChangeText={text => setName(text)} 
        style = {styles.input} 
        placeholderTextColor="#000">

      </TextInput>
      <TextInput 
        placeholder='Age' 
        value={age} 
        onChangeText={text => setAge(text)} 
        style = {styles.input} 
        placeholderTextColor="#000">
      </TextInput>
      <TextInput 
        placeholder='Gender' 
        value={gender} 
        onChangeText={text => setGender(text)} 
        style = {styles.input} 
        placeholderTextColor="#000">
      </TextInput>
      <TextInput 
        placeholder='Email' 
        value={email} 
        onChangeText={text => setEmail(text)} 
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
      <View style={styles.line}></View>
    </View>
    <View style = {styles.buttonContainer}>
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

export default Registration;

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
    fontSize: 22,
    textAlign: 'center',
    paddingTop: 5,
    fontWeight: 'bold', // Added fontWeight for a bolder look
    color: '#BBBEFE', // Added color for a vibrant look
    
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
   // fontWeight: 700,
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
   // fontWeight: 700,
    fontSize: 16,

  },
  line: {
    borderBottomColor: '#BBBEFE', // Adjust color as needed
    borderBottomWidth: 1,
    marginVertical: 10,
  }
})