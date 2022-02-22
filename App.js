import analytics from '@react-native-firebase/analytics';
import React, {useEffect, userRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {StoreProvider} from './context';
import SplashScreen from 'react-native-splash-screen';

import StackNavigator from './navigation/StackNavigator';

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
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
