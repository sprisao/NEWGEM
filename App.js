import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {StoreProvider} from './context';
import SplashScreen from 'react-native-splash-screen';

import Test from './components/Test';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  return (
    <StoreProvider>
      <SafeAreaView>
        <Test></Test>
      </SafeAreaView>
    </StoreProvider>
  );
};

export default App;
