import React, {useRef, useState, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';

import GridWrapper from '../components/CategoryScreen/GridWrapper';

const deviceWidth = Dimensions.get('window').width;

const CategoryScreen = props => {
  const mainDataSet = props.route.params.mainDataSet;
  const currentLocation = props.route.params.location;

  const initialIndex = [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pageRef = useRef();
  const tabsRef = useRef();

  let localFilter;
  if (currentLocation === '전체') {
    localFilter = mainDataSet;
  } else {
    localFilter = mainDataSet.filter(
      item => item.eupmyeondongRi === currentLocation,
    );
  }

  const groupBy = function (data, key) {
    return data.reduce(function (storage, item) {
      const group = item[key];
      storage[group] = storage[group] || [];
      storage[group].push(item);
      return storage;
    }, {});
  };

  const orderData = (data, key) => {
    const container = [{category: '전체', data: localFilter}];
    const preData = groupBy(data, key);
    const getData = Object.entries(preData);

    getData.forEach(element => {
      container.push({
        category: element[0],
        data: element[1],
      });
    });
    return container;
  };

  const dataSet = orderData(localFilter, 'secondCategory');

  const initialSelect = props.route.params.selectedCategory;

  dataSet.forEach((element, index) => {
    if (element.category === initialSelect) {
      initialIndex.push(index);
    }
  });

  // 이벤트 해들러
  const tabHandler = e => {
    pageRef.current.scrollToIndex({
      animated: true,
      index: e,
      viewPosition: 0,
    });
  };

  const scrollHandler = e => {
    const offset = e.nativeEvent.contentOffset.x;
    const pageIndex = Math.floor(offset / deviceWidth);
    const selectedIndex = Platform.OS === 'ios' ? pageIndex : pageIndex + 1;

    setSelectedIndex(selectedIndex);
    if (offset > 0) {
      tabsRef.current.scrollToIndex({
        animated: true,
        index: selectedIndex,
        viewPosition: 0.5,
      });
    }
  };

  // 탭 렌더링
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderTabs = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[
          styles.tab,
          {borderBottomWidth: index === selectedIndex ? 3 : 0},
        ]}
        onPress={() => tabHandler(index)}>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.tabText,
              {opacity: index === selectedIndex ? 1 : 0.75},
            ]}>
            {item.category}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  // 각 2차카테고리별 페이지 렌더링
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const renderPage = ({item, index}) => {
    return (
      <View style={styles.page}>
        <GridWrapper
          data={item.data}
          navigation={props.navigation}
          route={props.route}></GridWrapper>
      </View>
    );
  };
  const memoizedPage = useMemo(() => renderPage, [renderPage]);
  const memoizedTabs = useMemo(() => renderTabs, [renderTabs]);

  return (
    <View style={styles.screen}>
      <View style={styles.tabsContainer}>
        <FlatList
          ref={tabsRef}
          data={dataSet}
          keyExtractor={item => item.category}
          renderItem={memoizedTabs}
          horizontal
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => ({
            length: 75,
            offset: 75 * index,
            index,
          })}
        />
      </View>
      <FlatList
        ref={pageRef}
        data={dataSet}
        keyExtractor={item => {
          return item.category;
        }}
        renderItem={memoizedPage}
        bounces={false}
        onScroll={scrollHandler}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        initialScrollIndex={initialIndex[0]}
        initialNumToRender={0}
        maxToRenderPerBatch={0}
        getItemLayout={(data, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  screen: {flex: 1},
  page: {width: deviceWidth},
  tabsContainer: {height: 'auto', width: '100%', backgroundColor: 'white'},
  tab: {
    width: 75,
    justifyContent: 'center',
    alignItems: 'center',

    paddingTop: 10,
    paddingBottom: 7,
    borderBottomColor: 'black',
  },
  textContainer: {
    width: 'auto',
    height: 'auto',
    borderBottomColor: 'blue',
    paddingVertical: 5,
    paddingHorizontal: 1,
  },
  tabText: {
    fontFamily: 'AppleSDGothicNeo-Light',
    letterSpacing: -0.25,
    fontSize: 13,
  },
});
