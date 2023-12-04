import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../../firebase.ignore.js';

export default function LikesPage({navigation}) {
  const [likedProfiles, setLikedProfiles] = useState([]);

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

  const handleSchedulePlaydate = (profileId) => {
    // Implement your playdate scheduling logic here
    console.log(`Scheduling playdate for profile ${profileId}`);
    navigation.navigate('Chat');
  };

  return (
    <View style={styles.container}>
      <Text>This is the Likes Page</Text>
      <ScrollView style={styles.scrollView}>
        {likedProfiles.map((profileId) => (
          <TouchableOpacity
            key={profileId}
            style={styles.profileContainer}
            onPress={() => console.log(`Navigate to profile ${profileId}`)}
          >
            {/* Replace the following with your profile information */}
            <Ionicons name="person" size={50} color="blue" />
            <Text>{`Profile ${profileId}`}</Text>
            <TouchableOpacity onPress={() => handleSchedulePlaydate(profileId)}>
              <Text>Schedule Playdate</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
});
