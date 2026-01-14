/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeBottomSheet,
  openBottomSheet,
} from '../store/slices/bottomSheetSlice';
import { FileRespModel } from './MyFileCard';
import { DeleteResumeById, GetMyResumeById } from '../services/ResumeServices';
import {
  DeleteCoverLetterById,
  GetMyCoverLetterById,
} from '../services/CoverLetterServices';
import Alert from './Alert';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';

type Props = {
  navigation: any;
  index: number;
  title: string;
  file: FileRespModel;
  type: 'resumes' | 'coverletters';
  fetchFunc: () => void;
};

export default function ListItem({
  navigation,
  index,
  title,
  file,
  type,
  fetchFunc,
}: Props) {
  const { t } = useTranslation();
  const { authenticatedFetch } = useAuth();

  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);

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
      const resume = await GetMyResumeById(authenticatedFetch, file.id);

      if (resume) {
        dispatch(closeBottomSheet());
        navigation.navigate('FileViewer', {
          url: resume.url,
          file: file,
          type: type,
        });
      }
    } else {
      const coverLetter = await GetMyCoverLetterById(
        authenticatedFetch,
        file.id,
      );

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
      const resume = await GetMyResumeById(authenticatedFetch, file.id);

      if (resume) {
        dispatch(closeBottomSheet());
        navigation.navigate('CreateResume', {
          formValues: resume.formValues.resumeFormValues,
          resumeId: resume.formValues.id,
        });
      }
    } else {
      const coverLetter = await GetMyCoverLetterById(
        authenticatedFetch,
        file.id,
      );

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
      const isCoverLetterDeleted = await DeleteCoverLetterById(
        authenticatedFetch,
        file.id,
      );

      if (isCoverLetterDeleted) {
        setIsLoading(false);
        dispatch(closeBottomSheet());
        fetchFunc();
      }
    } else {
      const isResumeDeleted = await DeleteResumeById(
        authenticatedFetch,
        file.id,
      );

      if (isResumeDeleted) {
        setIsLoading(false);
        dispatch(closeBottomSheet());
        fetchFunc();
      }
    }
  };

  const iconColor = theme === 'LIGHT' ? '#585858' : '#D9D9D9';

  return (
    <View
      className="flex-row items-center justify-between w-full bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md border border-blue-100 dark:border-blue-800/30"
      style={{ borderRadius: wp(2), padding: wp(2) }}
    >
      {/** Sayı? ve İsim? */}
      <View
        className="flex-1"
        style={{
          gap: wp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          className="bg-main"
          style={{
            padding: wp(1),
            borderRadius: 9999,
            width: wp(8),
            height: wp(8),
          }}
        >
          <Text
            className="color-dark-textColor"
            style={{
              textAlign: 'center',
              fontWeight: '600',
              fontSize: wp(4),
            }}
          >
            {index}
          </Text>
        </View>
        <Text
          className="color-textColor dark:color-dark-textColor font-inriaBold"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            flexShrink: 1,
            fontSize: wp(4),
          }}
        >
          {title}
        </Text>
      </View>
      {/** Aksiyonlar */}
      <MaterialCommunityIcons
        name="dots-vertical"
        size={24}
        color={iconColor}
        onPress={handleOpenPress}
      />
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
