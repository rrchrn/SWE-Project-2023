import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../../firebase.ignore.js';
import petProfiles from './images/petProfiles.json';

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

export default function LikesPage() {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Get the current user
    const user = auth.currentUser;

    if (user) {
      // Fetch liked profiles from Firestore
      db.collection('users')
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const likesArray = doc.data().likes || [];
            setLikedProfiles(likesArray);
          } else {
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.error('Error getting document:', error);
        });
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  const handleProfilePress = (profileId) => {
    const petInfo = petProfiles[profileId];
    setSelectedProfile({ ...petInfo, image: petImages[petInfo.image] });
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView}>
        {likedProfiles.map((profileId) => (
          <TouchableOpacity
            key={profileId}
            style={styles.profileContainer}
            onPress={() => handleProfilePress(profileId)}
          >
            <Image source={petImages[petProfiles[profileId].image]} style={styles.petImage} />
            <Text>{petProfiles[profileId].name}</Text>
            <Text>{`Age: ${petProfiles[profileId].age}`}</Text>
            <Text>{`Sex: ${petProfiles[profileId].sex}`}</Text>
            <Text>{`Bio: ${petProfiles[profileId].bio}`}</Text>
            <TouchableOpacity onPress={() => console.log(`Schedule Playdate for ${petProfiles[profileId].name}`)}>
              <Text>Schedule Playdate</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Open Modal for Pet Profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={selectedProfile?.image} style={styles.modalPetImage} />
            <Text style={styles.modalText}>Name: {selectedProfile?.name}</Text>
            <Text style={styles.modalText}>Age: {selectedProfile?.age}</Text>
            <Text style={styles.modalText}>Sex: {selectedProfile?.sex}</Text>
            <Text style={styles.modalText}>Bio: {selectedProfile?.bio}</Text>
            
            <Text style={styles.modalText}>Traits: {selectedProfile?.traits?.join(', ')}</Text>

            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={closeModal}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  scrollView: {
    marginTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,        // Add border width
    borderColor: '#ddd',  // Add border color
    borderRadius: 10,      // Add border radius for rounded corners
    padding: 10,          // Add padding for spacing
  },
  petImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 50,  // Make the image circular
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
    width: '75%', // Adjust width
    height: '75%', // Adjust height
  },
  modalPetImage: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    marginBottom: 10, // Space between image
    borderRadius: 75,  // Make the image circular
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
