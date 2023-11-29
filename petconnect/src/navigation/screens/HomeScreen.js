import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
  const availablePets = [
    {
      name: 'Buddy',
      age: '2 years',
      sex: 'Male',
      image: require('./images/dog3.jpg'),
    },
    {
      name: 'Darren',
      age: '9 years',
      sex: 'Male',
      image: require('./images/dog2.jpg'),
    },
    {
      name: 'Lily',
      age: '3 years',
      sex: 'Female',
      image: require('./images/dog1.jpg'),
    },
    {
      name: 'Ashley',
      age: '4 years',
      sex: 'Female',
      image: require('./images/dog4.jpg'),
    }
  ];

  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>PetConnect</Text>
      <View style={styles.card}>
        <TouchableOpacity onPress={openModal}>
          <Image source={currentPet.image} style={styles.petImage} />
          <Text style={styles.nametext}>{currentPet.name}</Text>
          <Text style={styles.text}>{currentPet.age}</Text>
          <Text style={styles.text}>{currentPet.sex}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.dislike} onPress={handleDislike}>
          <Ionicons name="heart-dislike-circle-outline" size={75} color="#fd7076"/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.like} onPress={handleLike}>
          <Ionicons name="heart-circle-outline" size={75} color="#76fd70"/>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name: {currentPet.name}</Text>
            <Text style={styles.modalText}>Age: {currentPet.age}</Text>
            <Text style={styles.modalText}>Sex: {currentPet.sex}</Text>
            <Text style={styles.modalText}>Additional info: Lorem ipsum...</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.25,
  },
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
    marginTop: 0,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  like: {
    marginHorizontal: 10,
    padding: 5
  },
  dislike: {
    marginHorizontal: 17,
    padding: 5
  },
  maintext: {
    paddingBottom: 10,
    fontSize: 30
  },
  nametext: {
    paddingTop: 10,
    fontSize: 20,
    textAlign: 'left',
    fontWeight: '500'
  },
  text : {
    textAlign: 'left',
    fontWeight: '300'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#7076fd',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});