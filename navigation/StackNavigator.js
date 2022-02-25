import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {TransitionPresets} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import SecondSelectScreen from '../screens/SecondSelectScreen';
import CategoryScreen from '../screens/CategoryScreen';
import LocationPicker from '../components/CategoryScreen/LocationPicker';
import DetailsScreen from '../screens/DetailsScreen';
import DetailsHeaderRight from '../components/DetailsScreen/HeaderRight';
import DetailsCuration from '../components/DetailsScreen/DetailsCuration';
import CurationsScreen from '../screens/CurationsScreen';
import SpotsSelectScreen from '../screens/SpotsSelectScreen';
import SightSeeingScreen from '../screens/SightSeeingScreen';
import ClassCategoryScreen from '../screens/ClassCategoryScreen';
import ClassScreen from '../screens/ClassScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="홈"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      
      <Stack.Screen
        name="로그인"
        component={LoginScreen}
        />

      <Stack.Screen
        name="회원가입"
        component={RegisterScreen}
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
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 15,
            fontFamily: 'AppleSDGothicNeo-UltraLight',
          },
          ...Platform.select({
            ios: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeo-Bold',
              },
            },
            android: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeoB',
              },
            },
          }),

          headerTintColor: 'black',
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
          ...Platform.select({
            ios: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeo-Bold',
              },
            },
            android: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeoB',
              },
            },
          }),
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          // headerRight: () => <DetailsHeaderRight />,
        })}
      />
      <Stack.Screen
        name="DetailsCuration"
        component={DetailsCuration}
        options={({route}) => ({
          title: '큐레이션',
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
          ...TransitionPresets.ModalPresentationIOS,
        })}
      />

      <Stack.Screen
        name="Curations"
        component={CurationsScreen}
        options={({route, navigation}) => ({
          title: '젬 큐레이션 ✨',
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
          ...Platform.select({
            ios: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeo-Bold',
              },
            },
            android: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeoB',
              },
            },
          }),
          headerRight: () => (
            <LocationPicker navigation={navigation} route={route} />
          ),
        })}
      />

      <Stack.Screen
        name="SpotSelect"
        component={SpotsSelectScreen}
        options={({route, navigation}) => ({
          title: '카테고리',
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              // color="white"
              style={{marginLeft: 10}}
            />
          ),
          headerBackTitleStyle: {color: 'white'},
          // headerTransparent: true,

          // headerTintColor: 'white',
          // headerTitleStyle: {
          // color: 'transparent',
          // },
        })}
      />

      <Stack.Screen
        name="Spots"
        component={SightSeeingScreen}
        options={({route, navigation}) => ({
          title: '가볼만한 곳',
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          headerBackTitleStyle: {color: 'black', fontSize: 15},
          // headerTransparent: true,
          headerTintColor: 'black',
          headerTitleStyle: {
            color: 'black',
          },
        })}
      />
      <Stack.Screen
        name="Classes"
        component={ClassCategoryScreen}
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
          headerBackTitleStyle: {
            color: 'black',
            fontSize: 15,
            fontFamily: 'AppleSDGothicNeo-UltraLight',
          },
          ...Platform.select({
            ios: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeo-Bold',
              },
            },
            android: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeoB',
              },
            },
          }),
          headerTintColor: 'black',
          // headerRight: () => (
          //   <LocationPicker navigation={navigation} route={route} />
          // ),
        })}
      />
      <Stack.Screen
        name="Class"
        component={ClassScreen}
        options={({route}) => ({
          title: route.params.storeName,
          // headerTransparent: true,
          headerBackTitleStyle: {color: 'transparent', fontSize: 15},
          headerTintColor: 'black',
          ...Platform.select({
            ios: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeo-Bold',
              },
            },
            android: {
              headerTitleStyle: {
                color: 'black',
                fontFamily: 'AppleSDGothicNeoB',
              },
            },
          }),
          headerBackImage: () => (
            <Ionicons
              name="ios-chevron-back"
              size={20}
              color="black"
              style={{marginLeft: 10}}
            />
          ),
          // headerRight: () => <DetailsHeaderRight />,
        })}
      />
    </Stack.Navigator>
  );
}
