// import all necessary tools/components
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { auth, db } from "../../../firebase.ignore";

// trait colors for pet profiles
const traitColors = ['#bbfefb', '#febbbe', '#fefbbb']; 
export default function UserProfile({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // user profile pet images
  const images = [
    require('./images/shiba2.png'),
    require('./images/shiba3.png'),
    require('./images/shiba4.png'),
    require('./images/shiba5.png'),
    require('./images/shiba6.png'),
    require('./images/shiba7.png')
  ];

  // main image for pet profile
  const mainImage = require('./images/shiba.png');

  // dispaly the pet profile
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

  // sign out of the app
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('Signed out');
        navigation.navigate('Login'); 
      })
      .catch(error => alert(error.message));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // no user profile data
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>no user data available</Text>
      </View>
    );
  }

  // create the user profile front end
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={mainImage} style={styles.mainImage} />

        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.genderAge}>{userData.age.toString()} years</Text>
        <Text style={styles.genderAge}>{userData.gender}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.bio}>WOOF WOOF! Let's be friends!!!</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
        <View style={[styles.trait, { backgroundColor: traitColors[0] }]}>
          <Text>Happy</Text>
        </View>
        <View style={[styles.trait, { backgroundColor: traitColors[1] }]}>
          <Text>Funny</Text>
        </View>
        <View style={[styles.trait, { backgroundColor: traitColors[2] }]}>
          <Text>Excited</Text>
        </View>
      </View>
        <Text style={styles.photoSectionTitle}>Photos</Text>


        <View style={styles.photoGrid}>
          {images.map((image, index) => (
            <Image key={index} source={image} style={styles.photoItem} />
          ))}
        </View>
        
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Likes')}> 
            <Text style={styles.btnText}>View Likes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={handleSignOut}>
            <Text style={styles.btnText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

// styling
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  name: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 5,
    color: '#7076fd',
    fontWeight: 'bold'
  },
  email: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'300',
  },
  genderAge: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '300'
  },
  bio: {
    fontWeight: '300',
    marginTop: 15,
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 22,
  },
  btn: {
    borderColor: '#7076fd',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#7076fd',
    marginTop: 20
  },
  btnText: {
    color: 'white',
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
    marginTop: 10,
    justifyContent: 'center',
  },
  photoSectionTitle: {
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 300
  },
  trait: {
    backgroundColor: 'transparent', 
    borderRadius: 20, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15
  },
});
