import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, Alert, Linking, TouchableOpacity, FlatList, SectionList, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { Colors, NavigationUrl } from '../../Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../../Components/CustomTextInput';
import useSession from '../../App/useSession';
import { useIsFocused } from '@react-navigation/native';
import { StringsOfLang } from '../../Localization';
import { Endpoints, NetworkManager } from '../../API';
import { isEmptyValue } from '../../Utils/ValidationUtils';


const ViewAds = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();

  const [searchText, setSearchText] = useState('');
  const [jsonData, setJsonData] = useState("");


  useEffect(() => {
    isFocused && getAdsListApi()
  }, [isFocused]);

  const searchTextMethod = (text) => {
    setSearchText(text);
  }

  const getAdsListApi = () => {
    let header = {};

    NetworkManager.IDFCNetworkGet(
      Endpoints.getViewAds,
      header,
      (response) => {
        console.log("getMyAds response ", response);
        if (!isEmptyValue(response?.data)) {
          setJsonData(response?.data);
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

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.grayBox}>
        <View style={styles.textBoxContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.titleText}>{item?.title}</Text>
          </View>
          <View style={styles.underline}></View>

          <View style={styles.priceBoxContainer}>
            <Text
              style={styles.contentText}
              adjustsFontSizeToFit={true}
              numberOfLines={10}>{item?.desc}</Text>
          </View>

          <TouchableOpacity
            style={styles.totalContainer}
            onPress={() => {
              Linking.openURL(`tel:${item?.contactNo}`)
            }}
          >
            <Text style={styles.mobileText}><Ionicons name="call-sharp" size={RFValue(16)} color={Colors.colorPrimary} /> {item?.contactNo}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const renderEmptyListItem = () => (
    <View style={styles.emptyListViewStyle}>
      <Text style={styles.emptyListTextStyle}>
        {StringsOfLang.DASHBOARD.NO_RESULT_LIST}
      </Text>
    </View>
  );
  console.log("jsonData ", jsonData);

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
          <Text style={styles.signupFormTitle}> {StringsOfLang.DASHBOARD.VIEW_ADS}</Text>
        </View>
      </View>

      <View style={styles.loginForm}>

        <View style={styles.searchBarComponent}>
          <View style={styles.searchBarView}>
            <CustomTextInput
              label={StringsOfLang.DASHBOARD.SEARCH_LABLE}
              tint={Colors.colorGray}
              changeText={(text) => { searchTextMethod() }}
              editable={true}
              value={searchText}
              isForeIcon={true}
              foreIcon={'search'}
              onClickForeIcon={() => {
                // search functionality
              }}
            />
          </View>
          <View style={styles.searchBarIcon}>
            <TouchableOpacity
              style={styles.imageIcon}
            // onPress={onClickBackIcon}
            >
              <Ionicons name={'filter-sharp'} color={Colors.colorGray} size={20} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={jsonData}
          extraData={jsonData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={jsonData == "" && renderEmptyListItem}
        />
      </View>

    </View>
  )
}

export default ViewAds;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: Colors.colorBackground,
  },
  loginForm: {
    paddingHorizontal: 12,
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
  loginFormTitle: {
    fontSize: 12,
    fontWeight: "bold"
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
});