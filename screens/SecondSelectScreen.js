import React from 'react';

import SecondSelectButton from '../components/SecondSelectScreen/SecondSelectButton';

import {StyleSheet, Text, View, FlatList} from 'react-native';

import {useGlobalContext} from '../context';

const SecondSelectScreen = props => {
  const {secondLoading, secondCategories} = useGlobalContext();

  const firstCategory = props.route.params.categoryName;
  const firstCategory_id = props.route.params.categoryId;

  const categoryContainer = [{category: '전체', emoji: '🅰️'}];
  secondCategories.forEach(item => {
    if (item.firstCategoryId[0] === firstCategory_id) {
      categoryContainer.push({category: item.title, emoji: item.emoji});
    }
  });

  const renderSecondSelect = data => {
    return (
      <SecondSelectButton
        category={data.item.category}
        emoji={data.item.emoji}
        onSecondSelect={() => {
          props.navigation.navigate({
            name: 'CategoryScreen',
            params: {
              firstCategory: firstCategory,
              selectedCategory: data.item.category,
              mainDataSet: props.route.params.mainDataSet,
              categoryName: props.route.params.categoryName,
            },
          });
        }}
      />
    );
  };

  if (secondLoading) {
    return <Text>로딩중입니다</Text>;
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={categoryContainer}
        keyExtractor={(item, index) => item.emoji}
        renderItem={renderSecondSelect}
        numColumns={2}
      />
    </View>
  );
};

export default SecondSelectScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
