import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from '@react-native-firebase/storage'
import Loading from './Loading'
// import firebase from 'firebase'


export default function Home() {
  const [fileUri, setFileUri] = useState('');
  const [loading,isLoading] = useState(false)

  const chooseImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        Height: 200,
        Width: 200,
      },
      async response => {
        console.log(response);
        // await AsyncStorage.setItem('logoImg', response.uri);
        setFileUri(response.uri);
        const uploadURL = response.uri
         addProfileImg(uploadURL)
      },
    );
  };

  const addProfileImg = async(uploadURL) => {
    isLoading(true)
    try{
      await storage().ref(`profile/`).child(`${auth().currentUser.email}`).putFile(uploadURL)
      isLoading(false)
      alert('Profile Add SucseccFully')
    }catch(e){
      console.log(e);
    }
  }

  const renderFile = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return (
        <Image source={require('../assets/dumy.png')} style={styles.images} />
      );
    }
  };

  return (
    <ScrollView style={{flex:1}}>
      {loading && <View
          style={{
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5,
            height: height,
            width: width,
          }}>
          <ActivityIndicator size={30} color="blue" />
        </View>}
        <View>

        
      <View
        style={{
          backgroundColor: '#C71585',
          width: width / 1.5,
          height: width / 1.5,
          top: -140,
          borderRadius: width / 1.5,
        }}
      />
      <View
        style={{
          backgroundColor: '#4169E1',
          width: width / 1.5,
          height: width / 1.5,
          top: -360,
          left: 210,
          borderRadius: 230,
        }}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '-75%',
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{
            width: width / 4,
            height: width / 4,
          }}
        />
      </View>

      <Text
        style={{
          color: '#4169E1',
          fontSize: 30,
          fontWeight: '500',
          marginLeft: width / 30,
          marginTop: '3%',
        }}>
        WelCome To Social App
        <Text style={{color: '#C71585',fontWeight:'bold',marginTop:'5%'}}>
          {auth().currentUser.displayName}
        </Text>
      </Text>

      {renderFile()}
      <TouchableOpacity
        onPress={() => chooseImage()}
        style={{marginLeft: '58%', top: -18}}>
        <Image
          source={require('../assets/plus.png')}
          style={{
            width: width / 15,
            height: width / 15,
            borderRadius: 15,
          }}
        />
      </TouchableOpacity>
      <Text style={{color: '#C71585', textAlign: 'center', fontSize: 20}}>
        Set Profile Image
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#C71585',
          marginLeft: width / 30,
          marginRight: width / 30,
          marginTop: width / 10,
        }}
        onPress={() =>
          auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            padding: '3%',
            color: 'white',
          }}>
          Logout
        </Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  images: {
    width: width / 4,
    height: width / 4,
    marginTop: '3%',
    marginLeft: '38%',
    //   position: 'absolute',
    //   borderRadius: 50,
    //   top: '15%',
    //   left: '68%',
  },
});
