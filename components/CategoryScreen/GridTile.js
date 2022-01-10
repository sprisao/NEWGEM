import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

import FastImage from 'react-native-fast-image';

import Feather from 'react-native-vector-icons/Feather';

const GridTile = props => {
  let preRank;
  if (props.rating > 8) {
    preRank = (
      <View style={styles.medalContainer}>
        <Text style={styles.medals}>🏅🏅🏅</Text>
      </View>
    );
  } else if (props.rating > 6) {
    preRank = (
      <View style={styles.medalContainer}>
        <Text style={styles.medals}>🏅🏅</Text>
      </View>
    );
  } else if (props.rating > 3) {
    preRank = (
      <View style={styles.medalContainer}>
        <Text style={styles.medals}>🏅</Text>
      </View>
    );
  } else preRank = null;

  let businessHour;
  if (props.openHour) {
    businessHour = (
      <View style={styles.hourContainer}>
        <Feather name="clock" size={13} color="black" style={{marginTop: 2}} />
        <Text style={styles.businessHour}>
          {props.openHour} ~ {props.closeHour}
        </Text>
      </View>
    );
  } else businessHour = null;

  return (
    <View style={{...styles.gridTile, ...props.style}}>
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={props.onSecondSelect}>
        <View style={styles.tileWrapper}>
          <FastImage
            style={styles.image}
            resizeMode="cover"
            source={{uri: props.image}}
          />
          <View style={styles.articleContainer}>
            <View style={styles.nameContainer}>
              <Text style={styles.location}>{props.location}</Text>
              <Text style={styles.name}>{props.name}</Text>
            </View>
            {preRank}
            {businessHour}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GridTile;

const styles = StyleSheet.create({
  gridTile: {
    width: '47%',
    // maxHeight: 300,
    marginHorizontal: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  tileWrapper: {
    width: '100%',
    height: '100%',
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 7,
    resizeMode: 'cover',
  },
  articleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 5,
    height: 'auto',
    width: '100%',
  },
  nameContainer: {
    width: '100%',
    marginBottom: 3,
  },
  location: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-UltraLight'},
      android: {fontFamily: 'AppleSDGothicNeoL'},
    }),
    color: 'black',
  },
  name: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Regular'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),

    color: 'black',
    letterSpacing: -0.35,
    fontSize: 20,
  },
  medalContainer: {marginVertical: 2},
  medals: {
    color: 'black',
    fontSize: 14,
    letterSpacing: -5,
  },
  hourContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  businessHour: {
    fontFamily: 'AppleSDGothicNeo-Light',
    letterSpacing: -0.35,
    color: 'black',
    marginLeft: 2,
  },
});
