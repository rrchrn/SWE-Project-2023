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
  const [scheduleStatus, setScheduleStatus] = useState({}); // New state for managing schedule status

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
      // Initialize schedule status for each availability time
    const initialScheduleStatus = {};
    Object.entries(petProfiles[profileId].availability || {}).forEach(([day, times]) => {
      times.forEach(time => {
        initialScheduleStatus[`${day}_${time}`] = false; // false indicates not scheduled
      });
    });
    setScheduleStatus(initialScheduleStatus);
  };

  const handleScheduleTime = (day, time) => {
    setScheduleStatus(prev => ({
      ...prev, 
      [`${day}_${time}`]: !prev[`${day}_${time}`] // Toggle the status
    }));
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={styles.modalScrollView} contentContainerStyle={styles.modalContentContainer}>
              {selectedProfile && (
                <>
                  <Image source={selectedProfile.image} style={styles.modalPetImage} />
                  <Text style={styles.modalText}>Name: {selectedProfile.name}</Text>
                  <Text style={styles.modalText}>Age: {selectedProfile.age}</Text>
                  <Text style={styles.modalText}>Sex: {selectedProfile.sex}</Text>
                  <Text style={styles.modalText}>Bio: {selectedProfile.bio}</Text>
                  <Text style={styles.modalText}>Traits: {selectedProfile.traits.join(', ')}</Text>
                  {Object.entries(selectedProfile.availability || {}).map(([day, times]) => (
                    <View key={day}>
                      <Text style={styles.modalText}>{day}:</Text>
                      {times.map(time => (
                        <View key={time} style={styles.timeSlotContainer}>
                          <Text style={styles.modalText}>{time}</Text>
                          <TouchableOpacity
                            style={scheduleStatus[`${day}_${time}`] ? styles.pendingButton : styles.scheduleButton}
                            onPress={() => handleScheduleTime(day, time)}
                          >
                            <Text>{scheduleStatus[`${day}_${time}`] ? 'Pending' : 'Schedule Playdate'}</Text>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  ))}
                </>
              )}
            </ScrollView>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
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
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  modalView: {
    width: '80%',
    maxHeight: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: 'center', // Align items in modal view to center
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
    alignSelf: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#7076fd",
    marginTop: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  scheduleButton: {
    backgroundColor: '#befebb',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  pendingButton: {
    backgroundColor: '#fefbbb',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  timeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalScrollView: {
    width: '100%',
  },
  modalContentContainer: {
    flexGrow: 1, // This ensures the content grows to fill the space
    justifyContent: 'center', // Adjust this as per your design
  },
  modalView: {
    alignSelf: 'center',
    width: '80%',
    maxHeight: '80%', // Limit the height of the modal
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
