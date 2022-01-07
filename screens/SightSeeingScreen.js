import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {useGlobalContext} from '../context';

import GridWrapper from '../components/CategoryScreen/GridWrapper';

const Tab = createMaterialTopTabNavigator();

export default function SightSeeingScreen(props) {
  const {spots} = useGlobalContext();

  // 1차 카테고리 값 불러오기
  const currentCategory = props.route.params.selectedCategory;
  // 선택된 2차 카테고리
  const moveToPage = currentCategory;

  // 받아온 카테고리의 데이터를 2차 카테고리 별로 정리
  const all = spots;

  const nature = spots.filter(
    item => item.category_id[0] === 'rec4pSpKltJMiJf23',
  );
  const camp = spots.filter(
    item => item.category_id[0] === 'recKL7FcDWDmliieg',
  );
  const experience = spots.filter(
    item => item.category_id[0] === 'rec9GPojUBythfxRh',
  );
  const market = spots.filter(
    item => item.category_id[0] === 'recdnxYPqEYgaW8jv',
  );
  const historic = spots.filter(
    item => item.category_id[0] === 'recF7bBOJaqipNdzP',
  );
  const festival = spots.filter(
    item => item.category_id[0] === 'recjn7jQCfTk5iWA7',
  );
  const museum = spots.filter(
    item => item.category_id[0] === 'reccriIzdsQp8mn2B',
  );
  const park = spots.filter(
    item => item.category_id[0] === 'recssKND5Z466hQ4D',
  );
  const famous = spots.filter(
    item => item.category_id[0] === 'recQhuGkFr035Sbwg',
  );
  const lesure = spots.filter(
    item => item.category_id[0] === 'recQMvvMoQp9gxkRE',
  );

  // 네비게이션 생성을 위한 function 정의
  function All() {
    return (
      <GridWrapper
        isSpot="true"
        data={all}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Nature() {
    return (
      <GridWrapper
        isSpot="true"
        data={nature}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Camp() {
    return (
      <GridWrapper
        isSpot="true"
        data={camp}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Experience() {
    return (
      <GridWrapper
        isSpot="true"
        data={experience}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Market() {
    return (
      <GridWrapper
        isSpot="true"
        data={market}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Historic() {
    return (
      <GridWrapper
        isSpot="true"
        data={historic}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Festival() {
    return (
      <GridWrapper
        isSpot="true"
        data={festival}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Museum() {
    return (
      <GridWrapper
        isSpot="true"
        data={museum}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Park() {
    return (
      <GridWrapper
        isSpot="true"
        data={park}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Famous() {
    return (
      <GridWrapper
        isSpot="true"
        data={famous}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }
  function Lesure() {
    return (
      <GridWrapper
        isSpot="true"
        data={lesure}
        navigation={props.navigation}
        route={props.route}
      />
    );
  }

  return (
    <Tab.Navigator
      initialRouteName={moveToPage}
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarIndicatorContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarStyle: {
          // justifyContent: 'space-between',
          height: 45,
        },
        tabBarItemStyle: {
          alignItems: 'center',
          width: 85,
          padding: 0,
          paddingTop: 10,
          margin: 0,
        },
        tabBarLabelStyle: {
          flex: 1,
          fontFamily: 'AppleSDGothicNeo-Regular',
          fontSize: 13,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: 'black',
          borderBottomWidth: 3,
          borderRadius: 20,
        },
      }}>
      <Tab.Screen name="전체" component={All} />
      <Tab.Screen name="자연" component={Nature} />
      <Tab.Screen name="캠핑장" component={Camp} />
      <Tab.Screen name="체험" component={Experience} />
      <Tab.Screen name="지역시장" component={Market} />
      <Tab.Screen name="역사적장소" component={Historic} />
      <Tab.Screen name="행사·축제" component={Festival} />
      <Tab.Screen name="박물관" component={Museum} />
      <Tab.Screen name="공원·둘레길" component={Park} />
      <Tab.Screen name="유명장소" component={Famous} />
      <Tab.Screen name="레져" component={Lesure} />
    </Tab.Navigator>
  );
}
