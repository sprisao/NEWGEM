import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Switch,
  Modal,
  Platform,
  Pressable,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FastImage from 'react-native-fast-image';

const HomeHeader = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const toggleSwitch = () => {
    if (!isEnabled) {
      setModalVisible(true);
    }
    setIsEnabled(previousState => !previousState);
  };
  const handleTab = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.homeHeader}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.leftBox} onPress={props.onTab}>
          <View style={styles.logoContainer}>
            <FastImage
              source={require('../../assets/images/BI/logo.png')}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <Text style={styles.headerText}>어디가지? 고민할 땐-!</Text>
        </TouchableOpacity>
        <View style={styles.rightBox}>
          <TouchableOpacity
            style={styles.locationPicker_Container}
            onPress={handleTab}>
            <View style={styles.locationWrapper}>
              <Feather name="map-pin" size={13} color="black" />
              <Text style={styles.locationText}>강원도 원주시</Text>
              <Feather name="chevron-down" size={15} color="black" />
            </View>
          </TouchableOpacity>
          <View style={styles.travelMode_Container}>
            <View style={styles.travelWrapper}>
              <Text style={styles.travelText}>여행모드</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={
                  Platform.OS === 'ios'
                    ? {transform: [{scaleX: 0.6}, {scaleY: 0.6}]}
                    : {transform: [{scaleX: 0.95}, {scaleY: 0.95}]}
                }
              />
            </View>
          </View>
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
            <Text style={styles.modalText}>업데이트 예정입니다!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>확인</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  homeHeader: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 2,
  },
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftBox: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logoContainer: {width: 30, height: 33},
  rightBox: {
    width: '50%',
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationPicker_Container: {
    height: 47,
    width: '64%',
    paddingHorizontal: 7,
    paddingVertical: 5,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  locationWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  travelMode_Container: {
    width: '31%',
    height: 47,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },

  headerText: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-UltraLight'},
      android: {fontFamily: 'AppleSDGothicNeoR'},
    }),
    fontSize: 12,
    marginLeft: 10,
    color: 'black',
  },
  locationText: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-UltraLight'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),
    color: '#666666',
    fontSize: 12,
    marginBottom: 3,
  },
  travelText: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-UltraLight'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),
    color: '#666666',
    fontSize: 11,
    textAlign: 'center',
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
  button: {
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
