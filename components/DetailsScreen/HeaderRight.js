import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  Share,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderRight = props => {
  const link =
    Platform.OS === 'ios'
      ? 'https://apps.apple.com/us/app/gem%EC%A0%AC/id1576464783'
      : 'https://play.google.com/store/apps/details?id=com.brucecompany.gem';

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('acitivtyType!');
        } else {
          console.log('Share!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('dismissed');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.shareBTContainer}
        onPress={() => {
          onShare();
        }}>
        <Ionicons name="share-outline" size={26} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bookmarkBTContainer} onPress={() => {}}>
        <Ionicons name="bookmark-outline" size={26} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderRight;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 13,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shareBTContainer: {
    marginRight: 13,
  },
  bookmarkBTContainer: {},
});
