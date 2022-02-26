import { StyleSheet, Text, View, Button } from 'react-native'

import React, {useState, useEffect} from 'react'

import auth from "@react-native-firebase/auth"
import { GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import { appleAuth } from '@invertase/react-native-apple-authentication';;
import { AppleButton } from '@invertase/react-native-apple-authentication';

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

  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
  
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }
  
    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }
  
  
  
  return (
        <View>
        <Text>LoginScreen</Text>
        {user ? 
        <Button onPress={handleLogout} title="로그아웃 "></Button>:
        <><GoogleSigninButton onPress={() => onGoogleButtonPress()} /><AppleButton
          buttonStyle={AppleButton.Style.WHITE}
          buttonType={AppleButton.Type.SIGN_IN}
          style={{
            width: 160,
            height: 45,
          }}
          onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))} /></>
      }
        </View>
        
  )
}

export default LoginScreen

const styles = StyleSheet.create({})