import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';

import FastImage from 'react-native-fast-image';

const ClassScreen = props => {
  const classData = props.route.params.classData;
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.screenWrapper}>
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{classData.title}</Text>
            </View>
            <View style={styles.articleWrapper}>
              <View style={styles.tagsWrapper}>
                {classData.tags.map(tag => {
                  return (
                    <View key={tag.name} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  );
                })}
              </View>
              <View style={styles.fieldsWrapper}>
                {classData.field.map(field => {
                  return (
                    <View key={field.name} style={styles.field}>
                      <Text style={styles.fieldText}>{field}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.mediaWrapper}>
          <View style={styles.mediaContainer}>
            <FastImage
              source={{uri: classData.media[0].url}}
              style={styles.media}
            />
          </View>
        </View>
        <View style={styles.descWrapper}>
          <View style={styles.descContainer}>
            <View style={styles.descTitleBox}>
              <Text style={styles.descTitle}>소개</Text>
            </View>
            <View style={styles.descTextBox}>
              <Text style={styles.descText}>{classData.desc}</Text>
            </View>
          </View>
        </View>
        {classData.instagramAccount ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL(
                  `instagram://user?username=${storeData.instagramAccount}`,
                ).catch(() => {
                  Linking.openURL(
                    `https://www.instagram.com/${storeData.instagramAccount}`,
                  );
                });
              }}>
              <View style={styles.buttonImageContainer}>
                <FastImage
                  source={require('../assets/images/SNS/INSTAGRAM.png')}
                  style={{width: '100%', height: '100%'}}
                />
              </View>
              <Text style={styles.buttonText}>
                @{storeData.instagramAccount}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <View style={styles.logoSection}>
        <Text style={styles.logoText}>Powered by</Text>
        <View style={styles.logoContainer}>
          <FastImage
            source={require('../assets/images/BI/LogoGrey.png')}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ClassScreen;

const styles = StyleSheet.create({
  screen: {flex: 1},
  screenWrapper: {flexDirection: 'column'},
  mediaWrapper: {
    width: '100%',
    height: 350,
    paddingHorizontal: 12,
  },
  mediaContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
    overflow: 'hidden',
  },
  media: {width: '100%', height: '100%'},
  headerWrapper: {padding: 10, width: '100%'},
  header: {
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    
  },
  articleWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descWrapper: {paddingHorizontal: 12, paddingTop: 10},
  descContainer: {
    padding: 15,
    textAlign: 'left',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    paddingVertical: 12,
  },
  titleText: {
    ...Platform.select({
      ios: {fontFamily: 'Apple SD Gothic Neo SemiBold'},
      android: {fontFamily: 'AppleSDGothicNeoSB', color: 'black'},
    }),
    fontSize: 21,
  },
  tagsWrapper: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderRadius: 7.5,
    marginBottom: 3,
    ...Platform.select({
      android: {paddingBottom: 7},
    }),
    marginHorizontal: 2,
    backgroundColor: '#f8f8f8',
    borderColor: '#8888',
  },
  tagText: {
    fontSize: 13,
    ...Platform.select({
      ios: {fontFamily: 'Apple SD Gothic Neo Light'},
      android: {fontFamily: 'AppleSDGothicNeoL'},
    }),
    color: 'black',
  },
  fieldsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  field: {marginRight: 3},
  fieldText: {
    ...Platform.select({
      ios: {fontFamily: 'Apple SD Gothic Neo SemiBold'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),
    fontSize: 14,
    color: '#888',
  },
  descTitleBox: {
    width: '95%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#d5d5d5',
    paddingBottom: 4,
  },
  descTitle: {
    ...Platform.select({
      ios: {fontFamily: 'Apple SD Gothic Neo SemiBold'},
      android: {fontFamily: 'AppleSDGothicSB', color: 'black'},
    }),
    fontSize: 14,
  },
  descTextBox: {paddingVertical: 9},
  descText: {
    ...Platform.select({
      ios: {fontFamily: 'Apple SD Gothic Neo Light'},
      android: {fontFamily: 'AppleSDGothicNeoL', color: 'black'},
    }),
    fontSize: 14,
    letterSpacing: -0.25,
  },
  logoSection: {
    width: '100%',
    height: 'auto',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logoText: {fontFamily: 'AppleSDGothicNeo-SemiBold', color: '#666'},
  logoContainer: {
    width: 25,
    height: 27,
    marginLeft: 5,
    padding: 3,
  },
});
