import React from 'react';
import {StyleSheet, View, Dimensions, ScrollView, Image} from 'react-native';

const DetailsCuration = props => {
  const storeData = props.route.params.storeData;
  const deviceWidth = Dimensions.get('window').width;
  const curationWidth = storeData.curation[0].width;
  const curationHeight = storeData.curation[0].height;
  const theScale = curationWidth / deviceWidth;
  const scaledHeight = curationHeight / theScale;

  return (
    <ScrollView style={styles.detailsCuration} bounces={false}>
      <View style={styles.curationContainer}>
        <Image
          source={{uri: storeData.curation[0].url}}
          style={{
            width: Dimensions.get('window').width,
            height: scaledHeight,
          }}
          resizeMode="cover"
        />
      </View>
    </ScrollView>
  );
};

export default DetailsCuration;

const styles = StyleSheet.create({
  detailsCurationWrapper: {flex: 1, width: '100%', paddingHorizontal: 10},
  detailsCurationHeader: {
    fontFamily: 'SD-B',
    fontSize: 22,
    marginVertical: 7,
    letterSpacing: -1,
  },
  curationContainer: {
    width: '100%',
  },
});
