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

import React, {useState, useEffect} from "react";
import FastImage from "react-native-fast-image";

import auth from "@react-native-firebase/auth";

const PwResetScreen = props => {
  const [email, setEmail] = useState("");
  const [emailCheck, setEmailCheck] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(false);

  const checkEmail = e => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    const result = regExp.test(e);
    {
      result ? setEmailCheck(true) & setEmail(e) : setEmailCheck(false);
    }
  };

  const showErrMsg = () => {
    setEmailErrMsg(!emailCheck);
  };

  const clearErrMsg = () => {
    setEmailErrMsg(false);
  };

  const handleSubmit = () => {
    if (emailCheck) {
      clearErrMsg();
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(
            "발송완료",
            "비밀번호 재설정 이메일이 발송되었습니다!",
            //   [
            //     {
            //       text: "Cancel",
            //       onPress: () => console.log("Cancel Pressed"),
            //       style: "cancel"
            //     },
            //     { text: "OK", onPress: () => console.log("OK Pressed") }
            //   ]
          );
        })
        .catch(error => {
          Alert.alert("에러", "가입되어있지 않은 이메일 주소입니다.");
          // ..
        });
    } else {
      showErrMsg();
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <View style={styles.contentsContainer}>
          <View style={styles.logoContainer}>
            <FastImage source={require("../assets/images/BI/logo.png")} style={styles.logo} />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>비밀번호 재설정</Text>
          </View>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              blurOnSubmit={true}
              onChange={e => checkEmail(e.nativeEvent.text)}
              autoCapitalize="none"
              autoFocus={true}
              placeholder="이메일 주소를 입력해주세요"></TextInput>
            {emailErrMsg ? (
              <View style={styles.errorMsg_Container}>
                <Text style={styles.errorMsg}>🤭 이메일 형식을 확인해 주세요</Text>
              </View>
            ) : null}
          </View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => handleSubmit()}>
            <Text style={styles.loginBtn_Text}>확인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionsContainer}
            onPress={() => props.navigation.navigate({name: "로그인"})}>
            <Text>로그인 하러가기 {">"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default PwResetScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
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
    fontSize: 20,
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
    justifyContent: "flex-end",
  },
});
