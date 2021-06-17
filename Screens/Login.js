import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import auth from '@react-native-firebase/auth';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Login({navigation}) {
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (email, password) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setIsError(false);
        console.log('User account created & signed in!');
        // this.props.navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setIsError(true);
          setError('That email address is alresetError');
        }

        if (error.code === 'auth/invalid-email') {
          setIsError(true);
          console.log('That email address is invalid!');
          setError('That email address is invalid!');
        }

        console.error('-=======================================', error);
        setIsError(true)
        setError(error.code);
        console.log('>>>>>>>>>',error);
      });
  };

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: '#C71585',
          width: width / 1.5,
          height: width / 1.5,
          top: '-20%',
          borderRadius:width/1.5,
        }}
      />
      <View
        style={{
          backgroundColor: '#4169E1',
          width: width / 1.5,
          height: width / 1.5,
          top: '-55%',
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
        Welcome <Text style={{color: '#C71585'}}>Back</Text>
      </Text>

      {isError && (
        <View style={{marginTop: width / 10}}>
          <Text
            style={{
              color: 'red',
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
              top:-330,
              marginBottom:-150
            }}>
            {error}
          </Text>
        </View>
      )}

      <View
        style={{
          marginTop: -width / 1.7,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: width / 20,
          marginRight: width / 20,
          padding: 5,
        }}>
        <TextInput
          placeholder="Email..."
          placeholderTextColor="grey"
          value={email}
          onChangeText={email => setEmail(email)}
          color='#C71585'
        />
      </View>

      <View
        style={{
          marginTop: width / 25,
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: width / 20,
          marginRight: width / 20,
          padding: 5,
        }}>
        <TextInput
          placeholder="Password..."
          placeholderTextColor="grey"
          value={password}
          onChangeText={password => setPassword(password)}
          color='#4169E1'
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#C71585',
          marginLeft: width / 30,
          marginRight: width / 30,
          marginTop:width/10
        }}
        onPress={() => loginHandler(email, password)}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            padding:'3%',
            color:'white'
          }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold',textAlign:'center',marginTop:'3%'}}>
          Still have't Account <Text style={{color: '#4169E1'}}>SignUp</Text>
        </Text>
      </TouchableOpacity>

      {/* <View
        style={{
          justifyContent: 'flex-end',
          backgroundColor: '#4169E1',
          width: width / 3,
          height: width / 3,
          bottom: '-15%',
          borderRadius: 150,
          right:-330,
          opacity:0.5
        }}
      /> */}
      {/* <View
        style={{
          justifyContent: 'flex-end',
          backgroundColor: '#C71585',
          width: width / 3,
          height: width / 3,
          bottom: -160,
          borderRadius: 150,
          left:-200,
          opacity:0.5
        }}
      /> */}
    </ScrollView>
  );
}
