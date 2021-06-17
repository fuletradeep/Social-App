import React, {useState, useEffect, Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firebase from '../Database/Database';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import moment from 'moment';
const userArr = [];

export class Profile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      userArr: [],
      profileUrl: '',
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    // this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
    let imageRef = storage().ref(`profile/`).child(`${auth().currentUser.email}`);
    imageRef
      .getDownloadURL()
      .then(url => {
        this.setState({profileUrl: url});

        this.setState({isLoading: false});
        console.log(',.,.,..,..,.',this.state.profileUrl);
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));
    this.firestoreRef = firebase
      .firestore()
      .collection('post')
      .where('userName', '==', auth().currentUser.displayName)
      .get()
      .then(querySnapshot =>
        // console.log('{}}{}{}}{}{}{}{', querySnapshot.size),
        querySnapshot.forEach(documentSnapshot => {
          // this.setState({userArr:documentSnapshot.data()})
          userArr.push(documentSnapshot.data());
          this.setState({isLoading: false});
          console.log('User ID: ', documentSnapshot.id, userArr);
        }),
      );
  }

  showPost = ({item}) => {
    console.log('.............>>>>>>', item);
    return (
      <View
        style={{
          backgroundColor: '#E6E6FA',
          padding: '3%',
          // marginBottom: '15%',
          marginLeft: '3%',
          marginRight: '3%',
          borderRadius: 10,
          flex: 1,
          height: width / 1.12,
          marginTop: '8%',
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
              marginTop: '3%',
            }}>
            {item.caption}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <>
        {this.state.isLoading && (
          <View
            style={{
              backgroundColor: 'black',
              height: height,
              width: width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={40} color="white" />
          </View>
        )}
        <View style={{flex: 1}}>
          <View style={{backgroundColor: '#4169EA'}}>
            <View
              style={{
                backgroundColor: '#C71585',
                width: width,
                height: width / 2,
                borderBottomRightRadius: 70,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: this.state.profileUrl}}
                  style={{
                    width: width / 5,
                    height: width / 5,
                    borderRadius: width / 5,
                    marginTop: '3%',
                    marginLeft: width / 15,
                    marginBottom: '5%',
                    borderWidth: 2,
                    borderColor: 'white',
                  }}
                />
                <Text
                  style={{
                    fontSize: 30,
                    marginTop: '8%',
                    marginLeft: '5%',
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {auth().currentUser.displayName}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: width / 3.5,
                  // marginRight: width / 20,
                  justifyContent: 'space-evenly',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: '2%',
                      color: 'white',
                    }}>
                    Posts
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: 'white',
                      textAlign: 'center',
                      marginRight: '3%',
                    }}>
                    12
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: '2%',
                      color: 'white',
                    }}>
                    Followers
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    12K
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginBottom: '2%',
                      color: 'white',
                    }}>
                    Folowing
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    10K
                  </Text>
                </View>
              </View>
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
                  data={userArr}
                  renderItem={this.showPost}
                  keyExtractor={item => item.key}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default Profile;
