import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import auth from "@react-native-firebase/auth"

const LoginScreen = () => {

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View>
      <Text>LoginScreen</Text>
      <GoogleSigninButton onPress={() => onGoogleButtonPress()}/>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})