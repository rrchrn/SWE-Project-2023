import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LikedProfilesArray = [1, 2, 4, 5];

export default function LikesPage() {
  const [likedProfiles, setLikedProfiles] = useState(LikedProfilesArray);

  const handleSchedulePlaydate = (profileId) => {
    // Implement your playdate scheduling logic here
    console.log(`Scheduling playdate for profile ${profileId}`);
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
