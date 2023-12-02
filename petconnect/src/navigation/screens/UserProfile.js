import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from "../../../firebase.ignore";

export default function UserProfile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <View style={styles.container}>
      {/* Display user data */}
      <Text style={styles.name}>{userData.name}, {userData.age}</Text>
      <Text style={styles.email}>{userData.email}</Text>
      <Text style={styles.gender}>Gender: {userData.gender}</Text>

      {/* Add buttons or links to edit the profile or perform other actions */}
      <View style={styles.BtnWrapper}>
        <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate('Edit')}>
          <Text style={styles.userBtnTxt}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn} onPress={handleSignOut}>
          <Text style={styles.userBtnTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  Btn: {
    borderColor: '#B200ED',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 10, // Added for spacing between buttons
  },
  userBtnTxt: {
    color: '#B200ED',
  },
  BtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});
