/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  closeBottomSheet,
  openBottomSheet,
} from '../store/slices/bottomSheetSlice';
import { downloadPDF } from '../utilities/downloadPDF';
import { GetMyResumeById } from '../services/ResumeServices';
import { GetMyCoverLetterById } from '../services/CoverLetterServices';

export type FileRespModel = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  storagePath: string;
};

type Props = {
  navigation: any;
  file: FileRespModel;
  type: 'resumes' | 'coverletters';
};

export default function MyFileCard({ navigation, file, type }: Props) {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  const iconColor = theme === 'LIGHT' ? '#585858' : '#D4D4D4';

  const handleOpenPress = () => {
    dispatch(
      openBottomSheet({
        type: 'FILE_SETTINGS',
        props: {
          onShow: handleShow,
          onEdit: handleEdit,
          onDelete: handleDelete,
        },
      }),
    );
  };

  const handleShow = async () => {
    if (type === 'resumes') {
      const resumeUrl = await GetMyResumeById(file.id);

      if (resumeUrl) {
        dispatch(closeBottomSheet());
        navigation.navigate('FileViewer', {
          url: resumeUrl,
          file: file,
          type: type,
        });
      }
    } else {
      const coverLetterUrl = await GetMyCoverLetterById(file.id);

      if (coverLetterUrl) {
        dispatch(closeBottomSheet());
        navigation.navigate('FileViewer', { url: coverLetterUrl });
      }
    }
  };

  const handleEdit = async () => {
    console.log('edit');
  };
  const handleDelete = async () => {
    console.log('delete');
  };

  const handleDownload = async () => {
    await downloadPDF(file.storagePath, file.name, type);
  };

  return (
    <View
      className="bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md"
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
            Created:{' '}
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
            Last Updated:{' '}
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
        <Button text="Download as PDF" handleSubmit={handleDownload} />
      </View>
    </View>
  );
}
