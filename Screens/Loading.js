import React,{useState,useEffect} from 'react'
import {View,ActivityIndicator,Text} from 'react-native'
import auth from '@react-native-firebase/auth';

export default function Loading({navigation}) {
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            navigation.navigate(user ? 'App' : 'Auth')
        })
    },[])

    return (
        <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'black',flex:1}}>
            <ActivityIndicator color='white' size={40}/>
        </View>
    )
}
