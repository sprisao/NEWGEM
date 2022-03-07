import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import React, {useState, useEffect, useRef} from "react";

import auth from "@react-native-firebase/auth";

import {GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";

import FastImage from "react-native-fast-image";

const LoginScreen = props => {
  const [user, setUser] = useState();

  const [initializing, setInitializing] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pwCheck, setPwCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const [emailErrMsg, setEmailErrMsg] = useState(false);
  const [pwErrMsg, setPwErrMsg] = useState(false);

  const scrollRef = useRef();

  const onAuthStateChanged = user => {
    setUser(user);
  };

  useEffect(() => {
    console.log(auth().currentUser);
    if (auth().currentUser) {
      setUser(auth().currentUser);
    }
  }, []);

  const handleLogout = () => {
    console.log("로그아웃");
    auth().signOut();
  };

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(googleCredential);
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        props.navigation.navigate({
          name: "홈",
        });
      });
  };

  const checkEmail = e => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    const result = regExp.test(e);
    {
      result ? setEmailCheck(true) & setEmail(e) : setEmailCheck(false);
    }
  };

  const checkPassword = e => {
    if (e !== "") {
      setPassword(e);
      setPwCheck(true);
    } else {
      setPwCheck(false);
    }
  };

  const showErrMsg = () => {
    setEmailErrMsg(!emailCheck);
    setPwErrMsg(!pwCheck);
  };

  const clearErrMsg = () => {
    setEmailErrMsg(false);
    setPwErrMsg(false);
  };

  const handleSubmit = async () => {
    if (pwCheck && emailCheck) {
      console.log("로그인 시도");
      clearErrMsg();
      const user = await auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          props.navigation.navigate({
            name: "홈",
          });
        })
        .catch(error => {
          if (error.code === "auth/too-many-requests") {
            Alert.alert("잘못된 비밀번호", "비밀번호를 확인 해 주세요 ");
          }
          if (error.code === "auth/user-not-found") {
            Alert.alert("사용자 찾을 수 없음", "해당 이메일로 가입된 사용자가 없습니다.");
          }
          if (error.code === "auth/too-many-requests") {
            Alert.alert("너무 많은 로그인 시도", "잠시 뒤 다시 시도해 주세요");
          }
          console.log(error);
        });
    } else {
      showErrMsg();
    }
  };

  const handleScroll = () => {
    scrollRef.current.scrollToEnd({animated: "true"});
  };

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
              <Text style={styles.titleText}>로그인</Text>
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
                onChange={e => checkPassword(e.nativeEvent.text)}></TextInput>
              {pwErrMsg ? (
                <View style={styles.errorMsg_Container}>
                  <Text style={styles.errorMsg}>🤭 비밀번호를 확인해 주세요</Text>
                </View>
              ) : null}
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => handleSubmit()}>
              <Text style={styles.loginBtn_Text}>로그인</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginBtn, styles.loginBtn_Google]}
              onPress={() => onGoogleButtonPress()}>
              <FastImage
                source={require("../assets/images/SNS/google.png")}
                style={styles.loginBtn_Logo}></FastImage>
              <Text>Google 계정으로 계속하기</Text>
            </TouchableOpacity>

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate({
                    name: "회원가입",
                  })
                }>
                <Text>이메일로 3초만에 가입하기 {">"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate({name: "비밀번호 재설정"})}>
                <Text>비밀번호 재설정 {">"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

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
    width: "80%",
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
    width: "100%",
    marginVertical: 5,
  },
  textInput: {
    marginTop: 13,
    width: "100%",
    padding: 15,
    borderRadius: 8,
    borderWidth: 0.3,
    backgroundColor: "#f5f5f5",
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
    fontSize: 15,
  },
  loginBtn_Google: {
    backgroundColor: "white",
    borderWidth: 0.2,
    // justifyContent: "flex-start",
  },
  optionsContainer: {
    width: "99%",
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
});
