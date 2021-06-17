import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CreatePost from '../Screens/CreatePost';
import {Image} from 'react-native'
import ShowPost from '../Screens/ShowPost';
import Profile from '../Screens/Profile';
import Home from '../Screens/Home';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { color } from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#ff00ff',
        inactiveTintColor: 'grey',
        labelStyle:{fontSize:15},
        style:{
          height:'7.2%',
        }
      }}
      >
      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome5 name={'home'} solid size={25} color={color}/>
          ),
        }}
      />

      <Tab.Screen
        name="ShowPost"
        component={ShowPost}
        options={{
          tabBarLabel: 'ShowPost',
          tabBarIcon: ({color}) => (
            <FontAwesome5 name={'comment'}  size={25} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          tabBarLabel: 'createPost',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome5 name={'plus'} solid size={25} color={color}/>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome5 name={'user'} solid size={25} color={color}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
