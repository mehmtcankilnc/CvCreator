import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';

export const saveToDownloads = async (
  localPath: string,
  fileName: string,
): Promise<'saved' | 'denied' | 'shared'> => {
  const safeName = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;

  if (Platform.OS === 'android') {
    if (Platform.Version < 29) {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (status !== PermissionsAndroid.RESULTS.GRANTED) return 'denied';
    }

    await RNFetchBlob.MediaCollection.copyToMediaStore(
      { name: safeName, parentFolder: '', mimeType: 'application/pdf' },
      'Download',
      localPath,
    );
    return 'saved';
  }

  await Share.open({
    url: localPath,
    type: 'application/pdf',
    filename: safeName,
    failOnCancel: false,
  });
  return 'shared';
};
