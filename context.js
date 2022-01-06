/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import Airtable from 'airtable';
import {REACT_APP_AIRTABLE_API_KEY} from '@env';

const storeBase = new Airtable({apiKey: REACT_APP_AIRTABLE_API_KEY}).base(
  'app0tAUATUh8jBxX4',
);

const Context = React.createContext();

const StoreProvider = ({children}) => {
  const [categoryLoading, setCategoryLoading] = useState(true);
  const [secondLoading, setSecondLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(true);
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const [cafesLoading, setCafesLoading] = useState(true);
  const [promoLoading, setPromoLoading] = useState(true);
  const [adsLoading, setAdsLoading] = useState(true);

  const [othersLoading, setOthersLoading] = useState(true);
  const [spotsLoading, setSpotsLoading] = useState(true);
  const [spotCategoryLoading, setSpotCategoryLoading] = useState(true);

  const [restaurants, setRestaurants] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [menu, setMenu] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [ads, setAds] = useState([]);
  const [spots, setSpots] = useState([]);
  const [others, setOthers] = useState([]);

  const [firstCategories, setFirstCategories] = useState([]);
  const [secondCategories, setSecondCategories] = useState([]);
  const [locationCategories, setlocationCategories] = useState([]);
  const [spotCategories, setSpotCategories] = useState([]);

  const spotCategory = [];

  const firstCategory = [];
  const secondCategory = [];
  const locationCategory = [];
  const restaurant = [];
  const cafe = [];
  const menuItem = [];
  const promotion = [];
  const ad = [];
  const spot = [];
  const other = [];

  useEffect(() => {
    // 맛집 불러오기
    storeBase('stores')
      .select({
        view: 'restaurants',
        pageSize: 100,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            restaurant.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setRestaurants(restaurant);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setRestaurantLoading(false);
          }
        },
      );
    // 카페 불러오기
    storeBase('stores')
      .select({
        view: 'cafes',
        pageSize: 100,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            cafe.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setCafes(cafe);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setCafesLoading(false);
          }
        },
      );
    // 세컨드카테고리 데이터 불러오기
    storeBase('secondCategoryData')
      .select({
        view: 'data',
        pageSize: 50,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            secondCategory.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          setSecondCategories(secondCategory);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setSecondLoading(false);
          }
        },
      );
    storeBase('firstCategoryData')
      .select({
        view: 'Grid view',
        pageSize: 100,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            firstCategory.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setFirstCategories(firstCategory);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setCategoryLoading(false);
          }
        },
      );
    storeBase('locationCategoryData')
      .select({
        view: 'data',
        pageSize: 20,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            locationCategory.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          setlocationCategories(locationCategory);
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setLocationLoading(false);
          }
        },
      );
    storeBase('menu')
      .select({
        view: 'Grid view',
        pageSize: 100,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            menuItem.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setMenu(menuItem);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setMenuLoading(false);
          }
        },
      );
    storeBase('promotions')
      .select({
        view: 'online',
        pageSize: 10,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            promotion.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setPromotions(promotion);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setPromoLoading(false);
          }
        },
      );
    storeBase('ads')
      .select({
        view: 'data',
        pageSize: 10,
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            ad.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setAds(ad);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setAdsLoading(false);
          }
        },
      );

    // 기타 카테고리 업체들 불러오기
    storeBase('stores')
      .select({
        view: 'others',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            other.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setOthers(other);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setOthersLoading(false);
          }
        },
      );

    // 기타 카테고리 업체들 불러오기
    storeBase('spots')
      .select({
        view: 'data',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            spot.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setSpots(spot);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setSpotsLoading(false);
          }
        },
      );

    // 기타 카테고리 업체들 불러오기
    storeBase('spotsCategory')
      .select({
        view: 'data',
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function (record) {
            spotCategory.push({
              id: record.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
          setSpotCategories(spotCategory);
        },
        function done(err) {
          if (err) {
            console.error(err);
          } else {
            setSpotCategoryLoading(false);
          }
        },
      );
  }, []);

  return (
    <Context.Provider
      value={{
        categoryLoading,
        secondLoading,
        firstCategories,
        secondCategories,
        locationCategories,
        restaurantLoading,
        menuLoading,
        menu,
        restaurants,
        cafes,
        promotions,
        promoLoading,
        ads,
        adsLoading,
        spotsLoading,
        spots,
        othersLoading,
        others,
        spotCategories,
        spotCategoryLoading,
      }}>
      {children}
    </Context.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(Context);
};

export {Context, StoreProvider};
