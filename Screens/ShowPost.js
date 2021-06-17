import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import firebase from '../Database/Database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
const width = Dimensions.get('window').width;

class UserScreen extends Component {
  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('post');
    this.state = {
      isLoading: true,
      userArr: [],
      profileUrl: '',
    };
  }

  componentDidMount() {
    // alert('aaaaa')
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    let imageRef = storage().ref(`${auth().currentUser.email}\profile`);
    imageRef
      .getDownloadURL()
      .then(url => {
        url;
        this.setState({profileUrl: url});
        console.log(',.,.,..,..,.', this.state.profileUrl);
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = querySnapshot => {
    console.log('llllllllllllllllllll', this.state.profileUrl);
    const userArr = [];
    querySnapshot.forEach(res => {
      const {title, img, caption, userName, profileImg, time} = res.data();
      userArr.push({
        key: res.id,
        res,
        title,
        img,
        caption,
        userName,
        profileImg,
        time,
      });
    });
    this.setState({
      userArr,
      isLoading: false,
    });
  };
  show = ({item}) => {
    console.log(moment(item.time).fromNow(), item.time);
    return (
      <View
        style={{
          backgroundColor: '#E6E6FA',
          padding: '3%',
          marginBottom: '15%',
          marginLeft: '3%',
          marginRight: '3%',
          borderRadius: 10,
          flex: 1,
          height: width / 1.16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: 'grey',
            borderBottomWidth: 1.5,
            paddingBottom: 10,
          }}>
          <Image
            source={{uri: item.profileImg}}
            style={{
              width: width / 10,
              height: width / 10,
              borderRadius: width / 5,
              marginTop: '3%',
              borderWidth: 1,
              borderColor: 'black',
              // marginLeft: width / 15,
              // marginBottom: '5%',
            }}
          />
          <View style={{marginTop:'3%',marginLeft:'3%'}}>
            <Text
              style={{
                marginTop: '5%',
                marginLeft: '2%',
                fontSize: 15,
                color: '#C71585',
                fontWeight: 'bold',
              }}>
              {item.userName}
            </Text>
            <Text style={{color: 'grey', fontSize: 10, marginLeft: '2%'}}>
              {moment(item.time.toDate()).fromNow()}
            </Text>
          </View>
        </View>
        <Text style={{color: 'darkgreen', fontSize: 18, fontWeight: 'bold'}}>
          {item.title}
        </Text>
        <View style={{width: width, height: width / 2, marginTop: '2%'}}>
          <Image
            source={{uri: item.img}}
            style={{width: '86.5%', height: '100%', resizeMode: 'cover'}}
          />
          <Text
            style={{
              color: '#FF00FF',
              fontSize: 15,
              //   marginBottom: '5%',
              marginTop: '3%',
            }}>
            {item.caption}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    return (
      <View style={{flex: 1}}>
        <View style={{backgroundColor: '#4169EA'}}>
          <View
            style={{
              backgroundColor: '#C71585',
              width: width,
              height: width / 3,
              borderBottomRightRadius: 70,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'white',
              }}>
              Feed
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: '#C71585', flex: 1}}>
          <View
            style={{
              backgroundColor: '#4169E1',
              flex: 1,
              borderTopLeftRadius: 70,
            }}>
            <View style={{marginTop: '10%'}}>
              <FlatList
                data={this.state.userArr}
                renderItem={this.show}
                keyExtractor={item => item.key}
                // style={{flex: 1}}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     paddingBottom: 22,
  //   },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});

export default UserScreen;
