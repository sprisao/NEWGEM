import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Linking,
  ActivityIndicator,
  Platform,
  Modal,
  Pressable,
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import Video from 'react-native-video';
import DetailsMenu from '../components/DetailsScreen/DetailsMenu';
import HeaderRight from '../components/DetailsScreen/HeaderRight';

import DetailsInfo from '../components/DetailsScreen/DetailsInfo';

import FastImage from 'react-native-fast-image';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DetailsScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isPreloading, setIsPreloading] = useState(true);
  const [isDetails, setIsDetails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const storeData = props.route.params.storeDetails;
  const navigation = props.navigation;

  const markHandler = () => {
    setModalVisible(true);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight onMarkPress={() => markHandler()} />,
    });
  }, [navigation]);

  let preRank;
  if (storeData.preRating > 8) {
    preRank = <Text style={styles.medals}>πππ</Text>;
  } else if (storeData.preRating > 6) {
    preRank = <Text style={styles.medals}>ππ</Text>;
  } else if (storeData.preRating > 3) {
    preRank = <Text style={styles.medals}>π</Text>;
  } else preRank = null;

  const items = ['μμΈμ λ³΄'];
  if (storeData.isMenu) {
    items.unshift('λ©λ΄');
  }
  if (storeData.isPromotion) {
    items.unshift('νλ μ΄μ');
  }

  const scrollRef = useRef();
  const imageBoxRef = useRef();
  const scrollHandler = () => {
    scrollRef.current.scrollToEnd({animated: true});
  };
  const infosTabHandler = () => {
    {
      !isDetails ? setIsDetails(true) : setIsDetails(false);
    }
    setTimeout(() => {
      scrollHandler();
    }, 30);
  };

  useEffect(() => {
    const counter = setTimeout(() => {
      setSelectedIndex(prev =>
        prev === storeData.images.length - 1 ? 0 : prev + 1,
      );
    }, 1500);
    imageBoxRef.current.scrollTo({
      animated: true,
      y: 0,
      x: (DEVICE_WIDTH - 30) * selectedIndex,
    });
    return () => clearTimeout(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const scrollEnded = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;

    // get current position of the scrollView
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(selectedIndex);
  };

  return (
    <ScrollView
      ref={scrollRef}
      showsVerticalScrollIndicator={false}
      style={styles.screen}
      // bounces={false}
    >
      <View style={styles.DetailsScreen}>
        <View style={styles.headerContainer}>
          <View style={styles.headerWrapper}>
            <View style={styles.HeaderLeft}>
              <Text style={styles.storeDesc}>{storeData.shortDescription}</Text>
              <Text style={styles.storeName}>{storeData.name}</Text>
            </View>
            <View style={styles.HeaderRight}>
              <View style={styles.rankContainer}>{preRank}</View>
              <View style={styles.addressContainer}>
                <Text style={styles.miniAddress}>{storeData.miniAddress}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.imagesContainer}>
          <View style={styles.circleDiv}>
            {storeData.images.map((item, i) => (
              <View
                key={item.id}
                style={[
                  styles.whiteCircle,
                  {opacity: i === selectedIndex ? 1 : 0.5},
                ]}
              />
            ))}
          </View>
          <View style={styles.imageWrapper}>
            <ScrollView
              ref={imageBoxRef}
              horizontal
              onMomentumScrollEnd={scrollEnded}
              showsHorizontalScrollIndicator={false}
              pagingEnabled>
              {storeData.images.map(item => {
                return (
                  <FastImage
                    key={item.id}
                    style={{
                      width: DEVICE_WIDTH - 30,
                      height: '100%',
                    }}
                    source={{uri: item.url}}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        {storeData.isMenu ? <DetailsMenu storeData={storeData} /> : null}
        {storeData.isPromotion ? (
          <View style={styles.curationContainer}>
            <View style={styles.videoContainer}>
              {isPreloading && (
                <ActivityIndicator
                  animating
                  color={'gray'}
                  size="large"
                  style={{
                    flex: 1,
                    position: 'absolute',
                    top: '50%',
                    left: '45%',
                  }}
                />
              )}
              <Video
                onReadyForDisplay={() => setIsPreloading(false)}
                onLoadStart={() => setIsPreloading(true)}
                style={styles.video}
                source={{uri: storeData.promotionMedia[0].url}}
                resizeMode="cover"
                rate={1}
                shouldPlay={true}
                isLooping={true}
                muted={true}
              />
            </View>
            <Entypo
              name="chevron-small-down"
              size={24}
              color="black"
              style={{marginTop: 5}}
            />
            <View style={[styles.buttonContainer, {paddingTop: 3}]}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.navigation.navigate({
                    name: 'DetailsCuration',
                    params: {
                      categoryName: 'λ§μ§',
                      storeName: storeData.name,
                      storeData: storeData,
                    },
                  });
                }}>
                <View style={styles.buttonImageContainer}>
                  <FastImage
                    source={require('../assets/images/emojis/curation.png')}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text style={styles.buttonText}>{storeData.name} νλ μ΄μ</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {storeData.instagramAccount ? (
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL(storeData.naverLink).catch(() => {
                storeData.naverLink;
              });
            }}>
            <View style={styles.buttonImageContainer}>
              <FastImage
                source={require('../assets/images/SNS/NAVER.png')}
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <Text style={styles.buttonText}>μ€λ§νΈνλ μ΄μ€</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={infosTabHandler}>
            <View style={styles.buttonImageContainer}>
              <FastImage
                source={require('../assets/images/emojis/details.png')}
                style={{width: 'auto', height: '100%'}}
              />
            </View>
            <Text style={styles.buttonText}>μμΈμ λ³΄</Text>
          </TouchableOpacity>
        </View>
        {isDetails ? <DetailsInfo storeData={storeData} /> : null}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              Linking.openURL(`tel:${storeData.phoneNumber}`);
            }}>
            <Foundation
              name="telephone"
              size={35}
              color="#51cf66"
              style={{marginRight: 10}}
            />
            <Text style={styles.buttonText}>μ νκ±ΈκΈ°</Text>
          </TouchableOpacity>
        </View>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>μλ°μ΄νΈ μμ μλλ€!</Text>
            <Pressable
              style={[styles.modalButton, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>νμΈ</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  DetailsScreen: {
    backgroundColor: '#f6f6f6',
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  headerWrapper: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 7,
    flexDirection: 'row',
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
  HeaderLeft: {
    width: '75%',
    flexDirection: 'column',
    padding: 0,
    margin: 0,
    justifyContent: 'space-between',
  },
  storeDesc: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Regular'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),
    fontSize: DEVICE_WIDTH > 400 ? 16 : DEVICE_WIDTH > 375 ? 14.5 : 13.5,
    letterSpacing: -1,
    color: 'black',
  },

  storeName: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Bold', marginTop: 5},
      android: {fontFamily: 'AppleSDGothicNeoB'},
    }),
    fontSize: 32,
    letterSpacing: -1.5,
    color: 'black',
  },
  HeaderRight: {
    height: '100%',
    paddingVertical: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  miniAddress: {
    fontFamily: 'AppleSDGothicNeo-Regular',
    fontSize: 16,
    color: 'black',
  },
  medals: {
    fontSize: 22,
    letterSpacing: -6,
    color: 'black',
  },
  imagesContainer: {
    height: 400,
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  imageWrapper: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: 'white',
    height: 65,
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-SemiBold'},
      android: {fontFamily: 'AppleSDGothicNeoB'},
    }),
    color: 'black',
    fontSize: 16,
    letterSpacing: -0.25,
  },
  buttonImageContainer: {width: 30, height: 30, marginRight: 10},
  circleDiv: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    height: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
    elevation: 6,
  },
  whiteCircle: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    margin: 3,
    backgroundColor: 'white',
  },

  curationContainer: {
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    paddingHorizontal: 15,
    height: 200,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  video: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    width: 80,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    textAlign: 'center',
  },
});
