// import all necessary tools/components
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Platform } from 'react-native';
import { auth, db } from '../../../firebase.ignore.js';
import petProfiles from './images/petProfiles.json';

// pet images imports
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

// trait colors for pet profiles
const traitColors = ['#bbfefb', '#febbbe', '#fefbbb']; 

export default function LikesPage({ navigation }) {
  // liked profiles and their popupcards with scheduling
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState({}); 

  // show the stored pet profiles
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

  // pop up card
  const handleProfilePress = (profileId) => {
    const petInfo = petProfiles[profileId];
    setSelectedProfile({ ...petInfo, image: petImages[petInfo.image] });
    setModalVisible(true);
    const initialScheduleStatus = {};
    Object.entries(petProfiles[profileId].availability || {}).forEach(([day, times]) => {
      times.forEach(time => {
        initialScheduleStatus[`${day}_${time}`] = false; 
      });
    });
    setScheduleStatus(initialScheduleStatus);
  };

  // scheduling funcitonality
  const handleScheduleTime = (day, time) => {
    setScheduleStatus(prev => ({
      ...prev, 
      [`${day}_${time}`]: !prev[`${day}_${time}`] 
    }));
  };
  
  // close popup card
  const closeModal = () => {
    setModalVisible(false);
  };  

  // create the likes page front end
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
            <Text style={styles.modalNameText}>{petProfiles[profileId].name}</Text>
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
                  <Text style={styles.modalNameText}>{selectedProfile.name}</Text>
                  <Text style={styles.modalText}>{selectedProfile.age}</Text>
                  <Text style={styles.modalText}>{selectedProfile.sex}</Text>
                  <Text style={styles.modalBioText}>{selectedProfile.bio}</Text>
                  <View style={styles.traitsContainer}>
                    {selectedProfile.traits.map((trait, index) => (
                      <View key={index} style={[styles.trait, { backgroundColor: traitColors[index % traitColors.length] }]}>
                        <Text>{trait}</Text>
                      </View>
                    ))}
                  </View>
                  {
                    selectedProfile.availability && Object.entries(selectedProfile.availability).map(([day, times]) => (
                      <View key={day} style={styles.dayContainer}>
                        <Text style={styles.modalText}>{day}:</Text>
                        {times.map((time, index) => (
                          <View key={index} style={styles.timeSlotContainer}>
                            <Text style={styles.timeText}>{time}</Text>
                            <TouchableOpacity
                              style={scheduleStatus[`${day}_${time}`] ? styles.pendingButton : styles.scheduleButton}
                              onPress={() => handleScheduleTime(day, time)}
                            >
                              <Text style={styles.scheduleText}>
                                {scheduleStatus[`${day}_${time}`] ? 'Pending' : 'Schedule Playdate'}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    ))
                  }
                </>
              )}
            </ScrollView>
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

// styling
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
    padding: 20, 
    borderWidth: 1, 
    borderColor: '#e1e1e1', 
    borderRadius: 10, 
    width: '90%', 
    alignSelf: 'center', 
    backgroundColor: '#fff', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, 
  },
  petImage: {
    width: 125,
    height: 125,
    borderRadius: 50,
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
        width: '90%', 
        height: '60%',
      },
      android: {
        width: '90%',
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
  modalPetImage: {
    width: 150,
    height: 150,
    alignSelf: 'center'
  },
  modalText: {
    textAlign: 'center',
    fontWeight: '300'
  },
  scheduleButton: {
    backgroundColor: '#befebb', 
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'center', 
    marginHorizontal: 10, 
    marginTop: 4, 
  },
  pendingButton: {
    backgroundColor: '#fefbbb', 
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'center',
    marginHorizontal: 10,
    marginTop: 4,
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
    flexGrow: 1, 
    justifyContent: 'center', 
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trait: {
    backgroundColor: 'transparent', 
    borderRadius: 20, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    margin: 4, 
    alignSelf: 'center'
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
  traitsContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
  },
  dayContainer: {
    marginVertical: 5, 
  },
  timeText: {
    fontWeight: '300',
    marginRight: 10, 
  },
});
