import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { Colors, NavigationUrl, AsyncStorageUtil } from '../../Utils';
import useSession from '../../App/useSession';
import { isEmptyValue, isValidEmailId, isValidMobileNo } from '../../Utils/ValidationUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { StringsOfLang } from '../../Localization';
import { useNavigation } from '@react-navigation/native';
import { Endpoints, NetworkManager } from '../../API';

const SignupUser = ({ }) => {
  const { session, setSession } = useSession();
  const navigation = useNavigation();

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
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isChecked, setIsChecked] = useState(true);


  const signIn = () => {
    let params = {
      "email": email,
      "password": password,
      "name": fullName,
      "userType": "customer",
      "mobileNo": mobile,
      "address": address,
      "state": "",
      "district": "",
      "tahasil": ""
    };
    let header = {};

    NetworkManager.IDFCNetworkPost(
      Endpoints.signUpAgent,
      params,
      header,
      response => {
        console.log("signUpUser response ", response);
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
    if (validName && validEmail && validMobile && validAddress && validPass && isChecked) {
      return false;
    } else {
      return true;
    }
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
          <Text style={styles.headerText}>{StringsOfLang.LOGIN.USER_REGISTRATION}</Text>
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

        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.ENTER_MOBILE_USER}</Text>
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
            placeholder={StringsOfLang.LOGIN.MOBILE_NO_USER}
            keyboardType='phone-pad'
          // returnKeyType={"next"}
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

export default SignupUser;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: Colors.colorWhite
  },
  logoImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('20%'),
    height: hp('12%'),
    marginVertical: 32,
  },
  loginForm: {
    flex: 1,
    width: '100%',
    padding: 32,
  },
  loginTitle: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: "bold",
    color: Colors.colorPrimary,
    marginVertical: 16,
  },
  loginFormTitle: {
    fontSize: 20,
    fontWeight: "500",
    color: Colors.colorPrimary,
    marginTop: 8,
  },
  loginInputContainer: {
    flexDirection: 'row',
    marginVertical: 24,
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
    marginTop: 40,
    marginBottom: 30,
    borderRadius: 32,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 3 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%'
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
})