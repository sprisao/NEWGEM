import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {useGlobalContext} from '../context';

const SpotsSelectScreen = props => {
  const {spotCategories} = useGlobalContext();

  return (
    <View style={styles.screen}>
      {/* <View style={styles.header}>
        <Image
          source={require('../assets/images/illustrations/wonju.jpg')}
          style={{
            width: '100%',
            height: '100%',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}
        />
      </View> */}
      <ScrollView
        contentInsetAdjustmentBehavior="always"
        contentInset={{top: 0}}
        style={styles.itemsWrapper}>
        <View style={styles.wrapper}>
          {spotCategories.map(item => {
            return (
              <TouchableOpacity
                style={styles.item}
                key={item.id}
                onPress={() => {
                  props.navigation.navigate({
                    name: 'Spots',
                    params: {
                      selectedCategory: item.name,
                    },
                  });
                }}>
                <View style={styles.itemContent}>
                  <Image
                    style={styles.image}
                    source={{uri: item.images[0].url}}
                  />
                </View>
                <View style={styles.itemCover}></View>
                <View style={styles.articleContainer}>
                  <Text style={styles.itemText}>
                    {item.name} {item.relatedSpots.length}곳
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default SpotsSelectScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wrapper: {
    paddingHorizontal: 10,
    display: 'flex',
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    width: '100%',
    height: 210,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 5,
  },
  itemsWrapper: {
    // marginTop: 15,
  },
  item: {
    width: '100%',
    height: 160,
    marginTop: 18,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  itemCover: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    width: '100%',
    height: 50,
  },
  image: {
    borderRadius: 7,
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  },
  articleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 10,
  },
  itemText: {
    textAlign: 'right',
    color: 'white',
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Bold'},
      android: {fontFamily: 'AppleSDGothicNeoB'},
    }),
    fontSize: 24,
    letterSpacing: -0.5,
  },
});
