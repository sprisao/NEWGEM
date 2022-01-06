import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../context';

const Test = () => {
  const {cafes} = useGlobalContext();

  console.log(cafes);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});
