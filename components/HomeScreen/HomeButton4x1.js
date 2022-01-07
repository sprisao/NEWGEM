import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const HomeButton4x1 = props => {
  return (
    <TouchableOpacity style={styles.homeButton} onPress={props.onSelect}>
      <Text style={styles.homeBT_2_Header}>{props.Category}</Text>
      <View style={styles.homeBT_2_EmojiContainer}>
        <Image
          style={styles.homeBT_2_emoji}
          resizeMode="cover"
          source={props.imageUrl}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HomeButton4x1;

const styles = StyleSheet.create({
  homeButton: {
    paddingTop: 5,
    borderRadius: 11.5,
    borderWidth: 0.75,
    borderColor: '#dfdfdf',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    width: '47%',
    height: DEVICE_HEIGHT * 0.09,
    paddingHorizontal: 8,
  },
  homeBT_2_Header: {
    fontSize: DEVICE_WIDTH > 400 ? 17 : 16,
    fontFamily: 'AppleSDGothicNeo-Bold',
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
