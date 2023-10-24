import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const availablePets = [
    {
      name: 'Buddy',
      age: '2 years',
      sex: 'Male',
      image: require('./dog3.jpg'),
    },
    {
      name: 'Darren',
      age: '9 years',
      sex: 'Male',
      image: require('./dog2.jpg'),
    },
    {
      name: 'Lily',
      age: '3 years',
      sex: 'Female',
      image: require('./dog1.jpg'),
    },
    {
      name: 'Ashley',
      age: '4 years',
      sex: 'Female',
      image: require('./dog4.jpg'),
    }
  ];

  const [currentPetIndex, setCurrentPetIndex] = useState(0);

  const currentPet = availablePets[currentPetIndex];

  const showNextPet = () => {
    // Display the next pet profile
    if (currentPetIndex < availablePets.length - 1) {
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      // If all pets have been shown, navigate to the 'LikesPage'
      navigation.navigate('Likes');
    }
  };

  const handleLike = () => {
    // Add the liked pet to the 'likedPets' state
    showNextPet();
  };

  const handleDislike = () => {
    showNextPet();
  };

  return (
    <View style={styles.container}>
      <Text style = {styles.maintext}>PetConnect</Text>
      <View>
        <Image source={currentPet.image} style={styles.petImage} />
        <Text style = {styles.nametext}>Name: {currentPet.name}</Text>
        <Text style = {styles.text}>Age: {currentPet.age}</Text>
        <Text style = {styles.text}>Sex: {currentPet.sex}</Text>
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
    paddingRight: 25
    

  },
  maintext: {
    paddingBottom: 35,
    fontSize: 30
  },
  nametext: {
    paddingTop: 20,
    textAlign: 'center'
  },
  text : {
    textAlign: 'center'
  }
});