import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import {
  View,
  BackHandler,
  PermissionsAndroid,
  AppState,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AsyncStorageUtil, Colors, NavigationUrl } from '../../Utils';
import useSession from '../../App/useSession';
import { CustomStatusBar } from '../../Components/CustomStatusBar';
import { StringsOfLang } from '../../Localization';
import { getFontFamily } from '../../Utils/FontFamily';
import { SliderBox } from "react-native-image-slider-box";
import CustomTextView from '../../Components/CustomTextView';
import ItemTopSpots from './component/ItemTopSpots';

const Surfing = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();
  const [screenData, setScreenData] = useState(session.highLights[0]);
  const [guide, setGuide] = useState(session.guide);

  const sessionData = session;

  useEffect(() => {
    isFocused && getInfo()
  }, [isFocused]);

  const getInfo = async () => {
    setScreenData(session.highLights[0]);
    console.log("screendata ", screenData);
  }


  const renderItem = ({ item, index }) => {
    return (
      <>
        <ItemTopSpots
          item={item}
          index={index}
          onPress={() => { }} />
      </>
    )
  }

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomStatusBar />

      <ImageBackground
        source={screenData?.image}
        resizeMode='cover'
        style={styles.homepageImage}>
        <CustomTextView
          textStyle={styles.titleText}
          text={screenData?.title}
        />
      </ImageBackground>

      <View style={styles.introBackground}>
        <CustomTextView
          textStyle={styles.introText}
          text={screenData?.intro}
        />
      </View>


      <View style={styles.topSpotsBackground}>
        <CustomTextView
          textStyle={styles.menuTitle}
          text={screenData?.topSpots?.title}
        />

        <View style={styles.listView}>
          <FlatList
            data={screenData?.topSpots?.items}
            extraData={screenData?.topSpots?.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>

      <View style={styles.guidBackground}>
        <CustomTextView
          textStyle={styles.menuTitle}
          text={StringsOfLang.DASHBOARD.GUIDE}
        />

        <View style={styles.guideView}>

          <View style={styles.titleView}>
            <CustomTextView
              textStyle={styles.guideName}
              text={screenData?.guide?.name}
            />

            <CustomTextView
              textStyle={styles.guidePeriod}
              text={screenData?.guide?.period}
            />

            <TouchableOpacity style={styles.contactButton}>
              <CustomTextView
                textStyle={styles.guideContact}
                text={StringsOfLang.DASHBOARD.CONTACT}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.guideProfileView}>
            <Image
              style={styles.guideProfile}
              source={screenData?.guide?.image}
            />
          </View>

        </View>
      </View>


      <TouchableOpacity style={styles.bookingButton}>
        <Text style={styles.buttonText}>{StringsOfLang.DASHBOARD.BOOK}</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default Surfing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorBackground
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: RFValue(70),
    paddingHorizontal: 24,
    margin: 12,
    borderRadius: 8,
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: Colors.colorWhite,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 6,
  },
  menuTitle: {
    fontSize: RFValue(16),
    color: Colors.colorBlack,
    marginTop: RFValue(24),
    marginLeft: RFValue(16),
    fontFamily: getFontFamily("bold")
  },
  homepageImage: {
    width: '100%',
    height: RFValue(260),
    justifyContent: 'center',
  },
  highlightBackground: {
    backgroundColor: Colors.colorWhite
  },
  listView: {
    margin: RFValue(8)
  },
  introBackground: {
    backgroundColor: Colors.colorWhite
  },
  topSpotsBackground: {
    backgroundColor: Colors.colorWhite,
    paddingBottom: RFValue(50)
  },
  guidBackground: {
    backgroundColor: Colors.colorBackground
  },
  guideView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    width: RFPercentage(45),
    borderRadius: RFValue(8),
    margin: RFValue(16),
    padding: RFValue(16),
    backgroundColor: Colors.colorWhite,
  },
  titleView: {
    flex: 3,
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginLeft: RFValue(8),
    backgroundColor: Colors.colorWhite,
  },
  guideName: {
    fontSize: RFValue(20),
    color: Colors.colorBlack,
    marginTop: RFValue(12),
    fontFamily: getFontFamily("bold")
  },
  guidePeriod: {
    fontSize: RFValue(14),
    color: Colors.colorBlack,
    marginTop: RFValue(12),
    fontFamily: getFontFamily("regular")
  },
  guideProfileView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    marginRight: RFValue(16),
    marginTop: RFValue(16)
  },
  guideContact: {
    fontSize: RFValue(14),
    color: Colors.colorPrimary,
    fontFamily: getFontFamily("bold")
  },
  contactButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: RFValue(100),
    paddingVertical: RFValue(6),
    marginTop: RFValue(40),
    borderRadius: RFValue(8),
    borderWidth: RFValue(1),
    borderColor: Colors.colorPrimary
  },
  guideProfile: {
    height: RFValue(74),
    width: RFValue(74),
    borderRadius: RFValue(37),
    backgroundColor: Colors.colorGray
  },
  bookingButton: {
    padding: RFValue(8),
    margin: RFValue(16),
    // width: '100%',
    backgroundColor: Colors.colorPrimary,
    marginTop: RFValue(20),
    marginBottom: RFValue(30),
    borderRadius: RFValue(8),
    shadowColor: Colors.colorPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 9,
  },
  buttonText: {
    fontSize: RFValue(14),
    color: Colors.colorWhite,
    textAlign: 'center',
    fontFamily: getFontFamily("bold")
  },
  introText: {
    fontSize: RFValue(14),
    color: Colors.colorBlack,
    margin: RFValue(16),
    marginTop: RFValue(24),
    fontFamily: getFontFamily("regular")
  },
  titleText: {
    justifyContent: 'center',
    alignSelf: 'center',
    verticalAlign: 'center',
    fontSize: RFValue(40),
    color: Colors.colorWhite,
    fontFamily: getFontFamily("bold")
  }
});
