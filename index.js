/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { FIREBASE_SENDER_ID } from './src/API/Endpoints';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("killed state notification ", remoteMessage);
    PushNotification.localNotification({
        title: remoteMessage.data.title,
        message: remoteMessage.data.description,
        channelId: Date.now(),
    });
})

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
        // Process the notification here
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onRegister: function (token) {
        console.log('Token:', token);
    },
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },
    // Android only: GCM or FCM Sender ID
    senderID: FIREBASE_SENDER_ID,
    // Permissions to show notifications
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
