/**
 * @format
 */

import 'react-native-url-polyfill/auto';

import { AppRegistry } from 'react-native';
import notifee from '@notifee/react-native';
import { handleDownloadNotificationEvent } from './src/utilities/downloadNotification';
import App from './App';
import { name as appName } from './app.json';

notifee.onBackgroundEvent(handleDownloadNotificationEvent);

AppRegistry.registerComponent(appName, () => App);
