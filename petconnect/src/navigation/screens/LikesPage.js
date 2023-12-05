import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Image, Dimensions, Platform } from 'react-native';
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

const traitColors = ['#bbfefb', '#febbbe', '#fefbbb']; // New colors for the ovals
const window = Dimensions.get('window');

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
  
  const closeModal = () => {
    setModalVisible(false);
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
            <Text style={styles.modalNameText}>{petProfiles[profileId].name}</Text>
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
              onPress={closeModal} // Make sure this function is defined in your component
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
    marginBottom: 20, // Increase space between profiles
    padding: 20, // Add padding inside the container
    borderWidth: 1, // Add a border
    borderColor: '#e1e1e1', // Light grey border color
    borderRadius: 10, // Rounded corners for the border
    width: '90%', // Make the container a bit larger
    alignSelf: 'center', // Center the container
    backgroundColor: '#fff', // White background for the container
    shadowColor: '#000', // Shadow for elevation
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3, // Slight elevation for a subtle drop shadow
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
        width: '85%', // or any other specific dimension for iOS
        height: '60%',
      },
      android: {
        width: '80%',
        height: '60%',
      },
      web: {
        width: '50%', // you might need a different dimension for web
        height: '80%',
      },
    }),
    flexDirection: 'column', // Stack children vertically
    justifyContent: 'space-between', // Distribute space between children
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
    backgroundColor: '#befebb', // example color for available times
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'center', 
    marginHorizontal: 10, // space between buttons if needed
    marginTop: 4, // space above the button
  },
  pendingButton: {
    // Similar styles as scheduleButton but with different backgroundColor
    backgroundColor: '#fefbbb', // example color for pending times
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
    flexGrow: 1, // This ensures the content grows to fill the space
    justifyContent: 'center', // Adjust this as per your design
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trait: {
    backgroundColor: 'transparent', // this will be dynamically changed
    borderRadius: 20, // rounded edges
    paddingHorizontal: 10, // horizontal padding inside the oval
    paddingVertical: 5, // vertical padding inside the oval
    margin: 4, // space between each trait
    alignSelf: 'center'
  },
  modalNameText: {
    // This will specifically apply to the pet's name
    fontSize: 20,
    fontWeight: '475', // Bold like 'nametext' style
    textAlign:'center'
  },
  modalBioText: {
    fontWeight: '300', // Lighter like 'text' style
    marginTop: 15, // Larger space before the bio
    marginBottom: 15, // Larger space after the bio
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
    flexDirection: 'row', // aligns traits in a row
    flexWrap: 'wrap', // allows traits to wrap to the next line
    justifyContent: 'center', // aligns containers to the start of the flex direction
  },
  dayContainer: {
    marginVertical: 5, // space between each day
  },
  timeText: {
    fontWeight: '300',
    marginRight: 10, // space between the time text and the button
  },
});
