/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeBottomSheet,
  openBottomSheet,
} from '../store/slices/bottomSheetSlice';
import {
  DeleteResumeById,
  DownloadResumeById,
  GetMyResumeById,
} from '../services/ResumeServices';
import {
  DeleteCoverLetterById,
  DownloadCoverLetterById,
  GetMyCoverLetterById,
} from '../services/CoverLetterServices';
import Alert from './Alert';
import { useTranslation } from 'react-i18next';

export type FileRespModel = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  navigation: any;
  file: FileRespModel;
  type: 'resumes' | 'coverletters';
  fetchFunc: () => void;
};

export default function MyFileCard({
  navigation,
  file,
  type,
  fetchFunc,
}: Props) {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  const iconColor = theme === 'LIGHT' ? '#585858' : '#D4D4D4';

  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleOpenPress = () => {
    dispatch(
      openBottomSheet({
        type: 'FILE_SETTINGS',
        props: {
          onShow: handleShow,
          onEdit: handleEdit,
          onDelete: () => {
            setAlertVisible(true);
            setAlert({
              type: 'failure',
              title: t('are-you-sure'),
              desc: t('file-delete-alert-text'),
              onPress: handleDelete,
            });
          },
        },
      }),
    );
  };

  const handleShow = async () => {
    if (type === 'resumes') {
      const resume = await GetMyResumeById(file.id);

      if (resume) {
        dispatch(closeBottomSheet());
        navigation.navigate('FileViewer', {
          url: resume.url,
          file: file,
          type: type,
        });
      }
    } else {
      const coverLetter = await GetMyCoverLetterById(file.id);

      if (coverLetter) {
        dispatch(closeBottomSheet());
        navigation.navigate('FileViewer', {
          url: coverLetter.url,
          file: file,
          type: type,
        });
      }
    }
  };

  const handleEdit = async () => {
    if (type === 'resumes') {
      const resume = await GetMyResumeById(file.id);

      if (resume) {
        dispatch(closeBottomSheet());
        navigation.navigate('CreateResume', {
          formValues: resume.formValues.resumeFormValues,
          resumeId: resume.formValues.id,
        });
      }
    } else {
      const coverLetter = await GetMyCoverLetterById(file.id);

      if (coverLetter) {
        dispatch(closeBottomSheet());
        navigation.navigate('CreateCoverLetter', {
          formValues: coverLetter.formValues.coverLetterFormValues,
          coverLetterId: coverLetter.formValues.id,
        });
      }
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    if (type === 'coverletters') {
      const coverLetterDeleted = await DeleteCoverLetterById(file.id);

      if (coverLetterDeleted) {
        setIsLoading(false);
        dispatch(closeBottomSheet());
        fetchFunc();
      }
    } else {
      const resumeDeleted = await DeleteResumeById(file.id);

      if (resumeDeleted) {
        setIsLoading(false);
        dispatch(closeBottomSheet());
        fetchFunc();
      }
    }
  };

  const handleDownload = async () => {
    if (type === 'coverletters') {
      await DownloadCoverLetterById(file.id, file.name);
    } else {
      await DownloadResumeById(file.id, file.name);
    }
  };

  return (
    <View
      className="bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md border border-blue-100 dark:border-blue-800/30"
      style={{
        height: wp(60),
        borderRadius: wp(3),
      }}
    >
      {/** İkon - Dosya ismi - Seçenekler */}
      <View
        className="flex-row items-center justify-between border-b border-b-borderColor dark:border-b-dark-borderColor"
        style={{ padding: wp(5) }}
      >
        <View className="flex-row items-center" style={{ gap: wp(3) }}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color="#1810C2"
            style={{
              backgroundColor: theme === 'LIGHT' ? '#DCDBF6' : '#D4D4D4',
              padding: wp(1),
              borderRadius: wp(2),
            }}
          />
          <Text
            className="color-black dark:color-dark-textColor"
            style={{ fontWeight: '600', fontSize: wp(5) }}
          >
            {file.name}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={iconColor}
          onPress={handleOpenPress}
        />
      </View>
      {/** Tarih bilgileri */}
      <View
        className="border-b border-b-borderColor dark:border-b-dark-borderColor"
        style={{ padding: wp(5), gap: wp(3) }}
      >
        <View className="flex-row items-center justify-between">
          <Text
            className="color-textColor dark:color-dark-textColor"
            style={{ fontWeight: '500', fontSize: wp(4) }}
          >
            {t('created-at')}:{' '}
          </Text>
          <Text
            className="color-textColor dark:color-dark-textColor"
            style={{ fontWeight: '500', fontSize: wp(4) }}
          >
            {new Date(file.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            className="color-textColor dark:color-dark-textColor"
            style={{ fontWeight: '500', fontSize: wp(4) }}
          >
            {t('updated-at')}:{' '}
          </Text>
          <Text
            className="color-textColor dark:color-dark-textColor"
            style={{ fontWeight: '500', fontSize: wp(4) }}
          >
            {new Date(file.updatedAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      {/** İndirme butonu */}
      <View
        className="w-full"
        style={{ paddingHorizontal: wp(5), paddingTop: wp(2.5) }}
      >
        <Button text={t('download-as-pdf')} handleSubmit={handleDownload} />
      </View>
      {alertVisible && (
        <Alert
          visible={alertVisible}
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={alert.onPress}
          onDismiss={() => setAlertVisible(false)}
          isLoading={isLoading}
        />
      )}
    </View>
  );
}
