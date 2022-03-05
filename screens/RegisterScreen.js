import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TextInput, Button} from "react-native";
import auth from "@react-native-firebase/auth";

const RegisterScreen = props => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [emailCheck, setEmailCheck] = useState(false);
  const [passwordChek, setPasswordChek] = useState(false);

  const [emailInUse, setEmailInUse] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState(false);

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
      result ? console.log("이메일 유효") : null;
    }
    setEmailCheck(result);
    setRegisterEmail(e);
  };

  // 패스워드 일치여부 체크
  const checkPassword = e => {
    console.log("일치테스트", e);
    if (registerPassword == e) {
      console.log("비밀번호 확인 일치");
      setPasswordChek(true);
    }
  };

  // 유효성 체크 하여 메세지 여부 판단
  const showErrMsg = () => {
    setEmailErrMsg(!emailCheck);
    setPasswordErrMsg(!passwordChek);
  };

  // 유효성 통과시 메세지 제거
  const clearErrMsg = () => {
    setEmailErrMsg(false);
    setPasswordErrMsg(false);
  };

  //
  const validCheck = () => {
    checkEmail();
    checkPassword();
    register();
  };

  const register = async () => {
    if (emailCheck == true && passwordChek == true) {
      console.log("둘다일치");
      clearErrMsg();
      const user = await auth()
        .createUserWithEmailAndPassword(registerEmail, registerPassword)
        .then(() => {
          props.navigation.navigate({
            name: "홈",
          });
        })
        .catch(error => {
          if (error.code === "auth/email-already-in-use") {
            setEmailInUse(true);
          }

          if (error.code === "auth/invalid-email") {
            setEmailErrMsg(true);
            console.log("That email address is invalid!");
          }
          console.error(error);
        });
    } else {
      console.log("적어도 둘중 하나 불일치");
      console.log("이메일일치: ", emailCheck);
      console.log("비밀번호일치: ", passwordChek);
      console.log(registerPassword);
      console.log(passwordConfirm);
      showErrMsg();
    }
  };

  if (initializing) return <Text>로딩중</Text>;
  return (
    <View>
      <Text>RegisterScreen</Text>
      <View>
        <TextInput
          onChange={e => checkEmail(e.nativeEvent.text)}
          placeholder="Email"
          autoComplete="email"
          autoCapitalize="none"
        />
        {emailErrMsg ? <Text>이메일 형식에 맞게 입력해주세요!</Text> : null}
        {emailInUse ? <Text>이미 사용중이 이메일 주소입니다.</Text> : null}
        <TextInput
          onChange={e => setRegisterPassword(e.nativeEvent.text)}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
        />
        <TextInput
          onChange={e => checkPassword(e.nativeEvent.text)}
          secureTextEntry={true}
          placeholder="Password Confirm"
          autoCapitalize="none"
        />
        {passwordErrMsg ? <Text>비밀번호가 일치하지 않습니다.</Text> : null}

        <Button title="회원가입" onPress={() => validCheck()} />
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
