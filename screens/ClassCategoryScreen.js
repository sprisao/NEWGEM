import {StyleSheet, Text, View, FlatList, TouchableOpacity, Platform} from "react-native";
import FastImage from "react-native-fast-image";
import React from "react";
import {useGlobalContext} from "../context";

const ClassCategoryScreen = props => {
  const {classes} = useGlobalContext();

  const ClassTile = data => {
    const tile = data.item;
    return (
      <TouchableOpacity
        style={styles.tile}
        onPress={() => {
          props.navigation.navigate({
            name: "Class",
            params: {
              classData: data.item,
            },
          });
        }}>
        <View style={styles.tileWrapper}>
          <View style={styles.imageWrapper}>
            <FastImage source={{uri: tile.media[0].url}} style={styles.tileImage} />
          </View>
          <View style={styles.articleWrapper}>
            <View style={styles.tagsWrapper}>
              {tile.tags.map(tag => {
                return (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.tagsWrapper} numberOfLines={1}>
              {tile.field.map(field => {
                return (
                  <View key={field} style={styles.field}>
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
        <Text style={styles.header}>젬 클래스</Text>
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
  header: {
    ...Platform.select({
      ios: {fontFamily: "Apple SD Gothic Neo SemiBold"},
      android: {fontFamily: "AppleSDGothicNeoSB"},
    }),
    fontSize: 24,
    color: "black",
  },
  screen: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 4,
  },
  tile: {
    flex: 1,
    padding: 5,
    height: "auto",
  },
  tileWrapper: {
    width: "100%",
    flexDirection: "column",
  },
  imageWrapper: {
    width: "100%",
    height: 175,
    borderRadius: 8,
    overflow: "hidden",
  },
  tagsWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginBottom: 3,
  },
  tileImage: {
    width: "100%",
    height: "100%",
  },
  articleWrapper: {
    width: "100%",
    paddingTop: 8,
    paddingHorizontal: 2,
  },
  tileTitle: {
    ...Platform.select({
      ios: {fontFamily: "Apple SD Gothic Neo Regular"},
      android: {fontFamily: "AppleSDGothicNeoR"},
    }),
    color: "black",
    fontSize: 14,
    // letterSpacing: -0.5,
  },
  tag: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    ...Platform.select({
      android: {paddingBottom: 4},
    }),
    borderWidth: 0.5,
    marginRight: 3,
    borderRadius: 6,
    marginBottom: 3,
    backgroundColor: "#f1f1f1",
    borderColor: "#8888",
  },
  tagText: {
    fontSize: 12,
    ...Platform.select({
      ios: {fontFamily: "Apple SD Gothic Neo Light"},
      android: {fontFamily: "AppleSDGothicNeoL"},
    }),
    color: "black",
  },
  field: {marginRight: 3, marginBottom: 2},
  fieldText: {
    ...Platform.select({
      ios: {fontFamily: "Apple SD Gothic Neo SemiBold"},
      android: {fontFamily: "AppleSDGothicNeoSB"},
    }),
    fontSize: 13,
    color: "#888",
  },
});
