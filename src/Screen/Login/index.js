import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, ScrollView, TextInput, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native'
import { AsyncStorageUtil, Colors, NavigationUrl } from '../../Utils';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useSession from '../../App/useSession';
import { isEmptyValue, isValidEmailId, isValidMobileNo } from '../../Utils/ValidationUtils';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { StringsOfLang } from '../../Localization';
import { Endpoints, NetworkManager } from '../../API';
import CustomPopup from '../../Components/CustomPopup';
import { radioJson } from '../../Utils/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Login = ({ navigation }) => {
  const { session, setSession } = useSession();
  const [mobile, setMobile] = useState('');
  const [validMobile, setValidMobile] = useState(false);
  const [password, setPassword] = useState('');
  const [validPass, setValidPass] = useState(false);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  const sessionData = session;
  sessionData.radioJsonData = radioJson;

  const signIn = async () => {
    let params = {
      "mobileNo": mobile,
      "password": password
    };
    let header = {};

    NetworkManager.IDFCNetworkPost(
      Endpoints.loginApi,
      params,
      header,
      (response) => {
        console.log("loginApi response ", response);
        if (!isEmptyValue(response?.user)) {
          try {
            AsyncStorageUtil.storeItem("userId", JSON.stringify(response?.user?.mobileNo));
            AsyncStorageUtil.storeItem("user", JSON.stringify(response?.user));
            AsyncStorageUtil.storeItem("authorization", JSON.stringify(response?.token))
            setSession({
              ...session,
              loginFlag: true,
              userId: (response?.user?.mobileNo).toString(),
              userInfo: response?.user
            });
          } catch {
            console.log('error');
          }
          Alert.alert(StringsOfLang.LOGIN.REGI_SUCCESS_TITLE,
            `Welcome, ${response?.user?.name}`, [
            // {
            //   text: StringsOfLang.COMMON.CANCEL,
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: async () => {
                navigation.goBack()
              }
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

  const register = () => {
    setIsVisiblePopup(true)
  }

  const checkDisabled = () => {
    if (validMobile && validPass) {
      return false;
    } else {
      return true;
    }
  }

  const onRadioButtonClick = (item) => {
    let arr = sessionData.radioJsonData;
    arr.forEach((ele) => {
      if (ele.value == item.value) {
        ele.isSelected = true
      } else {
        ele.isSelected = false;
      }
    })
    if (item.value == 'Agent') {
      sessionData.isAgent = true;
    } else {
      sessionData.isAgent = false;
    }
    sessionData.radioJsonData = arr;
    setSession({ ...session, sessionData });
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.renderItemContainer}>
        <TouchableOpacity
          style={styles.radioButtonItem}
          onPress={() => {
            onRadioButtonClick(item);
          }}
        >
          <Ionicons
            name={item.isSelected ? "radio-button-on" : "radio-button-off"}
            size={RFValue(16)}
            color={Colors.colorPrimary} />
        </TouchableOpacity>

        <View style={styles.radioTextItem}>
          <Text style={styles.titleText}>{item?.value}</Text>
        </View>
      </View>
    )
  }

  console.log("radioJsonData ", sessionData.isAgent, sessionData.radioJsonData);
  return (
    <ScrollView style={styles.login}>
      <View style={styles.loginForm}>
        <Image
          style={styles.logoImage}
          source={require('../../Assets/Images/app_logo.png')}
        />

        <Text style={styles.loginFormTitle}>{session.isAgent
          ? StringsOfLang.LOGIN.ENTER_MOBILE_AGENT
          : StringsOfLang.LOGIN.ENTER_MOBILE_USER}</Text>
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
            placeholder={session.isAgent
              ? StringsOfLang.LOGIN.MOBILE_NO_AGENT
              : StringsOfLang.LOGIN.MOBILE_NO_USER}
            keyboardType='phone-pad'
          // returnKeyType={"next"}
          />
        </View>


        <Text style={styles.loginFormTitle}>{StringsOfLang.LOGIN.ENTER_PASSWORD}</Text>
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
            placeholderTextColor={Colors.colorGray}
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

        <TouchableOpacity
          onPress={() => signIn()}
          style={[styles.loginSignInButton, { backgroundColor: checkDisabled() ? Colors.colorGray : Colors.colorPrimary }]}
          disabled={checkDisabled()}
        >
          <Text style={{ color: Colors.colorWhite, fontWeight: 'bold', textAlign: 'center' }}>{StringsOfLang.LOGIN.LOGIN}</Text>
        </TouchableOpacity>


        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
          <Text style={{ color: Colors.colorGray }}>{StringsOfLang.LOGIN.DONT_HAVE_ACCOUNT}
          </Text>
          <TouchableOpacity
            onPress={() => register()}
          ><Text style={{ color: Colors.colorPrimary, fontWeight: 'bold' }}>{StringsOfLang.LOGIN.SIGNUP}</Text>
          </TouchableOpacity>
        </View>



      </View>

      <CustomPopup
        isVisible={isVisiblePopup}
        headerText={"Register as a "}
        component={
          <>
            <FlatList
              data={sessionData.radioJsonData}
              extraData={sessionData.radioJsonData}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              ListHeaderComponent={sessionData.radioJsonData == "" && (<ActivityIndicator size="large" />)}
            />
          </>
        }
        ButtonText={"Continue"}
        buttonPress={() => {
          setIsVisiblePopup(false)
          sessionData.isAgent
            ? navigation.navigate(NavigationUrl.signupId)
            : navigation.navigate(NavigationUrl.signupUserId);
        }}
        CancelButtonText={"Cancel"}
        cancelButtonPress={() => setIsVisiblePopup(false)}
      />
    </ScrollView>
  )
}

export default Login;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: Colors.colorWhite
  },
  logoImage: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: wp('50%'),
    height: hp('22%'),
    marginVertical: 32,
  },
  loginForm: {
    flex: 1,
    width: '100%',
    padding: 32,
  },
  loginFormTitle: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.colorPrimary,
    marginTop: 16,
    marginBottom: 8
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
  titleText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    textAlign: 'left',
    color: Colors.colorSecondary,
  },
  renderItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    margin: 8
  },
  radioButtonItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioTextItem: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
})