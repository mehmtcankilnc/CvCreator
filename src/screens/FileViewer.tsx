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
import { AuthResponse, useAuth } from '../context/AuthContext';
import RNFetchBlob from 'react-native-blob-util';
import Share from 'react-native-share';
import { DownloadCoverLetterById } from '../services/CoverLetterServices';
import { DownloadResumeById } from '../services/ResumeServices';
import { storageService } from '../utilities/tokenStorage';
import { API_BASE_URL } from '@env';

interface DownloadArgs {
  customToken?: string | null;
  isRetry?: boolean;
}

export default function FileViewer({ navigation, route }: any) {
  const { t } = useTranslation();
  const { token, logout } = useAuth();

  const { url, file, type } = route.params;
  const theme = useAppSelector(state => state.theme.theme);

  const [accessToken, setAccessToken] = useState<string | null>(token);
  const [localPath, setLocalPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) setAccessToken(token);
  }, [token]);

  useEffect(() => {
    downloadFileToCache({ customToken: accessToken, isRetry: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const downloadFileToCache = async ({
    customToken = null,
    isRetry = false,
  }: DownloadArgs) => {
    const currentToken = customToken || accessToken;

    if (!url || !currentToken) return;

    if (!isRetry) setIsLoading(true);

    try {
      const { fs, config } = RNFetchBlob;
      const cachePath = `${fs.dirs.CacheDir}/${file.name || 'temp_file'}.pdf`;

      const res = await config({
        fileCache: true,
        path: cachePath,
      }).fetch('GET', url, {
        Authorization: `Bearer ${currentToken}`,
      });

      const status = res.info().status;

      if (status === 200) {
        setLocalPath(res.path());
        if (!isRetry) setIsLoading(false);
      } else if (status === 401) {
        if (!isRetry) {
          const newToken = await refreshAccessToken();

          if (newToken) {
            return await downloadFileToCache({
              customToken: newToken,
              isRetry: true,
            });
          } else {
            setIsLoading(false);
            await logout();
          }
        } else {
          setIsLoading(false);
        }
      } else {
        console.log('Sunucu Hatası:', status);
        fs.unlink(res.path()).catch(() => {});
        setIsLoading(false);
      }
    } catch (error) {
      console.error('İndirme Hatası:', error);
      setIsLoading(false);
    }
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const currentAccessToken = await storageService.getAccessToken();
      const currentRefreshToken = await storageService.getRefreshToken();

      if (!currentAccessToken || !currentRefreshToken) return null;

      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accessToken: currentAccessToken,
          refreshToken: currentRefreshToken,
        }),
      });

      if (!response.ok) throw new Error('Refresh Başarısız Oldu');

      const data: AuthResponse = await response.json();

      await storageService.setAccessToken(data.accessToken);
      if (data.refreshToken)
        await storageService.setRefreshToken(data.refreshToken);

      setAccessToken(data.accessToken);
      return data.accessToken;
    } catch (error) {
      console.error('Token Yenilenemedi: ', error);
      return null;
    }
  };

  const handleDownload = async () => {
    if (type === 'coverletters') {
      await DownloadCoverLetterById(file.id, file.name, accessToken);
    } else {
      await DownloadResumeById(file.id, file.name, accessToken);
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
