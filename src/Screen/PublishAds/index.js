import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import useSession from '../../App/useSession';
// import LoaderComponent from '../../Components/LoaderComponent';
import NavigationUrl from '../../Utils/NavigationUrl';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { StringsOfLang } from '../../Localization';
import { Colors } from '../../Utils';
import { DistrictTahasilList, RatesOfAds, TypesOfAds } from '../../Utils/Constants';
import CustomDropDown from '../../Components/CustomDropDown';
import { Endpoints, NetworkManager } from '../../API';
import { isEmptyValue } from '../../Utils/ValidationUtils';

const PublishAds = props => {
  const navigation = useNavigation();
  const { session, setSession } = useSession();

  const [typeOfAds, setTypeOfAds] = useState('');
  const [stateName, setStateName] = useState("Maharashtra");
  const [isCheckedState, setIsCheckedState] = useState(true);
  const [district, setDistrict] = useState('');
  const [isCheckedDist, setIsCheckedDist] = useState(true);
  const [tahasil, setTahasil] = useState('');
  const [isCheckedTah, setIsCheckedTah] = useState(true);
  const [city, setCity] = useState('');
  const [isCheckedCity, setIsCheckedCity] = useState(true);
  const [periodOfAds, setPeriodOfAds] = useState('');
  const [isNextEnable, setIsNextEnable] = useState(false);

  const sessionData = session;

  useEffect(() => {
    getRates();
    getDistrict();
  }, []);

  const getDistrict = () => {
    let header = {};

    NetworkManager.IDFCNetworkGet(
      Endpoints.getDistricts,
      header,
      (response) => {
        console.log("getDistricts response ", response);
        if (!isEmptyValue(response)) {
          let res = response?.data;
          let arr = [];
          res.forEach((ele) => {
            let obj = {
              label: ele,
              value: ele,
              key: ele
            };
            arr.push(obj);
          })
          sessionData.distictsList = arr;
          setSession({ ...session, sessionData });
        } else {
          Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
            StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: () => console.log('Okay Pressed')
            },
          ]);
        }
      }
    ).catch((e) => {
      console.log("e ", e);
      Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
        StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
        {
          text: StringsOfLang.COMMON.OKAY,
          onPress: () => console.log('Okay Pressed')
        },
      ]);
    });
  }

  const getTahasil = (value) => {
    let header = {};

    NetworkManager.IDFCNetworkGet(
      Endpoints.getTahasil + value,
      header,
      (response) => {
        // console.log("getDistricts response ", response);
        if (!isEmptyValue(response?.data)) {
          let res = response?.data;
          let arr = [];
          res.forEach((ele) => {
            let obj = {
              label: ele,
              value: ele
            };
            arr.push(obj);
          })
          sessionData.tahasilList = arr;
          setSession({ ...session, sessionData });
        } else {
          Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
            StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: () => console.log('Okay Pressed')
            },
          ]);
        }
      }
    ).catch((e) => {
      console.log("e ", e);
      Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
        StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
        {
          text: StringsOfLang.COMMON.OKAY,
          onPress: () => console.log('Okay Pressed')
        },
      ]);
    });
  }

  const getVillages = (value) => {
    let header = {};

    NetworkManager.IDFCNetworkGet(
      Endpoints.getVillages + district + "&subDistrict=" + value,
      header,
      (response) => {
        // console.log("getDistricts response ", response);
        if (!isEmptyValue(response?.data)) {
          let res = response?.data;
          let arr = [];
          res.forEach((ele) => {
            let obj = {
              label: ele,
              value: ele
            };
            arr.push(obj);
          })
          sessionData.villagesList = arr;
          setSession({ ...session, sessionData });
        } else {
          Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
            StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: () => console.log('Okay Pressed')
            },
          ]);
        }
      }
    ).catch((e) => {
      console.log("e ", e);
      Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
        StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
        {
          text: StringsOfLang.COMMON.OKAY,
          onPress: () => console.log('Okay Pressed')
        },
      ]);
    });
  }

  useEffect(() => {
    calculationLogic();
  }, [isCheckedState, isCheckedDist, isCheckedTah, isCheckedCity]);


  const getRates = () => {
    sessionData.rates = RatesOfAds;
    setSession({ ...session, sessionData });
    RatesOfAds?.ratePerDays.forEach((ele, ind) => {
      ele.label = (ele.days).toString();
      ele.value = (ele.days).toString();
      ele.key = ind;
    })
    sessionData.ratePerDayList = RatesOfAds.ratePerDays;
    sessionData.rates = RatesOfAds;
    sessionData.rates.totalAmount = Number(
      sessionData.rates.state + sessionData.rates.district + sessionData.rates.tahasil + sessionData.rates.city
    );
    setSession({ ...session, sessionData });
  }

  const sortDistrict = () => {
    setDistrict(sessionData.distictsList[0].label);
    DistrictTahasilList.forEach((ele, ind) => {
      ele.label = ele.name;
      ele.value = ele.name;
      ele.key = ind;
    })
    sessionData.distictsList = DistrictTahasilList;
    setSession({ ...session, sessionData });
  }

  const sortTahasilList = (index) => {
    let tahasilArr = session.distictsList[index - 1].tahasil;
    let finalArr = [];
    tahasilArr.forEach((ele) => {
      let obj = { label: ele, value: ele }
      finalArr.push(obj)
    })
    sessionData.tahasilList = finalArr;
    setSession({ ...session, sessionData });
  }

  const calculateTotal = (value, index) => {
    sessionData.rates.city = sessionData?.rates?.ratePerDays[index - 1]?.amount;
    calculationLogic();
    setSession({ ...session, sessionData });
  }

  const calculationLogic = () => {
    let xyz = isCheckedState
      ? Number(
        sessionData.rates.state + sessionData.rates.district + sessionData.rates.tahasil + sessionData.rates.city
      )
      : isCheckedDist
        ? Number(
          sessionData.rates.district + sessionData.rates.tahasil + sessionData.rates.city
        )
        : isCheckedTah
          ? Number(
            sessionData.rates.tahasil + sessionData.rates.city
          )
          : Number(
            sessionData.rates.city
          );
    sessionData.rates.totalAmount = xyz;
    setSession({ ...session, sessionData });
  }

  useEffect(() => {
    enableNext();
  }, [typeOfAds, stateName, district, tahasil, city, periodOfAds]);

  const enableNext = () => {
    let isEnabledNext =
      sessionData.userId
        && typeOfAds
        && stateName
        && district
        && tahasil
        && city
        && periodOfAds
        ? true
        : false;

    setIsNextEnable(isEnabledNext);
  }

  const onNextPress = () => {
    navigation.navigate(NavigationUrl.adsContentId, {
      userId: sessionData.userId,
      typeOfAds: typeOfAds,
      stateName: stateName,
      isCheckedState: isCheckedState,
      district: district,
      isCheckedDist: isCheckedDist,
      tahasil: tahasil,
      isCheckedTah: isCheckedTah,
      city: city,
      isCheckedCity: isCheckedCity,
      periodOfAds: periodOfAds,
      totalAmount: sessionData?.rates?.totalAmount
    })
  }


  console.log("publish userId ", sessionData.userId);
  return (
    <View style={styles.container}>

      <View style={styles.loginHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={RFValue(20)} color={Colors.colorWhite} />
        </TouchableOpacity>
        <View style={styles.emptyHeader}>
          <Text style={styles.headerText}>{StringsOfLang.DASHBOARD.PUBLISH_ADS}</Text>
        </View>

      </View>

      <ScrollView
        style={styles.loginForm}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.USER_ID}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: Colors.colorPrimary
        }]}>
          <TextInput
            value={sessionData.userId}
            editable={false}
            style={{ flex: 9, paddingLeft: 6, color: Colors.colorBlack }}
          />
        </View>

        <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.TYPE_OF_ADS}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !typeOfAds ? Colors.colorGray
            : Colors.colorPrimary
        }]}>
          <CustomDropDown
            key={typeOfAds}
            items={TypesOfAds}
            value={typeOfAds}
            onValueChange={(value, index) => {
              setTypeOfAds(value);
            }}
            placeholder={StringsOfLang.DASHBOARD.TYPE_OF_ADS}
          />
        </View>

        {/* State */}
        <View style={styles.headerBoxContainer}>
          <View style={styles.tickBoxText}>
            <TouchableOpacity
              onPress={() => {
                if (isCheckedState) {
                  setIsCheckedState(false);
                } else {
                  setIsCheckedState(true);
                  setIsCheckedDist(true);
                  setIsCheckedTah(true);
                  setIsCheckedCity(true);
                }
              }}
            >
              {isCheckedState ?
                <AntDesign name={'checksquare'} size={20} color={Colors.colorPrimary} /> :
                <Feather name={'square'} size={20} color={Colors.colorGray} />
              }

            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.STATE}</Text>
          </View>
        </View>

        <View style={styles.textBoxContainer}>
          <View style={[styles.loginInputContainerDivided, {
            borderColor: Colors.colorPrimary
          }]}>
            <TextInput
              editable={false}
              value={stateName}
              style={{ flex: 9, paddingLeft: 6, color: Colors.colorBlack }}
              placeholder={StringsOfLang.DASHBOARD.STATE}
            />
          </View>
          <View style={styles.priceBoxContainer}>
            <Text style={styles.priceText}>Rs.{sessionData?.rates?.state}</Text>
          </View>
        </View>

        {/* District */}
        <View style={styles.headerBoxContainer}>
          <View style={styles.tickBoxText}>
            <TouchableOpacity
              onPress={() => {
                if (isCheckedDist) {
                  setIsCheckedDist(false);
                  setIsCheckedState(false);
                } else {
                  setIsCheckedDist(true);
                  setIsCheckedTah(true);
                  setIsCheckedCity(true);
                }
              }}
            >
              {isCheckedDist ?
                <AntDesign name={'checksquare'} size={20} color={Colors.colorPrimary} /> :
                <Feather name={'square'} size={20} color={Colors.colorGray} />
              }

            </TouchableOpacity>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.DISTRICT}</Text>
          </View>

        </View>
        <View style={styles.textBoxContainer}>
          <View style={[styles.loginInputContainerDivided, {
            borderColor: !district ? Colors.colorGray
              : Colors.colorPrimary
          }]}>
            <CustomDropDown
              key={district}
              items={sessionData.distictsList}
              value={district}
              onValueChange={(value, index) => {
                setDistrict(value);
                if (value) {
                  getTahasil(value);
                }
              }}
              placeholder={StringsOfLang.DASHBOARD.DISTRICT}
            />
          </View>
          <View style={styles.priceBoxContainer}>
            <Text style={styles.priceText}>Rs.{sessionData?.rates?.district}</Text>
          </View>
        </View>

        {/* Tahasil */}
        {district &&
          <>
            <View style={styles.headerBoxContainer}>
              <View style={styles.tickBoxText}>
                <TouchableOpacity
                  onPress={() => {
                    if (isCheckedTah) {
                      setIsCheckedTah(false);
                      setIsCheckedDist(false);
                      setIsCheckedState(false);
                    } else {
                      setIsCheckedTah(true);
                      setIsCheckedCity(true);
                    }
                  }}
                >
                  {isCheckedTah ?
                    <AntDesign name={'checksquare'} size={20} color={Colors.colorPrimary} /> :
                    <Feather name={'square'} size={20} color={Colors.colorGray} />
                  }

                </TouchableOpacity>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.TAHASIL}</Text>
              </View>

            </View>

            <View style={styles.textBoxContainer}>
              <View style={[styles.loginInputContainerDivided, {
                borderColor: !tahasil ? Colors.colorGray
                  : Colors.colorPrimary
              }]}>
                <CustomDropDown
                  key={tahasil}
                  items={sessionData.tahasilList}
                  value={tahasil}
                  onValueChange={(value, index) => {
                    setTahasil(value);
                    if (value) {
                      getVillages(value);
                    }
                  }}
                  placeholder={StringsOfLang.DASHBOARD.TAHASIL}
                />
              </View>
              <View style={styles.priceBoxContainer}>
                <Text style={styles.priceText}>Rs.{sessionData?.rates?.tahasil}</Text>
              </View>
            </View>
          </>
        }

        {/* City */}
        {tahasil &&
          <>
            <View style={styles.headerBoxContainer}>
              <View style={styles.tickBoxText}>
                <TouchableOpacity
                  onPress={() => {
                    if (isCheckedCity) {
                      setIsCheckedCity(true);
                      setIsCheckedTah(false);
                      setIsCheckedDist(false);
                      setIsCheckedState(false);
                    } else {
                      setIsCheckedCity(true);
                    }
                  }}
                >
                  {isCheckedCity ?
                    <AntDesign name={'checksquare'} size={20} color={Colors.colorPrimary} /> :
                    <Feather name={'square'} size={20} color={Colors.colorGray} />
                  }

                </TouchableOpacity>
              </View>
              <View style={styles.headerTextContainer}>
                <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.CITY}</Text>
              </View>

            </View>

            <View style={styles.textBoxContainer}>
              <View style={[styles.loginInputContainerDivided, {
                borderColor: !city ? Colors.colorGray
                  : Colors.colorPrimary
              }]}>
                <CustomDropDown
                  key={city}
                  items={sessionData.villagesList}
                  value={city}
                  onValueChange={(value, index) => {
                    setCity(value);
                  }}
                  placeholder={StringsOfLang.DASHBOARD.CITY}
                />
              </View>
              <View style={styles.priceBoxContainer}>
                <Text style={styles.priceText}>Rs.{sessionData?.rates?.city}</Text>
              </View>
            </View>
          </>
        }

        {/* period */}
        {city &&
          <>
            <Text style={styles.loginFormHeader}>{StringsOfLang.DASHBOARD.PERIOD}</Text>
            <View style={[styles.loginInputContainer, {
              borderColor: !typeOfAds ? Colors.colorGray
                : Colors.colorPrimary
            }]}>
              <CustomDropDown
                key={periodOfAds}
                items={sessionData.ratePerDayList}
                value={periodOfAds}
                onValueChange={(value, index) => {
                  setPeriodOfAds(value);
                  calculateTotal(value, index);
                }}
                placeholder={StringsOfLang.DASHBOARD.PERIOD}
              />
            </View>
          </>
        }

        <View style={styles.grayBox}>
          <View style={styles.textBoxContainer}>
            <View style={styles.totalContainer}>
              <Text style={styles.boxText3}>{StringsOfLang.DASHBOARD.TOTAL}</Text>
            </View>

            <View style={styles.priceBoxContainer}>
              <Text style={styles.boxText3}>Rs.{sessionData?.rates?.totalAmount}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.loginSignInButton, {
            backgroundColor: !isNextEnable
              ? Colors.colorGray
              : Colors.colorPrimary
          }]}
          disabled={!isNextEnable}
          onPress={() => onNextPress()}
        >
          <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.DASHBOARD.NEXT}</Text>
        </TouchableOpacity>

      </ScrollView>



      {/* <LoaderComponent
        isVisible={showLoader} //showLoader
        heading={StringsOfLanguages.LOADER.DASH_HEADING}
        subHeading={StringsOfLanguages.LOADER.DASH_SUBHEADING}
      /> */}
    </View>
  );



};

export default PublishAds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBackground,
  },
  loginForm: {
    padding: 12,
    height: "120%"
  },
  grayBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 32,
    backgroundColor: Colors.colorWhite,
    // shadowColor: Colors.colorPrimary,
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    // shadowRadius: 5,
    // elevation: 12,
  },
  boxText1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.colorBlack,
  },
  boxText2: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.colorPrimary,
  },
  userIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Colors.colorLightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxText3: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: Colors.colorSecondary,
  },
  touchView: {
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginVertical: 16
  },
  boxText4: {
    color: Colors.colorBlack,
    fontSize: 16,
  },
  starStyle: {
    width: 60,
    height: 12,
  },
  sliderBoxView: {
    width: 250,
    height: 100,
    borderRadius: 8,
    margin: 8,
    alignSelf: 'flex-start'
  },
  offersText: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.colorWhite,
    marginTop: 20,
    marginLeft: 16
  },
  favBrandBoxView: {
    width: 180,
    height: 200,
    borderRadius: 8,
    margin: 8,
    marginHorizontal: 8,
    alignSelf: 'flex-start',
    borderColor: Colors.colorBorder,
    borderWidth: 0.8,
  },
  favBrandImg: {
    width: "100%",
    height: 120,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignSelf: 'flex-start',
    borderColor: Colors.colorBorder,
    borderWidth: 0.8,
  },
  brandText: {
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.colorBlack,
    marginTop: 10,
    marginHorizontal: 10,
  },
  logoIcon: {
    width: 50,
    height: 50,
    resizeMode: "center",
  },
  opttext: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  cateView: {
    flex: 0.25,
    padding: 8,
    margin: 4,
    // height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCircle: {
    flex: 1.5,
  },
  nextButtonActive: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(32),
    width: RFValue(56),
    borderRadius: RFValue(8),
    backgroundColor: Colors.colorWhite,
    shadowColor: Colors.colorAccent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 12,
  },
  nextButtonInActive: {
    justifyContent: 'center',
    alignItems: 'center',
    height: RFValue(32),
    width: RFValue(56),
    borderRadius: RFValue(8),
    backgroundColor: Colors.colorGray,
    shadowColor: Colors.colorAccent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 12,
  },
  userImage: {
    height: 50,
    width: 50,
  },
  imageIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 49.4,
    width: 49.4,
    borderColor: Colors.colorBorder,
    borderRadius: 8,
    borderWidth: 0.6
  },
  locationIcon: {
    height: RFValue(40),
    width: RFValue(40),
  },
  locationIconText: {
    flex: 7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.colorBlack,
  },
  addressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.colorGray,
  },
  homepageImage: {
    width: '100%',
    height: 200,
  },
  schemesImage: {
    width: '100%',
    height: 160,
  },
  groupBuyBoxView: {
    width: 380,
    // height: 250,
    borderRadius: 8,
    margin: 8,
    marginHorizontal: 8,
    alignSelf: 'flex-start',
    borderColor: Colors.colorBorder,
    borderWidth: 0.8,
  },
  groupBuyImg: {
    width: 379,
    height: 150,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    alignSelf: 'flex-start',
    borderColor: Colors.colorBorder,
    borderWidth: 0.8,
  },
  groupBuyText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.colorBlack,
    marginTop: 10,
    marginHorizontal: 10,
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: Colors.colorPrimary
  },
  backButton: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  emptyHeader: {
    flex: 8.5,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: Colors.colorWhite,
    marginHorizontal: 8,
  },
  loginFormTitle: {
    fontSize: RFValue(11),
    fontWeight: "bold",
    color: Colors.colorPrimary,
  },
  loginFormHeader: {
    fontSize: RFValue(13),
    fontWeight: "500",
    color: Colors.colorPrimary,
    margin: 8,
  },
  loginInputContainer: {
    flexDirection: 'row',
    margin: 8,
    borderColor: Colors.colorGray,
    borderWidth: 0.6,
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.colorWhite
  },
  loginInputContainerDivided: {
    flex: 3,
    flexDirection: 'row',
    margin: 8,
    borderColor: Colors.colorGray,
    borderWidth: 0.6,
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.colorWhite
  },
  textBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  priceText: {
    textAlign: 'center',
    fontSize: RFValue(16),
    fontWeight: 'bold',
    color: Colors.colorPrimary,
  },

  headerBoxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tickBoxText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  totalContainer: {
    flex: 3,
    flexDirection: 'row',
    margin: 8,
    padding: 8,
    borderRadius: 8
  },
  loginSignInButton: {
    backgroundColor: Colors.colorPrimary,
    margin: 8,
    borderColor: Colors.colorGray,
    borderWidth: 0.6,
    padding: 16,
    borderRadius: 8,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
