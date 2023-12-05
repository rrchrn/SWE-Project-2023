// import all necessary tools/components
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import petProfiles from './images/petProfiles.json';
import {auth, db} from '../../../firebase.ignore.js'
import firebase from 'firebase/compat/app';

// trait colors for pet profiles
const traitColors = ['#bbfefb', '#febbbe', '#fefbbb']; 

export default function HomeScreen({ navigation }) {
  // pet profiles and popup cards
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const currentPet = petProfiles[currentPetIndex];

  // pet images
  const petImages = {
    'dog1.jpg': require('./images/dog1.jpg'),
    'dog2.jpg': require('./images/dog2.jpg'),
    'dog3.jpg': require('./images/dog3.jpg'),
    'dog4.jpg': require('./images/dog4.jpg'),
    'cat1.jpg': require('./images/cat1.jpg'),
    'cat2.jpg': require('./images/cat2.jpg'),
    'cat3.jpg': require('./images/cat3.jpg'),
    'cat4.jpg': require('./images/cat4.jpg'),
  };

  // functionality to show next pet
  const showNextPet = () => {
    if (currentPetIndex < petProfiles.length - 1) {
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      navigation.navigate('Likes');
    }
  };

  // store pet profile to the cloud firestore 
  const handleLike = () => {
    const likedPetIndex = currentPetIndex;
  
    const user = auth.currentUser;
  
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(likedPetIndex),
        })
        .then(() => {
          console.log('liked pet index added to Firestore');
          showNextPet(); 
        })
        .catch((error) => {
          console.error('rror: did not add: ', error);
        });
    } else {
      console.error('no user signed in');
    }
  };
  

  // dislike a pet
  const handleDislike = () => {
    showNextPet();
  };

  // popup card for pet profile
  const openModal = () => {
    setModalVisible(true);
  };

  // close popup card
  const closeModal = () => {
    setModalVisible(false);
  };

  // create the hoem page front end
  return (
    <View style={styles.container}>
      <Text style={styles.maintext}>PetConnect</Text>
      <View style={styles.card}>
        <TouchableOpacity onPress={openModal}>
          <Image source={petImages[currentPet.image]} style={styles.petImage} />
          <Text style={styles.nametext}>{currentPet.name}</Text>
          <Text style={styles.text}>{currentPet.age}</Text>
          <Text style={styles.text}>{currentPet.sex}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.dislike} onPress={handleDislike}>
          <Ionicons name="heart-dislike-circle-outline" size={75} color="#fd7076" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.like} onPress={handleLike}>
          <Ionicons name="heart-circle-outline" size={75} color="#76fd70" />
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
            <View style={styles.imageContainer}>
              <Image source={petImages[currentPet.image]} style={styles.modalPetImage} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.modalNameText}>{currentPet.name}</Text>
              <Text style={styles.modalText}>{currentPet.age}</Text>
              <Text style={styles.modalText}>{currentPet.sex}</Text>
              <Text style={styles.modalBioText}>{currentPet.bio}</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {currentPet.traits.map((trait, index) => (
                  <View key={index} style={[styles.trait, { backgroundColor: traitColors[index % traitColors.length] }]}>
                    <Text>{trait}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// styling
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
    fontWeight: '400'
  },
  text: {
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
    ...Platform.select({
      ios: {
        width: '80%', 
        height: '60%',
      },
      android: {
        width: '80%',
        height: '60%',
      },
      web: {
        width: '50%', 
        height: '80%',
      },
    }),
    flexDirection: 'column', 
    justifyContent: 'space-between', 
  },
  imageContainer: {
    width: '100%', 
    alignItems: 'center', 
    marginBottom: 20, 
    flex: 1
  },
  modalPetImage: {
    width: 150,
    height: 150, 
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  textContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  modalPetImage: {
    width: 150, 
    height: 150, 
    marginBottom: 50, 
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20
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
    textAlign: 'center',
    fontWeight: '300'
  },
  modalNameText: {
    fontSize: 20,
    fontWeight: '400', 
    textAlign:'center'
  },
  modalBioText: {
    fontWeight: '300', 
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
  trait: {
    backgroundColor: 'transparent', 
    borderRadius: 20, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    margin: 4, 
    alignItems: 'center',
    justifyContent: 'center',
  },
});
