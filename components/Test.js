import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Video from 'react-native-video';

const Test = () => {
  const {cafes} = useGlobalContext();
  return (
    <View>
      <MaterialCommunityIcons name="home" color="black" size={30} />
      <Video
        source={require('../assets/videos/splash.mp4')} // Can be a URL or a local file.
        style={{width: 300, height: 300}}
        resizeMode="cover"
        rate={1}
        shouldPlay={true}
        muted={true}
      />
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
