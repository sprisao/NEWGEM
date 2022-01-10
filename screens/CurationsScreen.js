import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Platform,
} from 'react-native';

import {useGlobalContext} from '../context';

const DEVICE_WIDTH = Dimensions.get('window').width;
const Curations = props => {
  const {cafes} = useGlobalContext();

  const promotions = cafes.filter(item => item.isPromotion === true);

  const renderCuration = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.curationContainer}
        onPress={() => {
          props.navigation.navigate({
            name: 'Details',
            params: {
              storeName: item.name,
              storeDetails: item,
            },
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: item.images[0].url}}
            resizeMode="cover"
          />
        </View>
        <View style={styles.articleContainer}>
          <Text style={styles.copy}>{item.mainCopy}</Text>
          <Text style={styles.storeName}>{item.name}</Text>
          <Text style={styles.address}>{item.miniAddress}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        renderItem={renderCuration}
        data={promotions}
        keyExtractor={item => {
          return item.name;
        }}
      />
    </View>
  );
};
export default Curations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  curationContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    height: DEVICE_WIDTH > 400 ? 200 : DEVICE_WIDTH > 375 ? 175 : 175,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  articleContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 'auto',
    paddingVertical: 8,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  copy: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Light'},
      android: {fontFamily: 'AppleSDGothicNeoR'},
    }),
    fontSize: DEVICE_WIDTH > 400 ? 14 : DEVICE_WIDTH > 375 ? 13 : 13,
    letterSpacing: -0.5,
    color: 'white',
  },
  storeName: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Bold'},
      android: {fontFamily: 'AppleSDGothicNeoB'},
    }),
    fontSize: DEVICE_WIDTH > 400 ? 25 : DEVICE_WIDTH > 375 ? 22 : 22,
    letterSpacing: -0.5,
    color: 'white',
  },
  address: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Light'},
      android: {fontFamily: 'AppleSDGothicNeoR'},
    }),
    fontSize: 13,
    letterSpacing: -0.5,
    color: 'white',
  },
});
