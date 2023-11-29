import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity,TextInput,FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {auth} from "../../../firebase.ignore"

export default function UserProfile({ navigation }) {
  // Sample user data, replace this with your actual user data

  const currentUser = auth.currentUser;

  const user = {
    name: "Dog",
    age: 5,
    bio: 'Hi my name is Kyuji the Shiba. I love biting ankles and doggies. Please have a fun playdate with me and my human ',
    imageUrl: require('./images/shiba.png'),
    sex: 'Male',
    breed: 'shiba inu',
    nature: 'Timid',
    from: 'Arlington Texas',
    email: currentUser ? currentUser.email : "", // Add the user's email to the user object if logged in
    photos: [
      require('./images/shiba2.png'),
      require('./images/shiba3.png'),
      require('./images/shiba4.png'),
      require('./images/shiba5.png'),
      require('./images/shiba6.png'),
      require('./images/shiba7.png')
    ],
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(userCredentials => {
        console.log('Signed out ' + user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Image source={user.imageUrl} style={styles.profileImage} />
      <Text style={styles.name}>{user.name}, {user.age}</Text>
      <Text style={styles.action}>{user.sex} | {user.breed} | {user.nature}</Text>
      <View style={styles.fromContainer}>
        <FontAwesome name="location-arrow" size={20} style={styles.fromIcon} />
        <Text style={styles.fromText}>{user.from}</Text>
      </View>
      {currentUser ? <Text style={styles.email}>{user.email}</Text> : null}
      <Text style={styles.bio}>{user.bio}</Text>

      {/* Add buttons or links to edit the profile or perform other actions */}
      <View style={styles.BtnWrapper}>
        <TouchableOpacity style={styles.Btn} onPress={() => { navigation.navigate('Edit') }}>
          <Text style={styles.userBtnTxt}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn} onPress={() => { navigation.navigate('Likes'); }}>
          <Text style={styles.userBtnTxt}>View Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Btn} onPress={handleSignOut}>
          <Text style={styles.userBtnTxt}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.PhotoTitle}>Photos</Text>

      <View style={styles.photoGrid}>
        {user.photos.map((photo, index) => (
          <Image key={index} source={photo} style={styles.photoItem} />
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    padding: 20,
  },
  profileImage: {
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
  },
  PhotoTitle:{
    marginRight:270,
    paddingBottom:10,
    paddingTop:10,
    //fontWeight:'bold',
    fontSize: 24,
  },
  name: {
    fontSize: 24,
    //fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    marginTop: 10,
    marginBottom:30,
  },
  Btn: {
    //borderColor: '#2e64e5',
    borderColor: '#B200ED',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#B200ED',
  },
  BtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    //marginBottom: 10,
   // marginRight:200,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignContent:'center',
  },
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});