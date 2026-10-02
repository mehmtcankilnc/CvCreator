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
import Share from 'react-native-share';
import { GetCoverLetterPdfById } from '../services/CoverLetterServices';
import { GetResumePdfById } from '../services/ResumeServices';
import Alert from '../components/Alert';
import { notifyDownloadComplete } from '../utilities/downloadNotification';
import { saveToDownloads } from '../utilities/downloadFile';

export default function FileViewer({ navigation, route }: any) {
  const { t } = useTranslation();

  const { file, type } = route.params;
  const theme = useAppSelector(state => state.theme.theme);

  const [localPath, setLocalPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<{
    type: string;
    title: string;
    desc: string;
  } | null>(null);

  useEffect(() => {
    let isActive = true;

    const generateFile = async () => {
      setIsLoading(true);
      try {
        const pdf =
          type === 'coverletters'
            ? await GetCoverLetterPdfById(file.id)
            : await GetResumePdfById(file.id);

        if (isActive && pdf) {
          setLocalPath(pdf.path);
        }
      } catch (error) {
        console.error('PDF oluşturma hatası:', error);
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    generateFile();

    return () => {
      isActive = false;
    };
  }, [file.id, type]);

  const handleDownload = async () => {
    if (!localPath) return;

    try {
      const result = await saveToDownloads(localPath, file.name);
      if (result === 'saved') {
        notifyDownloadComplete(
          t('download-success-title'),
          file.name,
          localPath,
        );
        setAlert({
          type: 'success',
          title: t('download-success-title'),
          desc: t('download-success-text'),
        });
      } else if (result === 'denied') {
        setAlert({
          type: 'failure',
          title: t('download-failed-title'),
          desc: t('download-permission-text'),
        });
      }
    } catch (error) {
      console.error('İndirme hatası:', error);
      setAlert({
        type: 'failure',
        title: t('download-failed-title'),
        desc: t('download-failed-text'),
      });
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
          isDisabled={!localPath}
        />
      </View>
      {alert && (
        <Alert
          visible
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={() => setAlert(null)}
          onDismiss={() => setAlert(null)}
        />
      )}
    </View>
  );
}
