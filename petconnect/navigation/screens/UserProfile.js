import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity,TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserProfile({ navigation }) {
  // Sample user data, replace this with your actual user data
  const user = {
    name: 'Kyuji',
    age: 10,
    bio: 'I love biting ankles and doggies! owa owa frfrsssssssssssssssssssss',
    imageUrl: require('./shiba.png'), 
  };
  //
  return (
    <View style={styles.container}>
      <Image source={user.imageUrl} style={styles.profileImage} />
      <Text style={styles.name}>{user.name}, {user.age}</Text>
      <View style = {styles.action} >
        <FontAwesome name="paw" size={20}/>
        <TextInput
        placeholder='First Name'
        placeholderTextColor='#666666'
        autoCorrect={false}
        
        />
      </View>
      <Text style={styles.bio}>{user.bio}</Text>
      

      {/* Add buttons or links to edit the profile or perform other actions */}
     
      <View style={styles.BtnWrapper}>
        <TouchableOpacity style = {styles.Btn} onPress={()=>{navigation.navigate('Edit')}}>
          <Text style={styles.userBtnTxt}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.Btn} onPress={()=>{navigation.navigate('Likes');}}>
          <Text style={styles.userBtnTxt}>View Likes</Text>
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
    //justifyContent: 'center',
    padding: 20,
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
    marginTop: 30,
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
    marginBottom: 10,
    marginRight:200,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#333333',
  },
});