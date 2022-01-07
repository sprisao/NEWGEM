import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SecondSelectScreen from '../screens/SecondSelectScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SecondSelect"
        component={SecondSelectScreen}
        options={({route}) => ({
          title: route.params.categoryName,
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          headerBackTitleStyle: {color: 'black', fontSize: 15},
          headerTintColor: 'black',
          headerTitleStyle: {
            color: 'black',
          },
        })}
      />
    </Stack.Navigator>
  );
}
