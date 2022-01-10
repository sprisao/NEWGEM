import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

const SecondSelectButton = props => {
  return (
    <TouchableOpacity
      style={{...styles.gridItem, ...props.style}}
      onPress={props.onSecondSelect}>
      <View style={styles.buttonWrapper}>
        <Text style={styles.buttonEmoji}>{props.emoji}</Text>
        <Text style={styles.buttonText}>{props.category}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SecondSelectButton;

const styles = StyleSheet.create({
  gridItem: {
    margin: 5,
    width: '47%',
    height: 'auto',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#dfdfdf',
    backgroundColor: '#f8f8f8',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 12,
  },
  buttonEmoji: {
    color: 'black',
    marginRight: 5,
  },
  buttonText: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Regular'},
      android: {fontFamily: 'AppleSDGothicNeoR'},
    }),
    fontSize: 14,
    color: 'black',
  },
});
