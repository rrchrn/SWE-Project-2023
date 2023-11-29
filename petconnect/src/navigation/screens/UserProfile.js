import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {auth,db} from '../../../firebase.ignore.js'

export default function UserProfile({ route, navigation }) {
  const [user, setUser] = useState({
    name: 'Kyuji',
    age: 5,
    bio: 'Hi my name is Kyuji the Shiba. I love biting ankles and doggies. Please have a fun playdate with me and my human ',
    imageUrl: require('./images/shiba.png'),
    sex: 'Male',
    breed: 'shiba inu',
    nature: 'Timid',
    from: 'Arlington Texas',
    photos: [
      require('./images/shiba2.png'),
      require('./images/shiba3.png'),
      require('./images/shiba4.png'),
      require('./images/shiba5.png'),
      require('./images/shiba6.png'),
      require('./images/shiba7.png'),
    ],
  });

  const [editingField, setEditingField] = useState('');

  const handleEditProfile = (field) => {
    setEditingField(field);
  };

  const saveChanges = (newText) => {
    setUser((prevUser) => ({
      ...prevUser,
      [editingField]: newText,
    }));
    setEditingField('');
  };

  const renderFieldContent = (title, value, field) => {
    if (editingField === field) {
      return (
        <View>
          <TextInput
            style={styles.editableTextInput}
            value={value}
            onChangeText={(text) => setUser({ ...user, [field]: text })}
            onBlur={() => saveChanges(value)}
          />
        </View>
      );
    }

    return <Text style={styles.fieldValue}>{value}</Text>;
  };

  const renderEditableField = (title, value, field) => {
    return (
      <TouchableOpacity key={field} onPress={() => handleEditProfile(field)}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldTitle}>{title}</Text>
          {renderFieldContent(title, value, field)}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image source={user.imageUrl} style={styles.profileImage} />
        </View>
        <Text style={styles.name}>{user.name}, {user.age}</Text>
        <Text style={styles.action}>{user.sex} | {user.breed} | {user.nature}</Text>
        <View style={styles.fromContainer}>
          <FontAwesome name="location-arrow" size={20} style={styles.fromIcon} />
          <Text style={styles.fromText}>{user.from}</Text>
        </View>

        <Text style={styles.bio}>{user.bio}</Text>

        <View style={styles.BtnWrapper}>
          <TouchableOpacity style={styles.Btn} onPress={() => { navigation.navigate('Edit', { user: user }); }}>
            <Text style={styles.userBtnTxt}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Btn} onPress={() => { navigation.navigate('Likes'); }}>
            <Text style={styles.userBtnTxt}>View Likes</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.PhotoTitle}>Photos</Text>

        <View style={styles.photoGrid}>
          {user.photos.map((photo, index) => (
            <Image key={index} source={photo} style={styles.photoItem} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: '#EDDDDD',
    borderRadius: 80,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
  PhotoTitle: {
    marginRight: 270,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  Btn: {
    borderColor: '#B200ED',
    borderWidth: 2,
    borderRadius: 100,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#B200ED',
    fontFamily: 'Roboto',
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
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignContent: 'center',
  },
  fromContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromIcon: {
    marginRight: 5,
  },
  fromText: {
    fontFamily: 'Roboto',
  },
  fieldValue: {
    fontSize: 16,
  },
  editableTextInput: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  fieldContainer: {
    marginBottom: 20,
    width: '100%',
  },
  fieldTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
