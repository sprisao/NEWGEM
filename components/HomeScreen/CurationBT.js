import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const CurationBT = props => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={props.onSelect}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.homeBT_1_emoji}
          resizeMode="cover"
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
            style={{marginLeft: -15, marginRight: -13}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CurationBT;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 10,
    paddingBottom: 5,
    borderRadius: 11.5,
    borderWidth: 0.75,
    borderColor: '#dfdfdf',
    backgroundColor: '#f8f8f8',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    width: '48.5%',
    height: DEVICE_HEIGHT * 0.095,
  },
  imageContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: DEVICE_WIDTH > 400 ? 50 : 45,
    height: DEVICE_WIDTH > 400 ? 50 : 45,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 3},
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeBT_1_Header: {
    fontSize: 23,
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
    alignItems: 'flex-start',
  },
  pgContainer: {
    width: 30,
  },
  paragraph: {
    fontFamily: 'AppleSDGothicNeoUL',
    lineHeight: DEVICE_WIDTH > 400 ? 13 : 11,
    fontSize: DEVICE_WIDTH > 400 ? 13 : 11,
    textAlign: 'left',
  },
  homeBT_1_emoji: {
    width: '100%',
    height: '100%',
  },
});
