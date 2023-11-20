import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const LoginScreen = () => {
  return (
   <KeyboardAvoidingView
      style={styles.container} 
      behavior='padding' >
    <View 
      style = {styles.inputcontainer}>
      <TextInput 
        placeholder='Email' 
        /*value={} 
        onChangeText={text => }*/ 
        style = {styles.input} 
        placeholderTextColor="#000">

      </TextInput>
      <TextInput 
        placeholder='Password' 
        /*value={} 
        onChangeText={text => }*/ 
        style = {styles.input} 
        secureTextEntry 
        placeholderTextColor="#000">
      </TextInput>
    </View>
    <View style = {styles.buttonContainer}>
      <TouchableOpacity
        onPress={()=> { }}
        style={styles.button}
      >
       <Text style={styles.buttonText}>Login</Text> 
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> { }}
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
  container: {

  },
  inputcontainer: {

  },
  input: {

  },
  buttonContainer: {

  },
  button: {

  },
  buttonText: {

  },
  buttonOutline: {
    
  },
  buttonOutlineText: {

  },
})