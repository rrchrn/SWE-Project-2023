import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const [currentPet, setCurrentPet] = useState({
    name: 'Buddy',
    age: '2 years',
    sex: 'Male',
    image: require('./dog3.jpg'),
  });

  const handleLike = () => {
    // Save the current pet profile to the 'Liked' page (you need to implement this)
    // Display a new pet profile (update the 'currentPet' state)
  };

  const handleDislike = () => {
    // Display a new pet profile (update the 'currentPet' state)
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.maintext}>PetConnect</Text>
      <View>
        <Image source={currentPet.image} style={styles.petImage} />
        <Text>Name: {currentPet.name}</Text>
        <Text>Age: {currentPet.age}</Text>
        <Text>Sex: {currentPet.sex}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style = {styles.dislike} onPress={handleDislike}>
            <Ionicons name = "thumbs-down-outline" size = {50}/>
          </TouchableOpacity>
          <TouchableOpacity style = {styles.like} onPress={handleLike}>
            <Ionicons name = "thumbs-up-outline" size = {50}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petImage: {
    width: 200,
    height: 200,
  },
  icon: {
    width: 30,
    height: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    width: 120,
    paddingHorizontal: 20, // Add horizontal padding to create space
  },
  like: {
    paddingLeft:35

  },
  dislike: {
    paddingRight: 20
    

  },
  maintext: {
    paddingBottom: 30
  }
});
