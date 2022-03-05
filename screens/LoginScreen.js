import {StyleSheet, Text, View, Button} from "react-native";

import React, {useState, useEffect} from "react";

import auth from "@react-native-firebase/auth";

import {GoogleSignin, GoogleSigninButton} from "@react-native-google-signin/google-signin";

import {TextInput, TouchableOpacity} from "react-native-gesture-handler";

const LoginScreen = props => {
  const [user, setUser] = useState();

  const [initializing, setInitializing] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [pwCheck, setPwCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);

  const [emailErrMsg, setEmailErrMsg] = useState(false);
  const [pwErrMsg, setPwErrMsg] = useState(false);

  useEffect(() => {
    if (auth().currentUser) {
      setUser(auth().currentUser);
    }
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const handleLogout = () => {
    auth().signOut();
  };

  const onGoogleButtonPress = async () => {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const checkEmail = e => {
    var regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    // 형식에 맞는 경우 true 리턴
    const result = regExp.test(e);
    {
      result ? setEmailCheck(true) & setEmail(e) : setEmailCheck(false);
    }
    console.log(result);
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

  console.log(email);
  const handleSubmit = () => {
    console.log("submit 들어왔고");
    console.log("pwCheck", pwCheck);
    console.log("emailCheck", emailCheck);
    console.log(email);
    if (pwCheck && emailCheck) {
      // clearErrMsg();
      auth().signInWithEmailAndPassword(email, password);
    } else {
      showErrMsg();
    }
  };

  return (
    <View style={styles.screen}>
      {user ? (
        <Button onPress={handleLogout} title="로그아웃"></Button>
      ) : (
        <>
          <TextInput
            style={styles.textInput}
            onChange={e => checkEmail(e.nativeEvent.text)}
            autoCapitalize="none"
            placeholder="Email"></TextInput>
          {emailErrMsg ? <Text>이메일을 확인해 주세요</Text> : null}

          <TextInput
            style={styles.textInput}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            onChange={e => checkPassword(e.nativeEvent.text)}></TextInput>
          {pwErrMsg ? <Text>비밀번호를 확인해 주세요</Text> : null}

          <TouchableOpacity style={styles.loginBtn_Container} onPress={() => handleSubmit()}>
            <Text>로그인</Text>
          </TouchableOpacity>

          <GoogleSigninButton onPress={() => onGoogleButtonPress()} />
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate({
                name: "회원가입",
              })
            }>
            <Text>회원가입</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "yellow",
  },
  textInput: {
    width: 200,
    height: 50,
  },
  loginBtn_Container: {
    width: 120,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "green",
    borderRadius: 8,
  },
});
