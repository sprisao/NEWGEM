import { StyleSheet, Text, View, Button } from 'react-native'

import React, {useState, useEffect} from 'react'

import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth"

const LoginScreen = () => {
const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState()
  
  useEffect(() => {
    if(auth().currentUser) { setUser(auth().currentUser)}
  }, [])

   const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, [])
  
  

  const handleLogout = () => {
    auth().signOut()
  }
  console.log(auth().currentUser)

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  
  
  
  return (
        <View>
        <Text>LoginScreen</Text>
        {user ? 
        <Button onPress={handleLogout} title="로그아웃 "></Button>:
        <GoogleSigninButton onPress={() => onGoogleButtonPress()}/>
      }
        </View>
        
  )
}

export default LoginScreen

const styles = StyleSheet.create({})