// import all necessary tools/components
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// all the app screens
import HomeScreen from './screens/HomeScreen.js';
import UserProfile from './screens/UserProfile.js';
import ChatPage from './screens/ChatPage.js';
import EditPage from './screens/EditUserProfile.js';
import LikesPage from './screens/LikesPage.js';
import LoginScreen from './screens/LoginScreen.js'; 
import Registration from './screens/Registration.js';
import { auth } from '../../firebase.ignore.js';

// screens
const homeName = 'Home';
const userPageName = 'User';
const chatName = 'Chat';
const likesName = 'Likes';
const editUser = 'Edit';
const loginpage = 'PetConnect';
const registration = 'Registration';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

export default function MainContainer() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // have to be logged in to use the app
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  // navigation bar
  return (
    <NavigationContainer>
      {isLoggedIn ? ( 
        <Tab.Navigator
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;

              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
              } else if (rn === userPageName) {
                iconName = focused ? 'person' : 'person-outline';
              } else if (rn === likesName) {
                iconName = focused ? 'heart' : 'heart-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#7076fd',
          })}>
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={likesName} component={LikesPage} />
          <Tab.Screen name={userPageName} component={UserProfile} />
          <Tab.Screen name={editUser} component={EditPage} options={{ tabBarButton: () => null }} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name={loginpage} component={LoginScreen} options={{ headerShown: false }}  />
          <Stack.Screen name={registration} component={Registration} /> 
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

