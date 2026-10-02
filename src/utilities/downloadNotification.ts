import { PermissionsAndroid, Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  Event,
  EventType,
} from '@notifee/react-native';
import RNFetchBlob from 'react-native-blob-util';

const CHANNEL_ID = 'downloads';

export const notifyDownloadComplete = async (
  title: string,
  body: string,
  localPath: string,
) => {
  if (Platform.OS !== 'android') return;

  try {
    if (Platform.Version >= 33) {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (status !== PermissionsAndroid.RESULTS.GRANTED) return;
    }

    const channelId = await notifee.createChannel({
      id: CHANNEL_ID,
      name: 'Downloads',
      importance: AndroidImportance.DEFAULT,
    });

    await notifee.displayNotification({
      title,
      body,
      data: { path: localPath },
      android: {
        channelId,
        pressAction: { id: 'open-file' },
        autoCancel: true,
      },
    });
  } catch (error) {
    console.warn('Bildirim gösterilemedi:', error);
  }
};

export const handleDownloadNotificationEvent = async ({
  type,
  detail,
}: Event) => {
  if (type !== EventType.PRESS) return;
  const path = detail.notification?.data?.path;
  if (typeof path !== 'string') return;

  try {
    await RNFetchBlob.android.actionViewIntent(path, 'application/pdf');
  } catch (error) {
    console.warn('Dosya açılamadı:', error);
  }
};
