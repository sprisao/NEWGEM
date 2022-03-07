import React, {useState, useEffect, useRef} from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import FastImage from "react-native-fast-image";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import Icon from "react-native-vector-icons/Ionicons";

const RegisterScreen = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userAgreement, setUserAgreement] = useState(false);
  const [privatePolicy, setPrivatePolicy] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);

  const [pwCheck, setPwCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const [emailErrMsg, setEmailErrMsg] = useState(false);
  const [pwErrMsg, setPwErrMsg] = useState(false);
  const [agmtErrMsg, setAgmtErrMsg] = useState(false);

  const scrollRef = useRef();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // 이메일 유효성 체크
  const checkEmail = e => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    const result = regExp.test(e);
    {
      result ? setEmailCheck(result) & setEmail(e) : setEmailCheck(false);
    }
  };

  // 패스워드 일치여부 체크
  const checkPassword = e => {
    if (password == e) {
      setPwCheck(true);
    }
  };

  // 유효성 체크 하여 메세지 여부 판단
  const showErrMsg = () => {
    setEmailErrMsg(!emailCheck);
    setPwErrMsg(!pwCheck);
    if (!userAgreement || !privatePolicy) {
      setAgmtErrMsg(true);
    } else if (userAgreement && privatePolicy) {
      setAgmtErrMsg(false);
    }
  };

  // 유효성 통과시 메세지 제거
  const clearErrMsg = () => {
    setEmailErrMsg(false);
    setPasswordErrMsg(false);
    setAgmtErrMsg(false);
  };

  // 유효성 체크
  const validCheck = () => {
    checkEmail();
    checkPassword();
    register();
  };

  // 서비스 사용 동의 토글
  const onServiceToggle = () => {
    setUserAgreement(!userAgreement);
  };

  // 개인정보 취급 동의 토글

  const onPrivateToggle = () => {
    setPrivatePolicy(!privatePolicy);
  };

  // 마케팅 동의 토글

  const onMarketingToggle = () => {
    setMarketingAgree(!marketingAgree);
  };

  // 전체 동의 토글

  const onAllToggle = () => {
    setUserAgreement(true);
    setPrivatePolicy(true);
    setMarketingAgree(true);
  };

  // Focus시 스크롤 다운
  const handleScroll = () => {
    scrollRef.current.scrollToEnd({animated: "true"});
  };

  // 유효성 체크 후 회원가입 진행
  const register = async () => {
    if (emailCheck && pwCheck && userAgreement && privatePolicy) {
      clearErrMsg();
      const user = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          firestore()
            .collection("Users")
            .add({
              uid: userCredential.user.uid,
              email: email,
              registerPassword: password,
              userAgreement: userAgreement,
              privatePolicy: privatePolicy,
            })
            .then(() => {
              props.navigation.navigate({
                name: "홈",
              });
            });
        })
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("이미 가입된 이메일", "이미 가입된 이메일 주소입니다.");
          }
        });
    } else {
      showErrMsg();
    }
  };

  if (initializing) return <Text>로딩중</Text>;
  return (
    <ScrollView ref={scrollRef} style={styles.screen} showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView style={styles.wrapper}>
        {user ? (
          <Button onPress={handleLogout} title="로그아웃"></Button>
        ) : (
          <View style={styles.contentsContainer}>
            <View style={styles.logoContainer}>
              <FastImage source={require("../assets/images/BI/logo.png")} style={styles.logo} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>회원가입</Text>
            </View>
            <View style={styles.formContainer}>
              <TextInput
                style={styles.textInput}
                blurOnSubmit={true}
                onChange={e => checkEmail(e.nativeEvent.text)}
                autoCapitalize="none"
                onFocus={handleScroll}
                placeholder="이메일"></TextInput>
              {emailErrMsg ? (
                <View style={styles.errorMsg_Container}>
                  <Text style={styles.errorMsg}>🤭 이메일을 확인해 주세요</Text>
                </View>
              ) : null}

              <TextInput
                style={styles.textInput}
                blurOnSubmit={true}
                placeholder="비밀번호"
                autoCapitalize="none"
                secureTextEntry={true}
                onFocus={handleScroll}
                onChange={e => setPassword(e.nativeEvent.text)}></TextInput>

              <TextInput
                style={styles.textInput}
                blurOnSubmit={true}
                placeholder="비밀번호 확인"
                autoCapitalize="none"
                secureTextEntry={true}
                onFocus={handleScroll}
                onChange={e => checkPassword(e.nativeEvent.text)}></TextInput>
              {pwErrMsg ? (
                <View style={styles.errorMsg_Container}>
                  <Text style={styles.errorMsg}>🤭 비밀번호를 확인해 주세요</Text>
                </View>
              ) : null}
            </View>
            <View style={styles.policyContainer}>
              <View style={styles.policyWrapper}>
                <View style={styles.policyTitle_Container}>
                  <Text style={styles.policyTitle}>서비스 정책</Text>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => onServiceToggle()}>
                    <Icon
                      name={userAgreement ? "ios-checkbox" : "square-outline"}
                      size={25}
                      color={userAgreement ? "#4E8ef7" : "black"}
                    />
                  </TouchableOpacity>
                  <View style={styles.articleWrapper}>
                    <View style={styles.articleWrapper2}>
                      <Text style={[styles.policyRqText, {color: "red"}]}>[필수]</Text>
                      <Text style={styles.policyText}>서비스 이용약관에 동의합니다.</Text>
                    </View>
                    <Text style={styles.policyAll}>전문보기</Text>
                  </View>
                </View>
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => onPrivateToggle()}>
                    <Icon
                      name={privatePolicy ? "ios-checkbox" : "square-outline"}
                      size={25}
                      color={privatePolicy ? "#4E8ef7" : "black"}
                    />
                  </TouchableOpacity>
                  <View style={styles.articleWrapper}>
                    <View style={styles.articleWrapper2}>
                      <Text style={[styles.policyRqText, {color: "red"}]}>[필수]</Text>
                      <Text style={styles.policyText}>개인정보 취급방침에 동의합니다.</Text>
                    </View>
                    <Text style={styles.policyAll}>전문보기</Text>
                  </View>
                </View>
                {agmtErrMsg ? (
                  <View>
                    <Text>필수 이용약관에 동의해주세요</Text>
                  </View>
                ) : null}
                <View style={styles.itemContainer}>
                  <TouchableOpacity onPress={() => onMarketingToggle()}>
                    <Icon
                      name={marketingAgree ? "ios-checkbox" : "square-outline"}
                      size={25}
                      color={marketingAgree ? "#4E8ef7" : "black"}
                    />
                  </TouchableOpacity>
                  <View style={styles.articleWrapper}>
                    <View style={styles.articleWrapper2}>
                      <Text style={styles.policyRqText}>[선택]</Text>
                      <Text style={styles.policyText}>마케팅 수신 동의 (이벤트{"&"}할인정보)</Text>
                    </View>
                    <Text style={{color: "transparent"}}>전문보기</Text>
                  </View>
                </View>
                <View style={styles.allToggleBtn}>
                  <Button title="전체동의" onPress={() => onAllToggle()} />
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => validCheck()}>
              <Text style={styles.loginBtn_Text}>확 인</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

{
  /* <div className={`Usage-Modal ${usageShow ? 'active' : 'inactive'}`}>
<div className='Modal-Header'>
  <h1 style={{ fontFamily: 'NotoSans-Kr', fontWeight: '900' }}>
    서비스 이용약관
  </h1>
  <button onClick={handleClose} className='modal-closeButton'>
    {' '}
    <BsX />
  </button>
</div>
<div className='Modal-Body'>
  <img
    src='https://res.cloudinary.com/diimwnnmj/image/upload/v1629782306/%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%80%E1%85%AA%E1%86%AB_zhlkoa.jpg'
    alt='이용 약관'
    style={{ width: '100%' }}
  />
</div>
</div> */
}

export default RegisterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    ...Platform.select({
      ios: {marginBottom: 300},
      android: {marginBottom: 15},
    }),
  },
  contentsContainer: {
    flex: 1,
    width: "90%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  logo: {
    width: 50,
    height: 55,
  },
  titleContainer: {
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#333",
    borderBottomWidth: 0.3,
    paddingVertical: 15,
  },
  titleText: {
    ...Platform.select({
      ios: {fontFamily: "AppleSDGothicNeo-Light"},
      android: {fontFamily: "AppleSDGothicNeoSB"},
    }),
    fontSize: 24,
  },
  formContainer: {
    width: "95%",
    marginVertical: 5,
  },
  textInput: {
    marginTop: 13,
    width: "100%",
    padding: 15,
    borderRadius: 8,
    borderWidth: 0.3,
    backgroundColor: "#ffffff",
    height: 50,
  },
  errorMsg_Container: {
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  errorMsg: {
    color: "red",
  },
  loginBtn: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#4E8ef7",
    borderRadius: 20,
  },
  loginBtn_Logo: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  loginBtn_Text: {
    color: "white",
    fontSize: 18,
  },
  loginBtn_Google: {
    backgroundColor: "white",
    borderWidth: 0.2,
  },
  optionsContainer: {
    width: "99%",
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  policyContainer: {
    width: "95%",
    padding: 13,
    backgroundColor: "#f3f3f3",
    marginVertical: 18,
    borderRadius: 15,
  },
  policyWrapper: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "100%",
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  articleWrapper: {
    width: "92%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingBottom: 1.5,
    paddingLeft: 3,
  },
  articleWrapper2: {
    flexDirection: "row",
  },
  policyTitle_Container: {marginVertical: 8},
  policyTitle: {
    ...Platform.select({
      ios: {fontFamily: "AppleSDGothicNeo-SemiBold"},
      android: {fontFamily: "AppleSDGothicNeoB"},
    }),
    fontSize: 14,
  },
  policyRqText: {marginRight: 3},
  policyText: {},
  policyAll: {fontSize: 14.5, color: "#4E8ef7"},
  allToggleBtn: {marginVertical: 6},
});
