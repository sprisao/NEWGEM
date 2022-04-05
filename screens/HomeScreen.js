import React, {useRef} from "react";

import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Share,
  Platform,
} from "react-native";

import HomeButton2x1 from "../components/HomeScreen/HomeButton2x1";
import HomeButton4x1 from "../components/HomeScreen/HomeButton4x1";
import Banner from "../components/HomeScreen/Banner";
// import SightseeingBT from '../components/HomeScreen/SightseeingBT';
import ClassesBT from "../components/HomeScreen/ClassesBT";
import CurationBT from "../components/HomeScreen/CurationBT";
import Footer from "../components/Footer";

import HomeHeader from "../components/HomeScreen/HomeHeader";

import {useGlobalContext} from "../context";

import Video from "react-native-video";

const DEVICE_WIDTH = Dimensions.get("window").width;

const HomeScreen = props => {
  const {restaurants, cafes, others, spots, restaurantLoading} = useGlobalContext();

  const scrollRef = useRef();

  const handleTab = () => {
    scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const link = "https://linktr.ee/gemchelin";

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("acitivtyType!");
        } else {
          console.log("Share!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("dismissed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (restaurantLoading) {
    return (
      <View style={{flex: 1}}>
        <Video
          style={{width: "100%", height: "100%"}}
          source={require("../assets/videos/splash.mp4")}
          resizeMode="cover"
          rate={1}
          shouldPlay={true}
          muted={true}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{backgroundColor: "white"}}>
      <HomeHeader navigation={props.navigation} onTab={handleTab} />
      <ScrollView ref={scrollRef} style={styles.homeScreen} showsVerticalScrollIndicator={false}>
        <View style={styles.homeScreen_Categories}>
          <View style={styles.homeButton_Container}>
            <HomeButton2x1
              CategoryId={"recxEYsUuSaVk3ge2"}
              Category={"맛집"}
              Desc={"검색없이 한번에\n바로찾는 원주맛집!"}
              imageUrl={require("../assets/images/emojis/restaurants.png")}
              onSelect={() => {
                props.navigation.navigate({
                  name: "SecondSelect",
                  params: {
                    categoryName: "맛집",
                    categoryId: "recxEYsUuSaVk3ge2",
                    mainDataSet: restaurants,
                  },
                });
              }}
            />
            <HomeButton2x1
              CategoryId={"rec1nohULLWQVqXZD"}
              Category={"카페"}
              Desc={"원주의 \n모든 카페를 한 눈에!"}
              imageUrl={require("../assets/images/emojis/cafe.png")}
              onSelect={() => {
                props.navigation.navigate({
                  name: "SecondSelect",
                  params: {
                    categoryName: "카페",
                    categoryId: "rec1nohULLWQVqXZD",
                    mainDataSet: cafes,
                  },
                });
              }}
            />
          </View>
          <View style={styles.homeButton_Container}>
            {/* <SightseeingBT
              Category={'가볼만한 곳'}
              Desc={'관광, 레져,\n인생샷 스팟까지 한눈에!'}
              imageUrl={require('../assets/images/emojis/spot.png')}
              onSelect={() => {
                props.navigation.navigate({
                  name: 'SpotSelect',
                  params: {
                    categoryName: '가볼만한 곳',
                    mainDataSet: spots,
                  },
                });
              }}
            /> */}
            <ClassesBT
              Category={"젬 클래스"}
              Desc={"우리동네 재능마켓\n다양한 클래스 정보 "}
              imageUrl={require("../assets/images/emojis/gift.png")}
              onSelect={() => {
                props.navigation.navigate({
                  name: "Classes",
                  params: {
                    categoryName: "젬 클래스",
                    mainDataSet: spots,
                  },
                });
              }}
            />
            <CurationBT
              Category={"젬 큐레이션"}
              Desc={"젬이 소개하는\n보석같은 장소들"}
              imageUrl={require("../assets/images/emojis/curation.png")}
              onSelect={() => {
                props.navigation.navigate({
                  name: "Curations",
                });
              }}
            />
          </View>
          <Banner />
          <View style={styles.homeButton_Container}>
            <View style={styles.buttonWrapper}>
              <HomeButton4x1
                CategoryId={"rectbHPCk3LZzfu6w"}
                Category={"호프주점"}
                imageUrl={require("../assets/images/emojis/pub.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "호프・주점",
                      categoryId: "rectbHPCk3LZzfu6w",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "호프・주점"),
                    },
                  });
                }}
              />
              <HomeButton4x1
                CategoryId={"recTQQfv194uE5O1K"}
                Category={"운동헬스"}
                imageUrl={require("../assets/images/emojis/gym.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "운동・헬스",
                      categoryId: "recTQQfv194uE5O1K",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "운동・헬스"),
                    },
                  });
                }}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <HomeButton4x1
                CategoryId={"recse3cQXji2BWlNu"}
                Category={"미용뷰티"}
                imageUrl={require("../assets/images/emojis/beauty.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "미용・뷰티",
                      categoryId: "recse3cQXji2BWlNu",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "미용・뷰티"),
                    },
                  });
                }}
              />
              <HomeButton4x1
                CategoryId={"recqOzD4oznYyHeXS"}
                Category={"사진"}
                imageUrl={require("../assets/images/emojis/studio.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "사진",
                      categoryId: "recqOzD4oznYyHeXS",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "사진"),
                    },
                  });
                }}
              />
            </View>
          </View>
          <View style={styles.homeButton_Container}>
            <View style={styles.buttonWrapper}>
              <HomeButton4x1
                CategoryId={"rec9dQcEElsgcAsD7"}
                Category={"반려동물"}
                imageUrl={require("../assets/images/emojis/pets.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "반려동물",
                      categoryId: "rec9dQcEElsgcAsD7",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "반려동물"),
                    },
                  });
                }}
              />
              <HomeButton4x1
                CategoryId={"recoF9HKKfA3ZSxSP"}
                Category={"꽃"}
                imageUrl={require("../assets/images/emojis/flowershop.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "꽃",
                      categoryId: "recoF9HKKfA3ZSxSP",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "꽃"),
                    },
                  });
                }}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <HomeButton4x1
                CategoryId={"recXj7vVqBBJttGd8"}
                Category={"키즈"}
                imageUrl={require("../assets/images/emojis/kids.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "키즈",
                      categoryId: "recXj7vVqBBJttGd8",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "키즈"),
                    },
                  });
                }}
              />
              <HomeButton4x1
                CategoryId={"recz1ftDhPT8VADjf"}
                Category={"교육학원"}
                imageUrl={require("../assets/images/emojis/education.png")}
                onSelect={() => {
                  props.navigation.navigate({
                    name: "SecondSelect",
                    params: {
                      categoryName: "교육・학원",
                      categoryId: "recz1ftDhPT8VADjf",
                      mainDataSet: others.filter(item => item.firstCategory[0] === "교육・학원"),
                    },
                  });
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.gemSection}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL("instagram://user?username=gemchelin").catch(() => {
                  Linking.openURL("https://www.instagram.com/gemchelin");
                });
              }}>
              <View style={styles.buttonImageContainer}>
                <Image
                  source={require("../assets/images/SNS/INSTAGRAM.png")}
                  style={{width: "100%", height: "100%"}}
                />
              </View>
              <Text style={styles.buttonText}>젬스타그램</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                Linking.openURL("instagram://user?username=brave.choe").catch(() => {
                  Linking.openURL("https://www.instagram.com/gemchelin");
                });
              }}>
              <View style={styles.buttonImageContainer}>
                <Image
                  source={require("../assets/images/SNS/INSTAGRAM.png")}
                  style={{width: "100%", height: "100%"}}
                />
              </View>
              <Text style={styles.buttonText}>개발자 SNS</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.navigation.navigate({
                  name: "CRUD",
                });
                // Linking.openURL("https://pf.kakao.com/_FCGCs/chat").catch(() => {
                //   "https://pf.kakao.com/_FCGCs/chat";
                // });
              }}>
              <View style={styles.buttonImageContainer}>
                <Image
                  source={require("../assets/images/emojis/ask.png")}
                  style={{width: "100%", height: "100%"}}
                />
              </View>
              <Text style={styles.buttonText}>가게 홍보 및 등록 문의</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onShare();
              }}>
              <View style={styles.buttonImageContainer}>
                <Image
                  source={require("../assets/images/emojis/heart.png")}
                  style={{width: "100%", height: "100%"}}
                />
              </View>
              <Text style={styles.buttonText}>친구에게도 젬 알려주기!</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>Powered by</Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/BI/LogoGrey.png")}
              style={{width: "100%", height: "100%"}}
            />
          </View>
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeScreen: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f6f6f6",
    zIndex: 0,
  },
  homeScreen_Categories: {
    width: "100%",
    zIndex: 1,
    paddingHorizontal: DEVICE_WIDTH > 400 ? 13 : 10,
    marginTop: -200,
    paddingTop: 200,
    paddingBottom: 35,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "white",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  homeButton_Container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    overflow: "hidden",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "48.5%",
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "white",
    height: 65,
    borderRadius: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    ...Platform.select({
      ios: {fontFamily: "AppleSDGothicNeo-Regular"},
      android: {fontFamily: "AppleSDGothicNeoSB"},
    }),
    color: "black",
    fontSize: 15,
    letterSpacing: -0.25,
  },
  buttonImageContainer: {width: 30, height: 30, marginRight: 10},
  logoSection: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    justifyContent: "center",
    flexDirection: "row",
  },
  logoText: {fontFamily: "AppleSDGothicNeo-SemiBold", color: "#666"},
  logoContainer: {
    width: 25,
    height: 27,
    marginLeft: 5,
    padding: 3,
  },
});
