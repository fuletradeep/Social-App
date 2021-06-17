import React from 'react';
import {View, Image, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function SplashScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightpink',
      }}>
      <Image
        style={{
          width: width / 3,
          height: width / 3,
          shadowColor: 'grey',
          shadowOffset: {height: 4, width: 4},
          shadowOpacity: 3,
        }}
        source={require('../assets/logo.png')}
      />
    </View>
  );
}
