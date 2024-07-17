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
import ItemHighlight from './component/ItemHighlight';
import ItemCatagories from './component/ItemCatagories';

const Dashboard = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();
  const [highLights, setHighLights] = useState(session.highLights);
  const [catagories, setCatagories] = useState(session.catagories);
  const [guide, setGuide] = useState(session.guide);

  const sessionData = session;

  useEffect(() => {
    isFocused && getUserInfo()
  }, [isFocused]);

  const getUserInfo = async () => {
    console.log("dashboard userStored reached");
    const userIdStore = await AsyncStorageUtil.getItem("userId");
    const userStored = await AsyncStorageUtil.getItem("user");
    sessionData.userId = JSON.parse(userIdStore).toString();
    sessionData.userInfo = JSON.parse(userStored);
    setSession({ ...session, sessionData });
    console.log("dashboard userStored ", sessionData.userInfo);
  }


  const renderItem = ({ item, index }) => {
    return (
      <>
        <ItemHighlight
          item={item}
          index={index}
          onPress={() => { }} />
      </>
    )
  }

  const renderItemC = ({ item, index }) => {
    return (
      <>
        <ItemCatagories
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

      <SliderBox
        images={[require('../../Assets/Images/dash_Img.png')]}
        ImageComponentStyle={styles.homepageImage}
        sliderBoxHeight={180}
        autoplay={false} />

      <View style={styles.highlightBackground}>
        <CustomTextView
          textStyle={styles.menuTitle}
          text={StringsOfLang.DASHBOARD.HIGHLIGHTS}
        />

        <View style={styles.listView}>
          <FlatList
            data={highLights}
            extraData={highLights}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>

      <View style={styles.catagoriesBackground}>
        <CustomTextView
          textStyle={styles.menuTitle}
          text={StringsOfLang.DASHBOARD.CATAGORIES}
        />

        <View style={styles.listView}>
          <FlatList
            data={catagories}
            extraData={catagories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItemC}
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
              text={guide?.name}
            />

            <CustomTextView
              textStyle={styles.guidePeriod}
              text={guide?.period}
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
              source={guide.image}
            />
          </View>

        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

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
    height: RFValue(480),
  },
  highlightBackground: {
    backgroundColor: Colors.colorWhite
  },
  listView: {
    margin: RFValue(8)
  },
  catagoriesBackground: {
    backgroundColor: Colors.colorBackground
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
  }
});
