import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditUserPage() {
  const [name, setName] = useState('Kyuji');
  const [age, setAge] = useState('10');
  const [bio, setBio] = useState('I love biting ankles and doggies! owa owa frfrsssssssssssssssssssss');

  const user = {
    name,
    age,
    bio,
    imageUrl: require('./images/shiba.png'),
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 20, alignItems: 'flex-start' }}>
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.pc}>
            <ImageBackground source={user.imageUrl} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 50 }}>
              <View style={styles.cameraIconContainer}>
                <Icon name="camera" size={35} color="#fff" style={styles.cameraIcon}></Icon>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.editBox}>
        <Text style={styles.editLabel}>Name:</Text>
        <TextInput
          style={styles.editInput}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.editBox}>
        <Text style={styles.editLabel}>Age:</Text>
        <TextInput
          style={styles.editInput}
          value={age}
          onChangeText={(text) => setAge(text)}
          keyboardType="numeric"
          placeholder="Enter your age"
        />
      </View>

      <View style={styles.editBox}>
        <Text style={styles.editLabel}>Bio:</Text>
        <TextInput
          style={styles.editInput}
          value={bio}
          onChangeText={(text) => setBio(text)}
          multiline
          placeholder="Enter your bio"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  pc: {
    height: 100,
    width: 100,
    borderRadius: 15,
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
  editBox: {
    marginBottom: 15,
    width: 300, // Set a fixed width for the input boxes
  },
  editLabel: {
    marginBottom: 5,
    color: 'black',
    fontSize: 16,
  },
  editInput: {
    width: '100%',
    height: 40,
    borderColor: 'purple',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 10,
  },
});
