import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

import FastImage from 'react-native-fast-image';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const HomeButton4x1 = props => {
  return (
    <TouchableOpacity style={styles.homeButton} onPress={props.onSelect}>
      <Text style={styles.homeBT_2_Header}>{props.Category}</Text>
      <View style={styles.homeBT_2_EmojiContainer}>
        <FastImage
          style={styles.homeBT_2_emoji}
          resizeMode={FastImage.resizeMode.cover}
          source={props.imageUrl}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomeButton4x1;

const styles = StyleSheet.create({
  homeButton: {
    paddingTop: 8,
    borderRadius: 11.5,
    borderWidth: 0.75,
    borderColor: '#dfdfdf',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    width: '47%',
    ...Platform.select({
      ios: {height: DEVICE_HEIGHT * 0.09},
      android: {height: DEVICE_HEIGHT * 0.105},
    }),
    paddingHorizontal: 8,
  },
  homeBT_2_Header: {
    fontSize: DEVICE_WIDTH > 400 ? 17 : 16,
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Bold'},
      android: {fontFamily: 'AppleSDGothicNeoB'},
    }),
    letterSpacing: -0.8,
    includeFontPadding: false,
    color: '#333333',
  },

  homeBT_2_EmojiContainer: {
    width: 43,
    height: 43,
    position: 'absolute',
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    right: -1,
    bottom: -1.5,
  },
  homeBT_2_emoji: {
    width: '100%',
    height: '100%',
  },
});
