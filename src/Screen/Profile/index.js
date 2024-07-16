import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Alert,
  ToastAndroid,
} from 'react-native';
import { AsyncStorageUtil, Colors } from '../../Utils';

import useSession from '../../App/useSession';
// import LoaderComponent from '../../Components/LoaderComponent';
import NavigationUrl from '../../Utils/NavigationUrl';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { RFValue } from 'react-native-responsive-fontsize';
import { Endpoints, NetworkManager } from '../../API';
import { isEmptyValue } from '../../Utils/ValidationUtils';
import { StringsOfLang } from '../../Localization';
import { logoutFunction } from '../../Utils/CommonFunction';
import { CustomStatusBar } from '../../Components/CustomStatusBar';

const Profile = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();

  const prevSessData = session;

  useEffect(() => {
    isFocused && getUserInfo()
  }, [isFocused]);

  console.log("profile userStored ", prevSessData?.userInfo);

  const getUserInfo = async () => {
    let header = {};

    NetworkManager.IDFCNetworkGet(
      Endpoints.getUserInfo + prevSessData?.userInfo?.id,
      header,
      (response) => {
        console.log("getUserInfo response ", response);
        if (!isEmptyValue(response)) {
          prevSessData.userInfo = response;
          setSession({ ...session, prevSessData });
        } else {
          Alert.alert(StringsOfLang.LOGIN.REGI_ERROR_TITLE,
            StringsOfLang.LOGIN.REGI_ERROR_MESSAGE, [
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: () => console.log('Okay Pressed')
            },
          ]);
        }
      }
    ).catch((e) => {
      console.log("e ", e);
      Alert.alert(StringsOfLang.LOGIN.REGI_ERROR_TITLE,
        StringsOfLang.LOGIN.REGI_ERROR_MESSAGE, [
        {
          text: StringsOfLang.COMMON.OKAY,
          onPress: () => console.log('Okay Pressed')
        },
      ]);
    });
  }

  const onClickLogout = async () => {
    logoutFunction();
    setSession({ ...session, loginFlag: false, userId: "" });
    ToastAndroid.show("Logged out successfully... 😊", ToastAndroid.LONG);
    navigation.goBack();
  }

  console.log("prevSessData.userInfo ", prevSessData.userInfo);

  return (
    <View style={styles.container}>
      <CustomStatusBar />

      <View style={styles.loginHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={RFValue(20)} color={Colors.colorPrimary} />
        </TouchableOpacity>
        <View style={styles.emptyHeader}>
          <Text style={styles.headerText}>{StringsOfLang.DASHBOARD.MY_PROFILE}</Text>
        </View>

      </View>

      <View style={styles.profileBox}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={styles.imageCircle}>
            <Image
              style={styles.userImage}
              resizeMode={'center'}
              source={prevSessData?.userInfo?.profilePicture == null
                ? require('../../Assets/Images/user.png')
                : { uri: Endpoints.imageDomain + prevSessData?.userInfo?.profilePicture }}
            />
          </View>

          <Text
            style={{
              color: Colors.colorWhite,
              fontSize: RFValue(16),
            }}>{StringsOfLang.DASHBOARD.HELLO}<Text
              style={{
                color: Colors.colorWhite,
                fontSize: RFValue(16),
                fontWeight: 'bold'
              }}> {prevSessData?.userInfo?.name}</Text></Text>

          <Text
            style={{
              color: Colors.colorWhite,
              fontSize: RFValue(16),
              fontWeight: 'bold',
              marginTop: 4
            }}>{prevSessData?.userInfo?.mobileNo}</Text>

          <Text
            style={{
              color: Colors.colorWhite,
              fontSize: RFValue(14),
              fontWeight: '400',
              marginTop: 4
            }}>{prevSessData?.userInfo?.address}</Text>

        </View>
      </View>

      <ScrollView
        style={styles.loginForm}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        {prevSessData?.userInfo?.userType == "agent" &&
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <TouchableOpacity
              style={styles.grayBox}
              onPress={() => {
                navigation.navigate(NavigationUrl.walletId);
              }}>
              <Feather name="dollar-sign" size={RFValue(20)} color={Colors.colorPrimary} />
              <Text style={[styles.boxText1, { marginTop: 4 }]}>{StringsOfLang.DASHBOARD.MY_WALLET}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.grayBox}
              onPress={() => {
                navigation.navigate(NavigationUrl.myIDCardId);
              }}>
              <AntDesign name="idcard" size={RFValue(20)} color={Colors.colorPrimary} />
              <Text style={[styles.boxText1, { marginTop: 4 }]}>{StringsOfLang.DASHBOARD.MY_ID_CARD}</Text>
            </TouchableOpacity>
          </View>
        }

        <View style={styles.grayBox}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <View
                style={styles.userIcon}
              >
                <FontAwesome name={'user'} size={30} color={Colors.colorPrimary} />
              </View>
            </View>
            <View style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.boxText3}>{StringsOfLang.DASHBOARD.MY_ACCOUNT}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.touchView}
          // onPress={() => { navigation.navigate(NavigationUrl.editProfileId) }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.MY_REPORTS}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchView}
            onPress={() => {
              navigation.navigate(NavigationUrl.walletId);
            }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.MY_WALLET}</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.touchView}
            onPress={() => {
              navigation.navigate(NavigationUrl.myIDCardId);
            }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.MY_ID_CARD}</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.touchView}
            onPress={() => navigation.navigate(NavigationUrl.myAdsId)}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.MY_ADS}</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.grayBox}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <View
                style={styles.userIcon}
              >
                <AntDesign name={'infocirlce'} size={30} color={Colors.colorPrimary} />
              </View>
            </View>
            <View style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.boxText3}>{StringsOfLang.DASHBOARD.MY_OTHER}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.touchView}
          // onPress={() => { navigation.navigate(NavigationUrl.walletId) }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.TRAINING_VIDEOS}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touchView}
            onPress={() => { navigation.navigate(NavigationUrl.instructionsId) }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.INSTRUCTIONS}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touchView}
            onPress={() => {
              navigation.navigate(NavigationUrl.commonViewId, {
                screenName: StringsOfLang.DASHBOARD.GUIDANCE,
                data: StringsOfLang.DASHBOARD.GUIDANCEARR,
              })
            }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.GUIDANCE}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touchView}
          // onPress={() => { navigation.navigate(NavigationUrl.walletId) }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.NOTICE}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touchView}
            onPress={() => {
              navigation.navigate(NavigationUrl.commonViewId, {
                screenName: StringsOfLang.DASHBOARD['T&C'],
                data: StringsOfLang.DASHBOARD.TERMSCONDITIONSARR,
              })
            }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD['T&C']}</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touchView}
          // onPress={() => { navigation.navigate(NavigationUrl.walletId) }}
          >
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.PRIVACY_POLICY}</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity
          style={styles.grayBox}
          onPress={() => {
            onClickLogout();
          }}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <View style={styles.userIcon}>
                <AntDesign name="poweroff" size={30} color={Colors.colorOrange} />
              </View>
            </View>
            <View style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={[styles.boxText3, { color: Colors.colorOrange }]}>{StringsOfLang.LOGIN.LOGOUT_TEXT}</Text>
            </View>
          </View>
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

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBackground
  },
  loginForm: {
    height: '84%',
    width: '100%',
    padding: 12,
    backgroundColor: Colors.colorBackground
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    backgroundColor: Colors.colorWhite,
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.colorPrimary
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
    color: Colors.colorPrimary,
    marginHorizontal: 8,
  },
  profileBox: {
    backgroundColor: Colors.colorPrimary,
    borderRadius: 8,
    padding: 16,
    margin: 20
  },
  grayBox: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.colorWhite,
    borderColor: Colors.colorBorder,
    borderWidth: 1,
    borderRadius: 8,
    padding: 28,
    margin: 8
  },
  boxText1: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.colorBlack,
  },
  boxText2: {
    fontSize: RFValue(12),
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
    fontSize: 22,
    fontWeight: '500',
    color: Colors.colorBlack,
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(16)
  },
  userImage: {
    height: RFValue(80),
    width: RFValue(80),
    borderRadius: RFValue(40),
    borderWidth: 1,
    borderColor: Colors.colorGray,
    shadowColor: Colors.colorBlack,
    shadowOffset: { width: 1, height: 8 },
    backgroundColor: Colors.colorLightGray,
    shadowOpacity: 8,
    shadowRadius: 6,
    elevation: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
    // width: 50,
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
});
