/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef, useState } from 'react';
import { Alert, View } from 'react-native';
import AppProvider from './src/App/AppContext';
import AppContainer from './src/App/AppContainer';
import 'react-native-gesture-handler';
import { AsyncStorageUtil } from './src/Utils';
import SplashScreen from 'react-native-splash-screen'
import usePushNotification from './src/Hooks/PushNotification';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {Provider} from 'react-redux';
import store from './redux/store';

const App = () => {
  console.disableYellowBox = true;
  const [userId, setUserId] = useState('');
  const userIdFunc = useRef(null);

  const {
    requestUserPermission,
    getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foregrond!', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      PushNotification.localNotification({
        title: remoteMessage.data.title,
        message: remoteMessage.data.description,
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Handle notification when the app is in background or terminated
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
      // Show notification in the notification drawer
      PushNotification.localNotification({
        title: remoteMessage.data.title,
        message: remoteMessage.data.description,
        channelId: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const userIdStore = await AsyncStorageUtil.getItem("userId");
    setUserId(userIdStore)
    userIdFunc.current();
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <AppProvider>
          <AppContainer userIdFunc={userId} />
        </AppProvider>
      </View>
    </Provider>
  );
};

export default App;
