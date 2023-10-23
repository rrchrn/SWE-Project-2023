import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default function UserProfile({ navigation }) {
  // Sample user data, replace this with your actual user data
  const user = {
    name: 'Kyuji',
    age: 10,
    bio: 'I love biting ankles and doggies!',
    imageUrl: require('./shiba.png'), 
  };
  //
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.imageUrl }} style={styles.profileImage} />
      <Text style={styles.name}>{user.name}, {user.age}</Text>
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Add buttons or links to edit the profile or perform other actions */}
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
      <Button title="Logout" onPress={() => navigation.navigate('Logout')} />
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    marginTop: 10,
  },
});