import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity,ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function EditUserPage() {

    const user = {
        name: 'Kyuji',
        age: 10,
        bio: 'I love biting ankles and doggies! owa owa frfrsssssssssssssssssssss',
        imageUrl: require('./shiba.png'), 
      };
    return (
      <View style = {styles.container}>
        <View style={{margin:20}}>  
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={()=>{}}>
                    <View style={styles.pc}>
                       <ImageBackground source={user.imageUrl} style={{ height: 100, width: 100 }} imageStyle={{ borderRadius: 50 }}>
                            <View style = {styles.cameraIconContainer}>
                                <Icon name="camera" size={35} color="#fff" style={styles.cameraIcon}>

                                </Icon>
                            </View>

                        </ImageBackground>
    
                    </View>

                </TouchableOpacity>
            </View>
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
      },
      pc:{
        height:100,
        width:100,
        borderRadius: 15,
       // justifyContent:'center',
        //alignItems:'center',
      },
      cameraIconContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
      },
      cameraIcon:{
        opacity:0.7,
        borderWidth:1,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#fff',

        
      },

    });
    