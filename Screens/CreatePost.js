import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import firebase from '../Database/Database';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

export default function CreatePost({navigation}) {
  dbRef = firebase.firestore().collection('post');
  const [fileUri, setFileUri] = useState('');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferd, setTransferd] = useState();
  const [loading, setloading] = useState(false);

  const renderFile = () => {
    if (fileUri) {
      return <Image source={{uri: fileUri}} style={styles.images} />;
    } else {
      return (
        <Image source={require('../assets/dumy.png')} style={styles.images} />
      );
    }
  };

  const chooseImage = () => {
    setloading(true);
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        Height: 200,
        Width: 200,
      },
      async response => {
        console.log(response);
        setFileUri(response.uri);
        // temp.push(fileUri)
        // await storage().ref('post').child(`/${auth().currentUser.email}`).child(`/${auth().currentUser.displayName}`).putFile(temp)
        // alert('Profile Add SucseccFully')
        setloading(false);
        // addProfileImg();
      },
    );
  };

  addProfileImg = async () => {
    const uploadURL = fileUri;
    let filename = uploadURL.substring(uploadURL.lastIndexOf('/') + 1);

    let task = storage().ref(`post/${filename}`).putFile(uploadURL);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferd(
        Math.random(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });
    try {
      await task;
      const url = await storage().ref(`post/${filename}`).getDownloadURL();
      // alert('Profile Add SucseccFully');
      return url;
    } catch (e) {
      console.log(e);
    }
  };

  const addPost = async (title, caption) => {
    // setloading(true)
    setUploading(true);

    const fireStorageUri = await addProfileImg();
    const profileImg = await storage().ref(`profile/`).child(`${auth().currentUser.email}`).getDownloadURL()
    console.log('start');
    // setloading(true);
    dbRef
      .add({
        title,
        caption,
        img: fireStorageUri,
        userName: auth().currentUser.displayName,
        profileImg,
        time:firestore.Timestamp.fromDate(new Date()).toDate()
      })
      .then(res => {
        setTitle('');
        setCaption('');
        setFileUri(''), setUploading(false);
        navigation.navigate('ShowPost');
        // Alert.alert('Post Added');
        setloading(false);
      })
      .catch(err => {
        console.error('Error found: ', err);
        setloading(false);
      });
  };

  return (
    <ScrollView style={{flex: 1}}>
      {uploading ? (
        <View
          style={{
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: 0.5,
            height: height,
            width: width,
          }}>
          <ActivityIndicator size={30} color="blue" />
          <Text style={{color: 'blue', fontSize: 30, fontWeight: 'bold'}}>{transferd} % </Text>
            
        </View>
      ) : (
        <>
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
          <Text
            style={{
              color: '#4169E1',
              fontSize: 40,
              fontWeight: 'bold',
              top: -320,
              textAlign: 'center',
            }}>
            Create <Text style={{color: '#C71585'}}>Post</Text>
          </Text>
          {renderFile()}
          <TouchableOpacity
            onPress={() => chooseImage()}
            style={{marginLeft: '45%', top: '-16%'}}>
            <Image
              source={require('../assets/plus.png')}
              style={{
                width: width / 10,
                height: width / 10,
                borderRadius: 15,
              }}
            />
          </TouchableOpacity>
          <KeyboardAvoidingView
            style={{
              marginTop: '-7%',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginLeft: width / 20,
              marginRight: width / 20,
              padding: 5,
            }}>
            <TextInput
              placeholder="Title..."
              placeholderTextColor="grey"
              value={title}
              onChangeText={title => setTitle(title)}
              color="#4169E1"
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            style={{
              marginTop: '3%',
              borderBottomColor: 'grey',
              borderBottomWidth: 1,
              marginLeft: width / 20,
              marginRight: width / 20,
              padding: 5,
            }}>
            <TextInput
              placeholder="Caption..."
              placeholderTextColor="grey"
              value={caption}
              onChangeText={caption => setCaption(caption)}
              color="#4169E1"
            />
          </KeyboardAvoidingView>
          <View style={{alignItems: 'flex-end'}}>
            <View
              style={{
                backgroundColor: '#C71585',
                height: width / 6,
                width: width / 6,
                borderRadius: width / 6,
                marginTop: '5%',
                padding: '4.8%',
                marginRight: '5%',
              }}>
              <FontAwesome5
                name={'arrow-right'}
                light
                color="white"
                size={30}
                onPress={() => addPost(title, caption)}
              />
            </View>
          </View>
        </>
      )}
      {/* {loading && (
        <View
          style={{
            flex: 1,
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={30} color="black" />
        </View>
      )} */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  images: {
    width: width / 1,
    height: width / 2,
    marginTop: '-65%',
  },
});
