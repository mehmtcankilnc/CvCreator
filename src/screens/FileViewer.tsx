/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, View, Platform, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import Pdf from 'react-native-pdf';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import { DownloadCoverLetterById } from '../services/CoverLetterServices';
import { DownloadResumeById } from '../services/ResumeServices';

type Props = {
  navigation: any;
  route: any;
};

export default function FileViewer({ navigation, route }: Props) {
  const { t } = useTranslation();
  const { token } = useAuth();

  const { url, file, type } = route.params;
  const theme = useAppSelector(state => state.theme.theme);

  const [localPath, setLocalPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    downloadFileToCache();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const downloadFileToCache = async () => {
    if (!url || !token) return;

    setIsLoading(true);

    try {
      const { fs, config } = RNFetchBlob;
      const cachePath = `${fs.dirs.CacheDir}/${file.name || 'temp_file'}.pdf`;

      const res = await config({
        fileCache: true,
        path: cachePath,
      }).fetch('GET', url, {
        Authorization: `Bearer ${token}`,
      });

      const status = res.info().status;

      if (status === 200) {
        setLocalPath(res.path());
      } else {
        console.log('Sunucu Hatası:', status);
        fs.unlink(res.path()).catch(() => {});
      }
    } catch (error) {
      console.error('İndirme Hatası:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (type === 'coverletters') {
      await DownloadCoverLetterById(file.id, file.name, token);
    } else {
      await DownloadResumeById(file.id, file.name, token);
    }
  };

  const handleShare = async () => {
    if (localPath) {
      const filePath =
        Platform.OS === 'android' ? `file://${localPath}` : localPath;
      await Share.open({ url: filePath, type: 'application/pdf' }).catch(
        () => {},
      );
    }
  };

  return (
    <View className="flex-1">
      <Header
        handlePress={() => navigation.goBack()}
        iconName="chevron-back"
        title={t('file-viewer')}
      />
      <Page>
        {isLoading ? (
          <View
            style={{
              height: hp(65),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator color="#1954E5" size="large" />
            <Text style={{ marginTop: 10, color: '#585858' }}>
              {t('file_loading')}
            </Text>
          </View>
        ) : (
          <Pdf
            style={{
              width: wp(90),
              height: hp(65),
              backgroundColor: theme === 'DARK' ? '#0F181F' : '#ffffff',
              elevation: 8,
            }}
            source={{ uri: `file://${localPath}`, cache: true }}
            trustAllCerts={false}
            onError={error => console.log('PDF Render Hatası:', error)}
          />
        )}
      </Page>
      <View
        className="w-full flex-row bg-backgroundColor dark:bg-dark-backgroundColor"
        style={{ gap: wp(3), paddingHorizontal: wp(5), paddingBottom: wp(5) }}
      >
        <Button
          type="success"
          handleSubmit={handleShare}
          style={{ flex: 1 }}
          text={t('share')}
          isDisabled={!localPath}
        />
        <Button
          handleSubmit={handleDownload}
          style={{ flex: 1 }}
          text={t('download')}
        />
      </View>
    </View>
  );
}
