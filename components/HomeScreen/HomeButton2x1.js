import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import FastImage from 'react-native-fast-image';

import EvilIcons from 'react-native-vector-icons/EvilIcons';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH = Dimensions.get('window').width;

const HomeButton2x1 = props => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onSelect}>
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.homeBT_1_emoji}
          resizeMode={FastImage.resizeMode.cover}
          source={props.imageUrl}
        />
      </View>
      <View style={styles.articleContainer}>
        <View sryle={styles.pgContainer}>
          <Text style={styles.paragraph}>{props.Desc}</Text>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.homeBT_1_Header}>{props.Category} </Text>
          <EvilIcons
            name="chevron-right"
            size={35}
            color="black"
            style={{marginLeft: -19, marginRight: -13}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HomeButton2x1;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 11.5,
    borderWidth: 0.75,
    borderColor: '#dfdfdf',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '48.5%',
    height: DEVICE_HEIGHT * 0.22,
  },
  imageContainer: {
    width: DEVICE_WIDTH * 0.22,
    height: DEVICE_HEIGHT * 0.1,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  homeBT_1_Header: {
    fontSize: DEVICE_WIDTH > 400 ? 40 : 35,
    fontFamily: 'BlackHanSans-Regular',
    letterSpacing: -1.25,
    includeFontPadding: false,
    color: '#333333',
    marginBottom: -5,
  },
  articleContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  pgContainer: {
    width: 30,
  },
  paragraph: {
    fontFamily: 'AppleSDGothicNeo-UltraLight',
    lineHeight: 15.5,
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'right',
  },
  homeBT_1_emoji: {
    width: '100%',
    height: '100%',
  },
});
