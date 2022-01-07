import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import {useGlobalContext} from '../../context';

const LocationPicker = props => {
  const {locationCategories} = useGlobalContext();
  const [isShow, setIsShow] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('전체');
  const pressHandler = () => {
    if (!isShow) {
      setIsShow(true);
    } else setIsShow(false);
  };

  const selectLocation = item => {
    setSelectedLocation(item);
    setIsShow(false);
  };

  useEffect(() => {
    props.navigation.setParams({location: selectedLocation});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.wrapper} onPress={pressHandler}>
        <Text style={styles.buttonText}>{selectedLocation}</Text>
        <Feather
          name="chevron-down"
          size={12}
          color="black"
          style={{marginTop: 2, marginLeft: 2}}
        />
      </TouchableOpacity>
      {isShow ? (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={e => selectLocation('전체')}>
            <Text style={styles.listText}>전체</Text>
          </TouchableOpacity>
          {locationCategories.map(item => {
            return (
              <TouchableOpacity
                style={styles.menuItem}
                onPress={e => selectLocation(item.name)}
                key={item.id}>
                <Text key={item.id} style={styles.listText}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 13,
    paddingBottom: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    width: 110,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontFamily: 'AppleSDGothicNeo-Light',
    letterSpacing: -0.5,
    fontSize: 13,
  },
  menuContainer: {
    flex: 1,
    width: 100,
    position: 'absolute',
    top: 44,
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 11,
    borderRadius: 6,
    paddingVertical: 5,
  },
  menuItem: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  listText: {
    fontFamily: 'AppleSDGothicNeo-Light',
    letterSpacing: -0.5,
    fontSize: 13,
  },
});
