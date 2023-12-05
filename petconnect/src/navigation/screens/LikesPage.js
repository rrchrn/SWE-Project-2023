import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { auth, db } from '../../../firebase.ignore.js';
import petProfiles from './images/petProfiles.json';

// Image imports
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


export default function LikesPage({ navigation }) {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
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
  }, []);

  const handleProfilePress = (profileId) => {
    const petInfo = petProfiles[profileId];
    setSelectedProfile({ ...petInfo, image: petImages[petInfo.image] });
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text>This is the Likes Page</Text>
      <ScrollView style={styles.scrollView}>
        {likedProfiles.map((profileId) => (
          <TouchableOpacity
            key={profileId}
            style={styles.profileContainer}
            onPress={() => handleProfilePress(profileId)}
          >
            <Image source={petImages[petProfiles[profileId].image]} style={styles.petImage} />
            <Text>{petProfiles[profileId].name}</Text>
            {/* Here you can add more profile details if you want them displayed in the list */}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {selectedProfile && (
            <>
              <Image source={selectedProfile.image} style={styles.modalPetImage} />
              <Text style={styles.modalText}>Name: {selectedProfile.name}</Text>
              <Text style={styles.modalText}>Age: {selectedProfile.age}</Text>
              <Text style={styles.modalText}>Sex: {selectedProfile.sex}</Text>
              <Text style={styles.modalText}>Bio: {selectedProfile.bio}</Text>
              <Text style={styles.modalText}>Traits: {selectedProfile.traits.join(', ')}</Text>
              <Text style={styles.modalText}>Availability:</Text>
              {Object.entries(selectedProfile.availability || {}).map(([day, times]) => (
                <Text key={day} style={styles.modalText}>{day}: {times.join(', ')}</Text>
              ))}
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </>
          )}
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
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalView: {
    alignSelf: 'center',
    width: '80%',
    marginTop: 'auto',
    marginBottom: 'auto',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalPetImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
