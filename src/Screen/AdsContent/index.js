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
import { isEmptyValue, isValidMobileNo } from '../../Utils/ValidationUtils';
import { Endpoints, NetworkManager } from '../../API';

const AdsContent = ({ route, navigation }) => {
  console.log("props ", route.params);
  const { session, setSession } = useSession();

  const [prevData, setPrevData] = useState('');
  const [isNextEnable, setIsNextEnable] = useState(false);
  const [mobile, setMobile] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [adsTitle, setAdsTitle] = useState('');
  const [validTitle, setValidTitle] = useState(false);
  const [adsContent, setAdsContent] = useState('');
  const [validContent, setValidContent] = useState(false);

  const sessionData = session;

  useEffect(() => {
    // getRates();
    // sortDistrict();
    setPrevData(route.params);
  }, []);

  useEffect(() => {
    enableNext();
  }, [prevData, mobile, adsContent]);


  const enableNext = () => {
    let isEnabledNext =
      prevData
        && mobile
        && adsContent
        && adsTitle
        && validMobile
        && validContent
        && validTitle
        ? true
        : false;

    setIsNextEnable(isEnabledNext);
  }

  const saveNpreview = () => {
    let adsData = prevData;
    adsData.mobile = mobile;
    adsData.adsTitle = adsTitle;
    adsData.adsContent = adsContent;

    sessionData.completeAdsData = adsData;
    setSession({ ...session, sessionData });
    console.log("completeAdsData ", sessionData.completeAdsData);
  }

  const saveApiCall = () => {
    let region = sessionData?.completeAdsData?.isCheckedState
      ? sessionData?.completeAdsData?.stateName
      : sessionData?.completeAdsData?.isCheckedDist
        ? sessionData?.completeAdsData?.district
        : sessionData?.completeAdsData?.isCheckedTah
          ? sessionData?.completeAdsData?.tahasil
          : sessionData?.completeAdsData?.isCheckedCity
            ? sessionData?.completeAdsData?.city
            : null;

    let params = {
      "category": sessionData?.completeAdsData?.typeOfAds,
      "title": sessionData?.completeAdsData?.adsTitle,
      "desc": sessionData?.completeAdsData?.adsContent,
      "address": sessionData?.completeAdsData?.city,
      "contactNo": sessionData?.completeAdsData?.mobile,
      "region": [region],
      "duration": sessionData?.completeAdsData?.periodOfAds,
      "amount": sessionData?.completeAdsData?.totalAmount
    };
    let header = {};
    console.log("params ", params);

    NetworkManager.IDFCNetworkPost(
      Endpoints.publishAds,
      params,
      header,
      (response) => {
        console.log("publishAds response ", response);
        if (!isEmptyValue(response?.userId)) {
          Alert.alert(StringsOfLang.DASHBOARD.ADS_SUCCESS_TITLE,
            StringsOfLang.DASHBOARD.ADS_SUCCESS_MESSAGE, [
            // {
            //   text: StringsOfLang.COMMON.CANCEL,
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: async () => {
                navigation.navigate(NavigationUrl.dashboardId);
              }
            },
          ]);
        } else {
          Alert.alert(StringsOfLang.DASHBOARD.ADS_ERROR_TITLE,
            StringsOfLang.DASHBOARD.ADS_ERROR_MESSAGE, [
            // {
            //   text: StringsOfLang.COMMON.CANCEL,
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
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
        // {
        //   text: StringsOfLang.COMMON.CANCEL,
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        {
          text: StringsOfLang.COMMON.OKAY,
          onPress: () => console.log('Okay Pressed')
        },
      ]);
    });
  }

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
          <Text style={styles.headerText}>{StringsOfLang.DASHBOARD.ADS_CONTENT}</Text>
        </View>

        {/* <View style={styles.imageCircle}>
          <TouchableOpacity
            style={isNextEnable
              ? styles.nextButtonActive
              : styles.nextButtonInActive
            }
            disabled={!isNextEnable}
          // onPress={onClickBackIcon}
          >
            <Text style={styles.loginNext}>{StringsOfLang.DASHBOARD.NEXT}</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <ScrollView style={styles.loginForm}>

        <Text style={styles.loginFormTitle}>{StringsOfLang.DASHBOARD.MOBILE_OF_ADS}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !mobile ? Colors.colorGray
            : validMobile
              ? Colors.colorPrimary
              : Colors.colorRed
        }]}>
          <TextInput
            value={mobile}
            onChangeText={text => {
              if (isValidMobileNo(text)) {
                setValidMobile(true);
              } else {
                setValidMobile(false);
              }
              setMobile(text)
            }}
            style={{ flex: 9, paddingLeft: 6 }}
            placeholder={StringsOfLang.DASHBOARD.MOBILE_OF_ADS}
            keyboardType='phone-pad'
          // returnKeyType={"next"}
          />
        </View>

        <Text style={styles.loginFormTitle}>{StringsOfLang.DASHBOARD.TITLE_OF_ADS}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !adsTitle ? Colors.colorGray
            : validTitle
              ? Colors.colorPrimary
              : Colors.colorRed
        }]}>
          <TextInput
            value={adsTitle}
            onChangeText={text => {
              if (text.length < 30) {
                setValidTitle(true);
              } else {
                setValidTitle(false);
              }
              setAdsTitle(text)
            }}
            style={{ flex: 9, paddingLeft: 6 }}
            placeholder={StringsOfLang.DASHBOARD.TITLE_OF_ADS}
          />
        </View>

        <Text style={styles.loginFormTitle}>{StringsOfLang.DASHBOARD.CONTENT_OF_ADS}</Text>
        <View style={[styles.loginInputMultiContainer, {
          borderColor: !adsContent ? Colors.colorGray
            : validContent
              ? Colors.colorPrimary
              : Colors.colorRed
        }]}>
          <TextInput
            value={adsContent}
            onChangeText={text => {
              if (text.length < 300) {
                setValidContent(true);
              } else {
                setValidContent(false);
              }
              setAdsContent(text)
            }}
            multiline={true}
            style={{ flex: 9, paddingLeft: 6, textAlignVertical: "top", }}
            placeholder={StringsOfLang.DASHBOARD.CONTENT_OF_ADS}
          />
        </View>


        <TouchableOpacity
          onPress={() => saveNpreview()}
          style={[styles.loginSignInButton, {
            backgroundColor: !isNextEnable
              ? Colors.colorGray
              : Colors.colorPrimary
          }]}
          disabled={!isNextEnable}
        >
          <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.DASHBOARD.SAVE_PREVIEW}</Text>
        </TouchableOpacity>


        {sessionData.completeAdsData &&
          <>
            <View style={styles.grayBox}>
              <View style={styles.textBoxContainer}>
                <View style={styles.totalContainer}>
                  <Text style={styles.titleText}>{sessionData.completeAdsData?.adsTitle}</Text>
                </View>
                <View style={styles.underline}></View>

                <View style={styles.priceBoxContainer}>
                  <Text
                    style={styles.contentText}
                    adjustsFontSizeToFit={true}
                    numberOfLines={10}>{sessionData.completeAdsData?.adsContent}</Text>
                </View>

                <TouchableOpacity style={styles.totalContainer}>
                  <Text style={styles.mobileText}><Ionicons name="call-sharp" size={RFValue(16)} color={Colors.colorPrimary} /> {sessionData.completeAdsData?.mobile}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => saveApiCall()}
              style={[styles.loginSignInButton, {
                backgroundColor: !isNextEnable
                  ? Colors.colorGray
                  : Colors.colorPrimary
              }]}
              disabled={!isNextEnable}
            >
              <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.DASHBOARD.NEXT}</Text>
            </TouchableOpacity>
          </>
        }

      </ScrollView>



      {/* <LoaderComponent
        isVisible={showLoader} //showLoader
        heading={StringsOfLanguages.LOADER.DASH_HEADING}
        subHeading={StringsOfLanguages.LOADER.DASH_SUBHEADING}
      /> */}
    </View>
  );



};

export default AdsContent;

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
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 32,
    backgroundColor: Colors.colorWhite,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
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
    color: Colors.colorPrimary,
  },
  titleText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.colorPrimary,
  },
  contentText: {
    fontSize: RFValue(16),
    textAlign: 'left',
    color: Colors.colorPrimary,
    marginTop: 2
  },
  mobileText: {
    fontSize: RFValue(16),
    color: Colors.colorPrimary,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: RFValue(6)
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
    flex: 7.5,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    color: Colors.colorWhite,
    marginHorizontal: 8,
  },
  loginNext: {
    fontSize: RFValue(11),
    fontWeight: "bold",
    color: Colors.colorPrimary,
  },
  loginFormTitle: {
    fontSize: RFValue(11),
    fontWeight: "bold",
    color: Colors.colorPrimary,
    marginTop: RFValue(8),
    marginLeft: 8,
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
  loginInputMultiContainer: {
    flexDirection: 'row',
    margin: 8,
    borderColor: Colors.colorGray,
    borderWidth: 0.6,
    padding: 8,
    borderRadius: 8,
    height: 180,
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
  },
  textBoxContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  priceBoxContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 4
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 4
  },
  underline: {
      height: 0.9,
      backgroundColor: Colors.colorPrimary,
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
