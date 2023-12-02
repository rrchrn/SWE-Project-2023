import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from "../../../firebase.ignore";

export default function UserProfile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hardcoded image sources
  const images = [
    require('./images/shiba2.png'),
    require('./images/shiba3.png'),
    require('./images/shiba4.png'),
    require('./images/shiba5.png'),
    require('./images/shiba6.png'),
    require('./images/shiba7.png')
  ];

  // Main profile image source
  const mainImage = require('./images/shiba.png');

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const docRef = db.collection('users').doc(auth.currentUser.uid);
          const doc = await docRef.get();

          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Signed out');
        navigation.navigate('Login'); // Replace 'Login' with your actual login screen route name
      })
      .catch(error => alert(error.message));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No user data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {/* Main profile image */}
        <Image source={mainImage} style={styles.mainImage} />

        {/* Existing user data display */}
        <Text style={styles.name}>{userData.name}, {userData.age.toString()}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.gender}>Gender: {userData.gender}</Text>

        {/* Buttons */}
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Edit')}>
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Likes')}> 
            <Text style={styles.btnText}>View Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
            <Text style={styles.btnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* Section title for photos */}
        <Text style={styles.photoSectionTitle}>Photos</Text>

        {/* Images display */}
        <View style={styles.photoGrid}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.photoItem} />
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
  },
  gender: {
    fontSize: 16,
    marginBottom: 10,
  },
  btn: {
    borderColor: '#B200ED',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  btnText: {
    color: '#B200ED',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  mainImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  photoItem: {
    width: 110,
    height: 110,
    margin: 5,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  photoSectionTitle: {
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
});
