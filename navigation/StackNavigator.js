import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Button, Text, View} from 'react-native';
import Test from '../components/Test';

function HomeScreen(props) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="눌러"
        onPress={() => {
          props.navigation.navigate({name: 'Test'});
        }}></Button>
    </View>
  );
}

function TestScreen() {
  return <Test></Test>;
}

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Test" component={TestScreen} />
    </Stack.Navigator>
  );
}
