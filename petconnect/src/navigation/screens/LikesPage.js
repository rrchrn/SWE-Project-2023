import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../../firebase.ignore.js';
import petProfiles from './images/petProfiles.json';

export default function LikesPage({navigation}) {
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

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

  const handleSchedulePlaydate = (index) => {
    // Access the profile using the index
    const profile = petProfiles[index];
    if (profile) {
      setSelectedProfile(profile);
      setModalVisible(true);
    } else {
      console.log(`Profile not found for index: ${index}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>This is the Likes Page</Text>
      <ScrollView style={styles.scrollView}>
        {likedProfiles.map((profileName, index) => (
          <TouchableOpacity
            key={profileName}
            style={styles.profileContainer}
            onPress={() => console.log(`Navigate to profile ${profileName}`)}
          >
            {/* Profile Display */}
            <Ionicons name="person" size={50} color="blue" />
            <Text>{`Profile ${profileName}`}</Text>
            <TouchableOpacity onPress={() => handleSchedulePlaydate(index)}>
              <Text>Schedule Playdate</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text>Availability</Text>
          {selectedProfile && Object.entries(selectedProfile.availability).map(([day, times]) => (
            <Text key={day}>{day}: {times.join(', ')}</Text>
          ))}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Close</Text>
          </TouchableOpacity>
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
  modalView: {
    alignSelf: 'center', // Center the modal
    width: '50%', // Set width to 80% of the screen width
    marginTop: 'auto', // These auto margins help in centering vertically
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#2196F3"
  },
});