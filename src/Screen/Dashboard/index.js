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
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { AsyncStorageUtil, Colors, NavigationUrl } from '../../Utils';
import useSession from '../../App/useSession';
import { CustomStatusBar } from '../../Components/CustomStatusBar';
import { StringsOfLang } from '../../Localization';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import AntDesign from "react-native-vector-icons/AntDesign";
import { getFontFamily } from '../../Utils/FontFamily';

const Dashboard = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { session, setSession } = useSession();

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

  return (
    <ScrollView
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <CustomStatusBar />


      <Text style={[styles.menuTitle]}>{StringsOfLang.DASHBOARD.HIGHLIGHTS}</Text>

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
    fontSize: RFPercentage(2.2),
    color: Colors.colorBlack,
    marginLeft: 24,
    fontFamily: getFontFamily("bold")
  },
});
