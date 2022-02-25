import analytics from '@react-native-firebase/analytics';
import React, {useEffect, userRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StoreProvider} from './context';
import SplashScreen from 'react-native-splash-screen';

import StackNavigator from './navigation/StackNavigator';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const googleSignIn = () =>{
    GoogleSignin.configure({
  webClientId: '592721340078-98ogm20c8hhr2tkev4ppjj6agk3lcahj.apps.googleusercontent.com',
});
  }
  useEffect(() => {
    googleSignIn()
  },)
  
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  return (
    <StoreProvider>
      <NavigationContainer ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}>
        <StackNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
