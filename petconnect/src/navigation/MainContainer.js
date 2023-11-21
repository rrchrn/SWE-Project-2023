import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Screens
import HomeScreen from './screens/HomeScreen.js';
import UserProfile from './screens/UserProfile.js';
import ChatPage from './screens/ChatPage.js';
import EditPage from './screens/EditUserProfile.js';
import LoginScreen from './screens/LoginScreen.js';
import LikesPage from './screens/LikesPage.js';
import {auth} from '../../firebase.ignore.js'

//Screen names
const homeName = 'Home';
const userPageName = 'User';
const chatName = 'Chat';
const likesName = 'Likes';
const editUser = 'Edit';
const loginpage = "PetConnect"

const Tab = createBottomTabNavigator();

export default function MainContainer(){

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

      React.useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);



    return (
       <NavigationContainer>
      <Tab.Navigator
        initialRouteName={isLoggedIn ? homeName : loginpage} // Set the initial route based on the login status
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === userPageName) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === chatName) {
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        {isLoggedIn ? (
          <>
            <Tab.Screen name={homeName} component={HomeScreen} />
            <Tab.Screen name={chatName} component={ChatPage} />
            <Tab.Screen name={userPageName} component={UserProfile} />
            <Tab.Screen name={likesName} component={LikesPage} options={{ tabBarButton: () => null }} />
            <Tab.Screen name={editUser} component={EditPage} options={{ tabBarButton: () => null }} />
          </>
        ) : (
          <Tab.Screen name={loginpage} component={LoginScreen} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );

}