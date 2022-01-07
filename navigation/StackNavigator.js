import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import SecondSelectScreen from '../screens/SecondSelectScreen';
import CategoryScreen from '../screens/CategoryScreen';
import LocationPicker from '../components/CategoryScreen/LocationPicker';
import DetailsScreen from '../screens/DetailsScreen';
import DetailsHeaderRight from '../components/DetailsScreen/HeaderRight';
import DetailsCuration from '../components/DetailsScreen/DetailsCuration';

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
          title: '카테고리',
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
      <Stack.Screen
        name="CategoryScreen"
        component={CategoryScreen}
        options={({route, navigation}) => ({
          title: route.params.categoryName,
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          headerBackTitleStyle: {color: 'transparent', fontSize: 15},
          headerTintColor: 'black',
          headerTitleStyle: {
            color: 'black',
          },
          headerRight: () => (
            <LocationPicker navigation={navigation} route={route} />
          ),
        })}
      />

      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({route}) => ({
          title: route.params.storeName,
          // headerTransparent: true,
          headerBackTitleStyle: {color: 'transparent', fontSize: 15},
          headerTintColor: 'black',
          // headerTitleStyle: {
          //   color: 'transparent',
          // },
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          headerRight: () => <DetailsHeaderRight />,
        })}
      />
      <Stack.Screen
        name="DetailsCuration"
        component={DetailsCuration}
        options={({route}) => ({
          title: route.params.storeName,
          // headerTransparent: true,
          headerBackTitleStyle: {color: 'transparent', fontSize: 15},
          headerTintColor: 'black',
          // headerTitleStyle: {
          //   color: 'transparent',
          // },
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          headerRight: () => <DetailsHeaderRight />,
          // ...TransitionPresets.ModalPresentationIOS,
        })}
      />
    </Stack.Navigator>
  );
}
