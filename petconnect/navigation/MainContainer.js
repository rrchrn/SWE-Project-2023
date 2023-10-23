import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/HomeScreen';
import UserProfile from './screens/UserProfile';
import ChatPage from './screens/ChatPage';
import LikesPage from './screens/LikesPage';
import EditPage from './screens/EditUserProfile';
//Screen names

const homeName = 'Home';
const userPageName = 'User';
const chatName = 'Chat';
const likesName = 'Likes';
const editUser = 'Edit';

const Tab = createBottomTabNavigator();

export default function MainContainer(){
    return (
        <NavigationContainer>
            <Tab.Navigator 
            initialRouteName ={homeName}
            screenOptions ={({route}) => ({
                tabBarIcon: ({focused,color,size}) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === homeName)
                    {
                        iconName = focused ? 'home': 'home-outline'
                    } else if (rn === userPageName)
                    {
                        iconName = focused ? 'person': 'person-outline'
                    } else if (rn === chatName)
                    {
                        iconName = focused ? 'chatbubbles': 'chatbubbles-outline'
                    }
                    return <Ionicons name = {iconName} size = {size} color = {color}/>
                }
            })}>
            
            <Tab.Screen name ={homeName} component = {HomeScreen}/>
            <Tab.Screen name ={chatName} component = {ChatPage}/>
            <Tab.Screen name ={userPageName} component = {UserProfile}/>
            <Tab.Screen name={likesName} component={LikesPage} options={{ tabBarButton: () => null }} />
            <Tab.Screen name={editUser} component={EditPage} options={{ tabBarButton: () => null }} />
            </Tab.Navigator>
        </NavigationContainer>
    )

}