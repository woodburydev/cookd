/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  registerLocalPushNotifications,
  createLocalPushNotificationChannel,
  getToken,
} from './src/config/notificationHandler';

registerLocalPushNotifications();
createLocalPushNotificationChannel();
console.log(getToken());

AppRegistry.registerComponent(appName, () => App);
