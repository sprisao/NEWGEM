import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const DetailsInfo = ({storeData}) => {
  let businessHours;

  if (storeData.openHour || storeData.closeHOur) {
    if (storeData.breaktimeStart) {
      businessHours = (
        <View style={styles.detailsInfo_Item}>
          <Feather
            style={{marginRight: 10}}
            name="clock"
            size={16}
            color="#a8a8a8"
          />
          <Text style={styles.detailsInfo_ItemText}>
            {storeData.openHour} ~ {storeData.closeHour} <Text> 휴게시간 </Text>
            {storeData.breaktimeStart} ~ {storeData.breaktimeEnd}
          </Text>
        </View>
      );
    } else {
      businessHours = (
        <View style={styles.detailsInfo_Item}>
          <Feather
            style={{marginRight: 10}}
            name="clock"
            size={16}
            color="#a8a8a8"
          />
          <Text style={styles.detailsInfo_ItemText}>
            {storeData.openHour} ~ {storeData.closeHour}
          </Text>
        </View>
      );
    }
  }

  let breakDays;

  if (storeData.breakDays) {
    if (storeData.breakDays[0] === '연중무휴') {
      breakDays = (
        <View style={styles.detailsInfo_Item}>
          <Feather
            style={{marginRight: 10}}
            name="x-circle"
            size={16}
            color="#a8a8a8"
          />
          <Text style={styles.detailsInfo_ItemText}>{storeData.breakDays}</Text>
        </View>
      );
    }
    if (
      storeData.breakDays[0] !== '연중무휴' &&
      storeData.breakDays.length === 1
    ) {
      breakDays = (
        <View style={styles.detailsInfo_Item}>
          <Feather
            style={{marginRight: 10}}
            name="x-circle"
            size={16}
            color="#a8a8a8"
          />
          <Text style={styles.detailsInfo_ItemText}>
            {storeData.breakDays}{' '}
            <Text style={[styles.detailsInfo_ItemText, {color: 'red'}]}>
              휴무
            </Text>
          </Text>
        </View>
      );
    }
    if (storeData.breakDays.length >= 2) {
      breakDays = (
        <View style={styles.detailsInfo_Item}>
          <Feather
            style={{marginRight: 10}}
            name="x-circle"
            size={16}
            color="#a8a8a8"
          />
          {storeData.breakDays.map(breakDay => (
            <Text style={styles.detailsInfo_ItemText} key={breakDay.toString()}>
              {breakDay}&nbsp;
            </Text>
          ))}
          <Text style={[styles.detailsInfo_ItemText, {color: 'red'}]}>
            휴무
          </Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.detailsInfo}>
      <Entypo
        name="chevron-small-down"
        size={24}
        color="black"
        style={{marginBottom: 5}}
      />
      <View style={styles.detailsInfoWrapper}>
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>상세정보</Text>
        </View> */}
        <View style={styles.infosContainer}>
          {businessHours}
          {breakDays}
          <View style={styles.detailsInfo_Item}>
            <Feather
              style={{marginRight: 10}}
              name="map-pin"
              size={16}
              color="#a8a8a8"
            />
            <Text style={styles.detailsInfo_ItemText} numberOfLines={1}>
              {storeData.fullAddress}
            </Text>
          </View>
          <View style={styles.detailsInfo_Item}>
            <Feather
              style={{marginRight: 10}}
              name="phone-outgoing"
              size={16}
              color="#a8a8a8"
            />
            <Text style={styles.detailsInfo_ItemText}>
              {storeData.phoneNumber}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailsInfo;

const styles = StyleSheet.create({
  detailsInfo: {
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 7,
  },
  detailsInfoWrapper: {
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 12,
  },
  headerText: {
    fontFamily: 'AppleSDGothicNeo-SemiBold',
    fontSize: 16,
    letterSpacing: -0.25,
  },
  detailsInfo_Item: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#dddddd',
    // marginBottom: 5,
    paddingVertical: 6,
  },
  detailsInfo_ItemText: {
    fontFamily: 'AppleSDGothicNeo-Light',
    fontSize: 16,
    includeFontPadding: false,
    paddingBottom: 2,
  },
  infoButton: {
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  naverLinkContainer: {
    width: '85%',
  },
});
