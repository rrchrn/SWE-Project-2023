import * as React from 'react';
import MainContainer from './src/navigation/MainContainer';
import { AppRegistry } from 'react-native';
AppRegistry.registerComponent('YourAppName', () => App);


function App(){
  return (
    <MainContainer/>
  );
}

export default App;


// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
