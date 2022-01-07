import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {StoreProvider} from './context';
import SplashScreen from 'react-native-splash-screen';

import StackNavigator from './navigation/StackNavigator';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  return (
    <StoreProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;
