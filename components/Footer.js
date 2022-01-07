import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableWithoutFeedback} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const Footer = () => {
  const [isShow, setisShow] = useState(false);
  const pressHandler = () => {
    if (!isShow) {
      setisShow(true);
    } else {
      setisShow(false);
    }
  };
  return (
    <View style={styles.footer}>
      <View style={styles.footer_Wrapper}>
        <TouchableWithoutFeedback onPress={pressHandler}>
          <View style={styles.CompanyName}>
            <Text style={styles.CompanyNameText}>Bruce Corporation</Text>
            <Feather name="chevron-down" size={24} color="black" />
          </View>
        </TouchableWithoutFeedback>
        {isShow ? (
          <View style={styles.CompanyDetails}>
            <Text style={styles.CompanyDetailsText}>
              브루스 코퍼레이션 | 대표: 최종혁
            </Text>
            <Text style={styles.CompanyDetailsText}>
              사업자등록번호:103-28-01020 | 통신판매업: 2020-강원원주-00664
            </Text>
          </View>
        ) : null}
        <View style={styles.Copyright}>
          <Text style={styles.CopyrightText}>
            Copyright © 2020 Bruce Corp. All rights reserved.
          </Text>
        </View>
        <View style={styles.Notice}>
          <Text style={styles.NoticeText}>
            브루스코퍼레이션은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
            또한 판매자와 구매자간의 직거래에 대하여 당사는 관여하지 않기 때문에
            거래에 대해서는 책임을 지지 않습니다.
          </Text>
        </View>
        <View style={styles.policies}>
          <Text style={styles.policyText}>이용약관</Text>
          <Text> ・ </Text>
          <Text style={styles.policyText}>업체이용약관</Text>
          <Text> ・ </Text>
          <Text style={styles.policyText}>개인정보취급방침</Text>
        </View>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    backgroundColor: '#f3f3f3',
    marginTop: 20,
  },
  footer_Wrapper: {
    height: 190,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 13,
    paddingBottom: 40,
    marginBottom: 40,
  },
  CompanyName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CompanyNameText: {
    includeFontPadding: false,
    fontFamily: 'AppleSDGothicNeoB',
    fontSize: 16,
    letterSpacing: -0.5,
  },
  CompanyDetailsText: {
    fontFamily: 'AppleSDGothicNeoR',
    letterSpacing: -0.35,
    fontSize: 11,
    includeFontPadding: false,
  },
  CopyrightText: {
    fontFamily: 'AppleSDGothicNeoR',
    letterSpacing: -0.35,
    fontSize: 11,
    includeFontPadding: false,
  },

  NoticeText: {
    fontFamily: 'AppleSDGothicNeoR',
    letterSpacing: -0.35,
    fontSize: 11,
    includeFontPadding: false,
  },
  policies: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  policyText: {
    fontFamily: 'AppleSDGothicNeoSB',
    letterSpacing: -0.35,
    fontSize: 12,
    includeFontPadding: false,
  },
});
