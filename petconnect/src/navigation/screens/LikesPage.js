import React from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth,db} from '../../../firebase.ignore.js'

export default function LikesPage() {
  return (
    <View style = {styles.container}>
      <Text>This is the Likes Page</Text>
      <Ionicons name="heart" size={50} color="red" />
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
  });
  