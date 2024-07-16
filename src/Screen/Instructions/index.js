import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { Colors } from '../../Utils';
// import LoaderComponent from '../../Components/LoaderComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { StringsOfLang } from '../../Localization';
import { CustomStatusBar } from '../../Components/CustomStatusBar';

const Instructions = props => {
  const navigation = useNavigation();

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
          <Text style={styles.headerText}>{StringsOfLang.DASHBOARD.INSTRUCTIONS}</Text>
        </View>

      </View>


      <ScrollView
        style={styles.loginForm}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>


        <View style={styles.grayBox}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <View style={styles.userIcon}>
                <MaterialCommunityIcons name={'send'} size={24} color={Colors.colorBlack} />
              </View>
            </View>
            <View style={{
              flex: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.boxText3}>{StringsOfLang.DASHBOARD.INSTRU_ADS_TITLE}</Text>
            </View>
          </View>

          <View style={styles.touchView}>
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.INSTRU_ADS}</Text>
          </View>

        </View>

        <View style={styles.grayBox}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <View style={styles.userIcon}>
                <MaterialCommunityIcons name={'send'} size={24} color={Colors.colorBlack} />
              </View>
            </View>
            <View style={{
              flex: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.boxText3}>{StringsOfLang.DASHBOARD.INSTRU_VIEW_ADS_TITLE}</Text>
            </View>
          </View>

          <View style={styles.touchView}>
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.INSTRU_VIEW_ADS}</Text>
          </View>

        </View>

        <View style={styles.grayBox}>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <View style={{ flex: 1 }}>
              <View style={styles.userIcon}>
                <MaterialCommunityIcons name={'send'} size={24} color={Colors.colorBlack} />
              </View>
            </View>
            <View style={{
              flex: 9,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.boxText3}>{StringsOfLang.DASHBOARD.INSTRU_ADS_AGENT_TITLE}</Text>
            </View>
          </View>

          <View style={styles.touchView}>
            <Text style={styles.boxText4}>{StringsOfLang.DASHBOARD.INSTRU_ADS_AGENT}</Text>
          </View>

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

export default Instructions;

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
    padding: 16,
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
    height: 30,
    width: 30,
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
    color: Colors.colorGray,
    fontSize: RFValue(16),
    letterSpacing: 1.5
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
