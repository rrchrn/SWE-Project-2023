import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../../firebase.ignore.js';

export default function EditUserPage() {
  const [user, setUser] = useState({
    name: 'Kyuji',
    age: 10,
    gender: 'Male',
    typeOfDog: 'Shiba Inu',
    personality: 'Playful and Energetic',
    bio: 'I love biting ankles and doggies! owa owa frfrsssssssssssssssssssss',
    imageUrl: require('./images/shiba.png'),
  });

  const [editingField, setEditingField] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = (field) => {
    setEditingField(field);
  };

  const saveChanges = (newText, field) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: newText,
    }));
    setEditingField('');
  };

  const renderFieldContent = (title, value, field) => {
    if (editingField === field) {
      return (
        <TextInput
          style={styles.editableTextInput}
          value={value}
          onChangeText={(text) => setUser({ ...user, [field]: text })}
          onBlur={() => saveChanges(value, field)}
        />
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

  const handleUpdate = () => {
    // Implement logic to update the user profile in the database
    // You can use the 'user' state object to get the updated values
    // For demonstration purposes, I'll just log the updated user object
    console.log('Updated User:', user);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleEditProfile('profile')}>
        <View style={styles.pc}>
          <ImageBackground
            source={user.imageUrl}
            style={styles.profileImage}
            imageStyle={styles.profileImageBorderRadius}>
            <View style={styles.cameraIconContainer}>
              <Icon name="camera" size={35} color="#fff" style={styles.cameraIcon} />
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <View style={styles.fieldsContainer}>
        {renderEditableField('Name:', user.name, 'name')}
        {renderEditableField('Age:', user.age.toString(), 'age')}
        {renderEditableField('Gender:', user.gender, 'gender')}
        {renderEditableField('Type of Dog:', user.typeOfDog, 'typeOfDog')}
        {renderEditableField('Personality:', user.personality, 'personality')}
        {renderEditableField('Bio:', user.bio, 'bio')}
        {isEditing && (
          <Button title="Update" onPress={handleUpdate} />
        )}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 20,
  },
  pc: {
    height: 120,
    width: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  profileImage: {
    height: '100%',
    width: '100%',
  },
  profileImageBorderRadius: {
    borderRadius: 60,
  },
  cameraIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    opacity: 0.7,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  fieldsContainer: {
    marginLeft: 20,
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  fieldTitle: {
    fontWeight: 'bold',
    fontSize: 16,
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
});
