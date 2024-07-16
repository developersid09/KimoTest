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
  TextInput,
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
import { isEmptyValue, validateUPI } from '../../Utils/ValidationUtils';
import { StringsOfLang } from '../../Localization';
import { logoutFunction } from '../../Utils/CommonFunction';

const Wallet = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();
  const [upiId, setUpiId] = useState("");
  const [validUpi, setValidUpi] = useState(false);
  const [amountToPay, setAmountToPay] = useState(0);
  const [validAmountToPay, setValidAmountToPay] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1040);

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


  const checkDisabled = () => {
    if (upiId && validUpi) {
      return false;
    } else {
      return true;
    }
  }


  const checkDisabledWithdraw = () => {
    if (amountToPay && validAmountToPay) {
      return false;
    } else {
      return true;
    }
  }

  console.log("userInfo ", prevSessData.userInfo);

  return (
    <View style={styles.container}>


      <View style={styles.loginHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={RFValue(20)} color={Colors.colorPrimary} />
        </TouchableOpacity>
        <View style={styles.emptyHeader}>
          <Text style={styles.headerText}>{StringsOfLang.DASHBOARD.MY_WALLET}</Text>
        </View>

      </View>

      <View style={styles.profileBox}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: RFValue(8),
          paddingBottom: RFValue(70)
        }}>

          <Text
            style={{
              color: Colors.colorBlack,
              fontSize: RFValue(12),
            }}>{StringsOfLang.DASHBOARD.HELLO}<Text
              style={{
                color: Colors.colorBlack,
                fontSize: RFValue(14),
                fontWeight: '400'
              }}> {prevSessData?.userInfo?.name}</Text></Text>

          <Text
            style={{
              color: Colors.colorBlack,
              fontSize: RFValue(14),
              fontWeight: 'bold',
              marginTop: 4
            }}>{StringsOfLang.DASHBOARD.WALLET_BALANCE} ₹ {walletBalance}</Text>



        </View>
      </View>

      <ScrollView
        style={styles.loginForm}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: RFValue(8)
        }}>


          <Text
            style={{
              color: Colors.colorBlack,
              fontSize: RFValue(16),
              fontWeight: 'bold',
              marginTop: RFValue(8)
            }}>{StringsOfLang.DASHBOARD.TO_SEND} </Text>


          {/* if upi id is not verified and saved */}
          <Text style={styles.loginFormTitle}>{StringsOfLang.DASHBOARD.ENTER_UPI}</Text>
          <View style={[styles.loginInputContainer, {
            borderBottomColor: !upiId ? Colors.colorGray
              : validUpi
                ? Colors.colorPrimary
                : Colors.colorRed
          }]}>
            <TextInput
              value={upiId}
              onChangeText={text => {
                if (validateUPI(text)) {
                  setValidUpi(true);
                } else {
                  setValidUpi(false);
                }
                setUpiId(text)
              }}
              style={{ flex: 9, paddingLeft: 6 }}
              placeholder={StringsOfLang.DASHBOARD.ENTER_UPI}
            />
          </View>


          <Text style={styles.upiTitle}>{`${StringsOfLang.DASHBOARD.REGISTERED_NAME}: ${upiId}`}</Text>

          <TouchableOpacity
            // onPress={() => signIn()}
            style={[styles.loginSignInButton, { backgroundColor: checkDisabled() ? Colors.colorGray : Colors.colorPrimary }]}
            disabled={checkDisabled()}
          >
            <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.DASHBOARD.VERIFY_UPI}</Text>
          </TouchableOpacity>

          {/*  */}



          {/* if upi id is verified and saved */}
          <Text style={styles.loginFormTitle}>{StringsOfLang.DASHBOARD.ENTER_AMOUNT}</Text>
          <View style={[styles.loginInputContainer, {
            borderColor: !amountToPay ? Colors.colorGray
              : validAmountToPay
                ? Colors.colorPrimary
                : Colors.colorRed
          }]}>
            <TextInput
              value={amountToPay}
              editable={walletBalance >= 100}
              onChangeText={text => {
                if (text && text <= walletBalance) {
                  setValidAmountToPay(true);
                } else {
                  setValidAmountToPay(false);
                }
                setAmountToPay(text)
              }}
              style={{ flex: 9, paddingLeft: 6 }}
              placeholder={StringsOfLang.DASHBOARD.ENTER_AMOUNT}
              keyboardType='numeric'
            // returnKeyType={"next"}
            />
          </View>

          <TouchableOpacity
            // onPress={() => signIn()}
            style={[styles.loginSignInButton, { backgroundColor: checkDisabledWithdraw() ? Colors.colorGray : Colors.colorPrimary }]}
            disabled={checkDisabledWithdraw()}
          >
            <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.DASHBOARD.WITHDRAW}</Text>
          </TouchableOpacity>
          {/*  */}



        </View>

      </ScrollView>



      {/* <LoaderComponent
        isVisible={showLoader} //showLoader
        heading={StringsOfLanguages.LOADER.DASH_HEADING}
        subHeading={StringsOfLanguages.LOADER.DASH_SUBHEADING}
      /> */}
    </View>
  );



};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhite
  },
  loginForm: {
    height: '84%',
    width: '100%',
    padding: 12,
    backgroundColor: Colors.colorWhite
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
  upiTitle: {
    fontSize: RFValue(12),
    color: Colors.colorBlack,
    marginTop: RFValue(12),
  },
  loginFormTitle: {
    fontSize: RFValue(12),
    fontWeight: "500",
    color: Colors.colorPrimary,
    marginTop: RFValue(24)
  },
  loginInputContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    borderBottomColor: Colors.colorGray,
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 8,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 1 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
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
  loginSignInButton: {
    padding: 16,
    width: '100%',
    backgroundColor: Colors.colorPrimary,
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 4,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  profileBox: {
    backgroundColor: Colors.colorBackground,
    borderBottomLeftRadius: RFValue(18),
    borderBottomRightRadius: RFValue(18),
    padding: 16,
    borderBottomColor: Colors.colorPrimary,
    borderBottomWidth: 2,
    shadowColor: Colors.colorBlack,
    shadowOffset: { width: 4, height: 8 },
    shadowOpacity: 8,
    shadowRadius: 6,
    elevation: 10,
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
