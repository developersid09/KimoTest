import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Alert, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { Colors, NavigationUrl } from '../../Utils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from "react-native-vector-icons/Ionicons";
import { isEmptyValue, isValidEmailId, isValidMobileNo } from '../../Utils/ValidationUtils';
import { StringsOfLang } from '../../Localization';
import CustomDropDown from '../../Components/CustomDropDown';
import useSession from '../../App/useSession';
import { CommonConstant, DistrictTahasilList } from '../../Utils/Constants';
import { Endpoints, NetworkManager } from '../../API';

const Signup = ({ navigation }) => {
  const { session, setSession } = useSession();

  const [fullName, setFullName] = useState('');
  const [validName, setValidName] = useState(false);
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [mobile, setMobile] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [address, setAddress] = useState('');
  const [validAddress, setValidAddress] = useState(false);
  const [password, setPassword] = useState('');
  const [validPass, setValidPass] = useState(false);
  const [district, setDistrict] = useState('');
  const [tahasil, setTahasil] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  const prevSession = session;
  const sessionData = prevSession;

  useEffect(() => {
    sortDistrict();
  }, []);

  const sortDistrict = () => {
    setDistrict(sessionData.distictsList[0].label);
    DistrictTahasilList.forEach((ele, ind) => {
      ele.label = ele.name;
      ele.value = ele.name;
      ele.key = ind;
    })
    sessionData.distictsList = DistrictTahasilList;
    setSession({ ...session, prevSession });
  }

  const sortTahasilList = (index) => {
    let tahasilArr = session.distictsList[index - 1].tahasil;
    let finalArr = [];
    tahasilArr.forEach((ele) => {
      let obj = { label: ele, value: ele }
      finalArr.push(obj)
    })
    sessionData.tahasilList = finalArr;
    setSession({ ...session, prevSession });
  }

  const signIn = () => {
    let params = {
      "email": email,
      "password": password,
      "name": fullName,
      "userType": "agent",
      "mobileNo": mobile,
      "address": address,
      "state": "Maharashtra",
      "district": district,
      "tahasil": tahasil
    };
    let header = {};

    NetworkManager.IDFCNetworkPost(
      Endpoints.signUpAgent,
      params,
      header,
      response => {
        console.log("signUpAgent response ", response);
        if (!isEmptyValue(response?.msg)) {
          Alert.alert(StringsOfLang.LOGIN.REGI_SUCCESS_TITLE,
            response?.msg, [
            // {
            //   text: StringsOfLang.COMMON.CANCEL,
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: () => navigation.goBack()
            },
          ]);
        } else {
          Alert.alert(StringsOfLang.LOGIN.REGI_ERROR_TITLE,
            StringsOfLang.LOGIN.REGI_ERROR_MESSAGE, [
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
      Alert.alert(StringsOfLang.LOGIN.REGI_ERROR_TITLE,
        StringsOfLang.LOGIN.REGI_ERROR_MESSAGE, [
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

  const checkDisabled = () => {
    if (validName && validEmail && validMobile && validAddress && district && tahasil && validPass && isChecked) {
      return false;
    } else {
      return true;
    }
  }

  const warning = (title, message) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: "Close",
          style: "cancel"
        }
      ],
      { cancelable: true }
    );
  }


  return (
    <ScrollView style={styles.login}>
      <View style={styles.loginHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={RFValue(20)} color={Colors.colorPrimary} />
        </TouchableOpacity>
        <View style={styles.emptyHeader}>
          <Text style={styles.headerText}>{StringsOfLang.LOGIN.AGENT_REGISTER}</Text>
        </View>
      </View>

      <View style={styles.loginForm}>
        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.NAME}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !fullName ? Colors.colorGray
            : validName
              ? Colors.colorPrimary
              : Colors.colorRed
        }]}>
          <TextInput
            value={fullName}
            onChangeText={text => {
              if (text.length > 2) {
                setValidName(true)
              } else {
                setValidName(false);
              }
              setFullName(text)
            }}
            style={{ flex: 9, paddingLeft: 6 }}
            placeholder={StringsOfLang.LOGIN.NAME}
          />
        </View>

        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.EMAIL}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !email ? Colors.colorGray
            : validEmail
              ? Colors.colorPrimary
              : Colors.colorRed
        }]}>
          <TextInput
            value={email}
            onChangeText={text => {
              if (isValidEmailId(text)) {
                setValidEmail(true);
              } else {
                setValidEmail(false);
              }
              setEmail(text)
            }}
            style={{ flex: 9, paddingLeft: 6 }}
            placeholder={StringsOfLang.LOGIN.EMAIL}
          />
        </View>

        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.MOBILE_NO_AGENT}</Text>
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
            placeholder={StringsOfLang.LOGIN.MOBILE_NO_AGENT}
            keyboardType='phone-pad'
          />
        </View>


        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.ADDRESS}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !address ? Colors.colorGray
            : validAddress
              ? Colors.colorPrimary
              : Colors.colorRed
        }]}>
          <TextInput
            value={address}
            onChangeText={text => {
              if (text.length > 10) {
                setValidAddress(true)
              } else {
                setValidAddress(false);
              }
              setAddress(text)
            }}
            style={{ flex: 9, paddingLeft: 6 }}
            placeholder={StringsOfLang.LOGIN.ADDRESS}
          />
        </View>

        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.STATE}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: Colors.colorPrimary
        }]}>
          <TextInput
            editable={false}
            value={"Maharashtra"}
            style={{ flex: 9, paddingLeft: 6, color: Colors.colorBlack }}
            placeholder={StringsOfLang.LOGIN.STATE}
          />
        </View>

        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.DISTRICT}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !district ? Colors.colorGray
            : Colors.colorPrimary
        }]}>
          <CustomDropDown
            key={district}
            items={sessionData.distictsList}
            value={district}
            onValueChange={(value, index) => {
              setDistrict(value);
              sortTahasilList(index);
            }}
            placeholder={StringsOfLang.LOGIN.DISTRICT}
          />
        </View>

        {district &&
          <>
            <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.TAHASIL}</Text>
            <View style={[styles.loginInputContainer, {
              borderColor: !tahasil ? Colors.colorGray
                : Colors.colorPrimary
            }]}>
              <CustomDropDown
                key={tahasil}
                items={sessionData.tahasilList}
                value={tahasil}
                onValueChange={(value, index) => {
                  setTahasil(value);
                }}
                placeholder={StringsOfLang.LOGIN.TAHASIL}
              />
            </View>
          </>
        }


        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.PASSWORD}</Text>
        <View style={[styles.loginInputContainer, {
          borderColor: !password ? Colors.colorGray
            : validPass
              ? Colors.colorPrimary
              : Colors.colorRed,
          marginBottom: 20
        }]}>
          <TextInput
            style={{ flex: 9, paddingLeft: 6 }}
            onChangeText={(text) => {
              if (text.length > 5) {
                setValidPass(true)
              } else {
                setValidPass(false);
              }
              setPassword(text)
            }}
            editable={true}
            selectTextOnFocus={true}
            value={password}
            secureTextEntry={isPasswordSecure}
            placeholder={StringsOfLang.LOGIN.PASSWORD}
            returnKeyType="go">
          </TextInput>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center' }}
            onPress={() => setIsPasswordSecure(!isPasswordSecure)}>
            <MaterialCommunityIcons name={isPasswordSecure ? "eye-off" : "eye"} color={Colors.colorGray} size={20} />
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.errorText}>{StringsOfLang.LOGIN.ERROR_PASSWORD}</Text> */}

        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <TouchableOpacity
            onPress={() => setIsChecked(!isChecked)}
          >
            {isChecked ?
              <AntDesign name={'checksquare'} size={20} color={Colors.colorPrimary} /> :
              <Feather name={'square'} size={20} color={Colors.colorGray} />
            }

          </TouchableOpacity>
          <Text style={styles.loginFormtext}>  {StringsOfLang.LOGIN.I_AGREE}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(NavigationUrl.commonViewId, {
                screenName: StringsOfLang.DASHBOARD['T&C'],
                data: StringsOfLang.DASHBOARD.TERMSCONDITIONSARR,
              })
            }}
          >
            <Text style={styles.loginFormLink}>{StringsOfLang.LOGIN.TERMS_CONDITION}</Text>
          </TouchableOpacity>
        </View>





        <TouchableOpacity
          onPress={() => signIn()}
          style={[styles.loginSignInButton, {
            backgroundColor: checkDisabled()
              ? Colors.colorGray
              : Colors.colorPrimary
          }]}
          disabled={checkDisabled()}
        >
          <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.LOGIN.SIGNUP}</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

export default Signup

const styles = StyleSheet.create({
  signupFormTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.colorBlack,
    marginBottom: 42
  },
  privacyText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.colorBlack,
    marginHorizontal: 40
  },
  privacyLinkText: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.colorBlue,
    textDecorationLine: 'underline'
  },
  login: {
    flex: 1,
    backgroundColor: Colors.colorWhite
  },
  threeButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  loginImage: {
    width: 30,
    height: 30
  },
  imageButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderWidth: 0.4,
    borderRadius: 6
  },
  loginImageButtons: {
    width: 25,
    height: 25
  },
  loginForm: {
    height: '80%',
    width: '100%',
    padding: 32,
  },
  loginFormtext: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.colorGray,
  },
  loginFormLink: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.colorPrimary,
    fontWeight: "bold",
    textDecorationLine: 'underline'
  },
  loginFormOr: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.colorBlack,
    fontWeight: "bold",
  },
  loginFormTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.colorPrimary,
    marginTop: 8,
  },
  loginInputContainer: {
    flexDirection: 'row',
    marginVertical: 12,
    borderColor: Colors.colorGray,
    borderWidth: 1.5,
    borderRadius: 32,
    padding: 8,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  loginSignInButton: {
    padding: 16,
    width: '100%',
    backgroundColor: Colors.colorPrimary,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 32,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  loginInputText: {
    padding: 10,
    paddingLeft: 14,
    fontSize: 17,
  },
  loginInputPassword: {
    padding: 10,
    paddingLeft: 14,
    fontSize: 17
  },
  loginRegisterButton: {
    padding: 10,
    width: '100%',
    marginBottom: 30,
  },
  backButton: {
    flex: 1,
    justifyContent: 'flex-start'
  },
  emptyHeader: {
    flex: 8,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.colorPrimary
  },
  errorText: {
    textAlign: 'left',
    fontSize: 12,
    color: Colors.colorRed,
    marginBottom: 40
  },
});