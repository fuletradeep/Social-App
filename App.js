import React, {useState} from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './Screens/SplashScreen';
import AuthStack from './navigation/AuthStack';
import AppStack from './navigation/MainStack';
import {createStackNavigator} from '@react-navigation/stack';
import Loading from './Screens/Loading';


export default function App() {
  const [loading, setloading] = useState(true);

  setTimeout(() => {
    setloading(false);
  }, 1000);
  const Stack = createStackNavigator();


  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Loading" component={Loading} />
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="App" component={AppStack} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}
