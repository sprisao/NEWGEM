import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import React from 'react';
import {useGlobalContext} from '../context';

const ClassCategoryScreen = () => {
  const {classes} = useGlobalContext();
  console.log(classes);

  const ClassTile = data => {
    const tile = data.item;
    return (
      <TouchableOpacity style={styles.tile}>
        <View style={styles.tileWrapper}>
          <View style={styles.imageWrapper}>
            <FastImage
              source={{uri: tile.media[0].url}}
              style={styles.tileImage}
            />
          </View>
          <View style={styles.articleWrapper}>
            <View style={styles.tagsWrapper}>
              {tile.tags.map(tag => {
                return (
                  <View key={tag.name} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.tagsWrapper} numberOfLines={1}>
              {tile.field.map(field => {
                return (
                  <View key={field.name} style={styles.field}>
                    <Text style={styles.fieldText}>{field}</Text>
                  </View>
                );
              })}
            </View>
            <Text style={styles.tileTitle}>{tile.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        {/* <Text style={styles.subHeader}>우리 지역의 다양한 클래스</Text> */}
        <Text style={styles.header}>젬 클래스 🎁</Text>
      </View>
      <FlatList
        data={classes}
        renderItem={ClassTile}
        keyExtractor={(item, index) => item.id}
        numColumns={2}
        windowSize={2}
        bounces={false}
        disableVirtualization={false}
      />
    </View>
  );
};

export default ClassCategoryScreen;

const styles = StyleSheet.create({
  headerContainer: {paddingHorizontal: 8, marginVertical: 3},
  header: {fontFamily: 'Apple SD Gothic Neo Bold', fontSize: 24},
  screen: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 4,
  },
  tile: {
    flex: 1,
    padding: 8,
  },
  tileWrapper: {
    width: '100%',
    height: 225,
    flexDirection: 'column',
  },
  imageWrapper: {
    width: '100%',
    height: 185,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tagsWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 3,
  },
  tileImage: {
    width: '100%',
    height: '100%',
  },
  articleWrapper: {
    width: '100%',
    paddingTop: 10,
  },
  tileTitle: {
    fontFamily: 'Apple SD Gothic Neo Regular',
    fontSize: 14,
    // letterSpacing: -0.5,
  },
  tag: {
    padding: 2.5,
    borderWidth: 0.5,
    marginRight: 3,
    borderRadius: 2,
    marginBottom: 3,
    backgroundColor: '#e8e8e8',
    borderColor: '#8888',
  },
  tagText: {
    fontSize: 12,
    fontFamily: 'Apple SD Gothic Neo Light',
  },
  field: {marginRight: 3, marginBottom: 3},
  fieldText: {
    fontFamily: 'Apple SD Gothic Neo SemiBold',
    fontSize: 11,
    color: '#888',
  },
});
