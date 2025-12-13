/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import Pdf from 'react-native-pdf';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import { useAppSelector } from '../store/hooks';
import { shareRemotePdf } from '../utilities/shareFile';
import { DownloadCoverLetterById } from '../services/CoverLetterServices';
import { DownloadResumeById } from '../services/ResumeServices';

type Props = {
  navigation: any;
  route: any;
};

export default function FileViewer({ navigation, route }: Props) {
  const { url, file, type } = route.params;
  const theme = useAppSelector(state => state.theme.theme);

  const handleDownload = async () => {
    if (type === 'coverletters') {
      await DownloadCoverLetterById(file.id, file.name);
    } else {
      await DownloadResumeById(file.id, file.name);
    }
  };

  const handleShare = async () => {
    await shareRemotePdf(url, file.name || 'file.pdf');
  };

  return (
    <View className="flex-1">
      <Header
        handlePress={() => navigation.goBack()}
        iconName="chevron-back"
        title="File Viewer"
      />
      <Page>
        <Pdf
          style={{
            width: wp(90),
            height: hp(65),
            backgroundColor: theme === 'DARK' ? '#0F181F' : '#ffffff',
            elevation: 8,
          }}
          source={{ uri: url, cache: true }}
          trustAllCerts={false}
          renderActivityIndicator={() => (
            <ActivityIndicator color="#1954E5" size="large" />
          )}
        />
      </Page>
      <View
        className="w-full flex-row bg-backgroundColor dark:bg-dark-backgroundColor"
        style={{ gap: wp(3), paddingHorizontal: wp(5), paddingBottom: wp(5) }}
      >
        <Button
          type="success"
          handleSubmit={handleShare}
          style={{ flex: 1 }}
          text="Share"
        />
        <Button
          handleSubmit={handleDownload}
          style={{ flex: 1 }}
          text="Download"
        />
      </View>
    </View>
  );
}
