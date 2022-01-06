import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Test = () => {
  const {cafes} = useGlobalContext();
  return (
    <View>
      <MaterialCommunityIcons name="home" color="black" size={30} />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
