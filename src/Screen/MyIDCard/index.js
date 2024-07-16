import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Alert, Linking, TouchableOpacity, FlatList, SectionList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AsyncStorageUtil, Colors, NavigationUrl } from '../../Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../Components/CustomTextInput';
import useSession from '../../App/useSession';
import { useIsFocused } from '@react-navigation/native';
import { StringsOfLang } from '../../Localization';
import { Endpoints, NetworkManager } from '../../API';
import { isEmptyValue } from '../../Utils/ValidationUtils';
import { formatDateString } from '../../Utils/CommonFunction';
import ImagePicker from 'react-native-image-crop-picker';


const MyIDCard = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();


  const prevSessData = session;

  console.log("id card users ", JSON.stringify(prevSessData).userInfo);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      prevSessData.userInfo.profilePicture = image.path;
      setSession({ ...session, prevSessData });
      saveApiCall(image);
    });
  }

  const saveApiCall = async (image) => {
    let bodyFormData = new FormData();
    bodyFormData.append('id', prevSessData?.userInfo?.id);
    // bodyFormData.append('path', image.toString());
    bodyFormData.append("file", {
      uri: image.path,
      name: 'profile.png',
      type: image.mime
    })

    let headerInfo = await AsyncStorageUtil.getItem("authorization");
    let parsedHeaderInfo = JSON.parse(headerInfo);

    let header = {
      "Content-Type": "multipart/form-data",
      Authorization: 'Bearer ' + parsedHeaderInfo
    };
    console.log("params ", bodyFormData);

    NetworkManager.IDFCNetworkPost(
      Endpoints.profileImageUpload,
      bodyFormData,
      header,
      (response) => {
        console.log("profileImageUpload response ", response);
        if (!isEmptyValue(response?.id)) {
          Alert.alert(StringsOfLang.DASHBOARD.IMAGE_UPLOAD_SUCCESS,
            "", [
            // {
            //   text: StringsOfLang.COMMON.CANCEL,
            //   onPress: () => console.log('Cancel Pressed'),
            //   style: 'cancel',
            // },
            {
              text: StringsOfLang.COMMON.OKAY,
              onPress: async () => {
                prevSessData.userInfo = response;
                setSession({ ...session, prevSessData });
                navigation.goBack();
              }
            },
          ]);
        } else {
          Alert.alert(StringsOfLang.DASHBOARD.IMAGE_UPLOAD_ERROR,
            "", [
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
      Alert.alert(StringsOfLang.DASHBOARD.IMAGE_UPLOAD_ERROR,
        "", [
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
    <View style={styles.login}>
      <View style={styles.loginHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={RFValue(20)} color={Colors.colorPrimary} />
        </TouchableOpacity>
        <View style={styles.emptyHeader}>
          <Text style={styles.signupFormTitle}> {StringsOfLang.DASHBOARD.MY_ID_CARD}</Text>
        </View>
      </View>

      <ScrollView style={styles.loginForm}>

        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          padding: RFPercentage(1),
          backgroundColor: Colors.colorWhite,
          shadowColor: Colors.colorBlack,
          shadowOffset: { width: 1, height: 8 },
          shadowOpacity: 8,
          shadowRadius: 6,
          elevation: 10,
        }}>
          <View style={{
            flex: 3,
            padding: RFValue(6),
            backgroundColor: Colors.colorSecondary,
            alignItems: 'center',
          }}>

            <TouchableOpacity
              style={styles.imageCircle}
              onPress={() => {
                pickImage();
              }}>
              <Image
                style={prevSessData?.userInfo?.profilePicture == null
                  ? styles.userImageEmpty
                  : styles.userImage}
                resizeMode={'contain'}
                source={prevSessData?.userInfo?.profilePicture == null
                  ? require('../../Assets/Images/upload_image.png')
                  : { uri: Endpoints.imageDomain + prevSessData?.userInfo?.profilePicture }}
              />
            </TouchableOpacity>

          </View>

          <View style={{
            flex: 4,
            padding: RFValue(26),
            backgroundColor: Colors.colorPrimary,
          }}>
            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.NAME}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.nameValue}>{(prevSessData?.userInfo?.name).toUpperCase()}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.EMAIL}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={styles.nameValue}>{(prevSessData?.userInfo?.email).toUpperCase()}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.MOBILE_NO_AGENT}</Text>
            <Text style={styles.nameValue}>{(prevSessData?.userInfo?.mobileNo)}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.ADDRESS}</Text>
            <Text style={styles.nameValue}>{(prevSessData?.userInfo?.address)}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.STATE}</Text>
            <Text style={styles.nameValue}>{(prevSessData?.userInfo?.state)}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.DISTRICT}</Text>
            <Text style={styles.nameValue}>{(prevSessData?.userInfo?.district)}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.LOGIN.TAHASIL}</Text>
            <Text style={styles.nameValue}>{(prevSessData?.userInfo?.tahasil)}</Text>

            <Text style={styles.nameTitle}>{StringsOfLang.DASHBOARD.JOINING_DATE}</Text>
            <Text style={styles.nameValue}>{formatDateString(prevSessData?.userInfo?.createdAt)}</Text>

          </View>

        </View>

      </ScrollView>

    </View>
  )
}

export default MyIDCard;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: Colors.colorBackground,
  },
  loginForm: {
    padding: RFPercentage(2),
    height: "93%"
  },
  loginHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '7%',
    width: '100%',
    backgroundColor: Colors.colorWhite,
    borderBottomWidth: 0.4,
    borderBottomColor: Colors.colorPrimary
  },
  itemStyle: {
    backgroundColor: '#dcdee0',
    padding: 10,
    margin: 5,
  },
  headerStyle: {
    paddingVertical: 10,
  },
  addToCartButton: {
    padding: 10,
    backgroundColor: Colors.colorPrimary,
    borderRadius: 4
  },
  deleteIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.colorLightGray,
    borderRadius: 8,
    borderWidth: 0
  },
  starStyle: {
    width: 60,
    height: 14,
    marginTop: 4,
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
  textInputContainer: {
    margin: 20,
  },
  roundedTextInput: {
    borderRadius: 6,
    borderWidth: 1,
  },
  threeButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  loginImage: {
    width: 30,
    height: 30
  },
  arrowImage: {
    width: 12,
    height: 12
  },
  imageButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderWidth: 0.4,
    borderRadius: 6
  },
  loginImageButtons: {
    width: 25,
    height: 25
  },
  forgotForm: {
    height: '70%',
    width: '100%',
    padding: 13,
  },
  signupFormTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.colorPrimary,
    marginVertical: 5,
  },
  signupFormSubTitle: {
    fontSize: 12,
    color: Colors.colorBlack,
    marginBottom: 30,
  },
  nameTitle: {
    fontSize: RFValue(10),
    fontWeight: "500",
    color: Colors.colorWhite,
  },
  nameValue: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: Colors.colorWhite,
    marginBottom: RFValue(6)
  },
  timerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.colorBlack,
    marginTop: 30
  },
  loginFormLink: {
    textAlign: 'center',
    fontSize: 12,
    color: Colors.colorGray,
    margin: 10
  },
  loginFormOr: {
    textAlign: 'center',
    fontSize: 15,
    color: Colors.colorBlack,
    fontWeight: "bold",
  },
  loginInputContainer: {
    flexDirection: 'row',
    borderColor: Colors.colorBorder,
    borderWidth: 0.6,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  loginInputText: {
    padding: 10,
    paddingLeft: 14,
    fontSize: 17,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  loginInputPassword: {
    padding: 10,
    paddingLeft: 14,
    fontSize: 17
  },
  loginSignInButton: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.colorPrimary,
    marginTop: 40,
    marginBottom: 10,
  },
  loginRegisterButton: {
    padding: 10,
    width: '100%',
    backgroundColor: Colors.colorBlack,
    marginBottom: 30,
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyHeader: {
    flex: 6,
    justifyContent: 'flex-start'
  },
  searchBarComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 10,
  },
  searchBarView: {
    flex: 7,
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 8,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.colorWhite,
  },
  searchBarIcon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.colorBorder,
    borderRadius: 8,
    borderWidth: 0.6,
    margin: 8,
    backgroundColor: Colors.colorWhite,
  },
  imageIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 49.4,
    // width: 49.4,
  },
  favBrandBoxView: {
    flex: 1,
    width: "100%",
    paddingVertical: 8,
    alignSelf: 'flex-start',
    borderBottomColor: Colors.colorGray,
    borderBottomWidth: 0.8,
  },
  favBrandImg: {
    width: 100,
    height: 100,
    borderRadius: 8,
    alignSelf: 'flex-start',
    borderColor: Colors.colorBorder,
    borderWidth: 0.8,
  },
  brandText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.colorBlack,
    marginTop: 10,
    marginHorizontal: 10,
  },
  emptyListTextStyle: {
    fontSize: 22,
    lineHeight: 22,
    color: Colors.colorPrimary,
    letterSpacing: -0.5,
    marginTop: 6,
  },
  emptyListViewStyle: {
    flex: 1,
    marginTop: 200,
    justifyContent: "center",
    alignSelf: "center",
  },
  grayBox: {
    flex: 1,
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    backgroundColor: Colors.colorWhite,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  totalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 4
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
  underline: {
    height: 0.9,
    backgroundColor: Colors.colorPrimary,
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
  imageCircle: {
    justifyContent: 'center',
    alignContent: 'center',
    padding: RFValue(16)
  },
  userImage: {
    height: RFValue(160),
    width: RFValue(160),
    padding: RFValue(2),
    borderColor: Colors.colorGray,
    borderWidth: 2,
    borderRadius: 8,
  },
  userImageEmpty: {
    height: RFValue(140),
    width: RFValue(140),
    padding: RFValue(10),
    borderColor: Colors.colorGray,
    borderWidth: 1,
    borderRadius: RFValue(70),
    backgroundColor: Colors.colorWhite
  },
});