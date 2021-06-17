import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from '../Screens/Loading';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
