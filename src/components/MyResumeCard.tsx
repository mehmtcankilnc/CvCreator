/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from './Button';
import { useAppDispatch } from '../store/hooks';
import { openBottomSheet } from '../store/slices/bottomSheetSlice';

export type ResumeRespModel = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  storagePath: string;
};

type Props = {
  resume: ResumeRespModel;
};

export default function MyResumeCard({ resume }: Props) {
  const dispatch = useAppDispatch();

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
    console.log('show');
  };
  const handleEdit = async () => {
    console.log('edit');
  };
  const handleDelete = async () => {
    console.log('delete');
  };

  const handleDownload = async () => {
    console.log('download');
  };

  return (
    <View
      className="bg-[#fefefe] elevation-md"
      style={{
        height: wp(60),
        borderRadius: wp(3),
      }}
    >
      {/** İkon - Dosya ismi - Seçenekler */}
      <View
        className="flex-row items-center justify-between border-b border-b-borderColor"
        style={{ padding: wp(5) }}
      >
        <View className="flex-row items-center" style={{ gap: wp(3) }}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={24}
            color="#1810C2"
            style={{
              backgroundColor: '#DCDBF6',
              padding: wp(1),
              borderRadius: wp(2),
            }}
          />
          <Text style={{ fontWeight: '600', color: 'black', fontSize: wp(5) }}>
            {resume.name}
          </Text>
        </View>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color="#585858"
          onPress={handleOpenPress}
        />
      </View>
      {/** Tarih bilgileri */}
      <View
        className="border-b border-b-borderColor"
        style={{ padding: wp(5), gap: wp(3) }}
      >
        <View className="flex-row items-center justify-between">
          <Text
            style={{ fontWeight: '500', color: '#585858', fontSize: wp(4) }}
          >
            Created:{' '}
          </Text>
          <Text
            style={{ fontWeight: '500', color: '#585858', fontSize: wp(4) }}
          >
            {new Date(resume.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <Text
            style={{ fontWeight: '500', color: '#585858', fontSize: wp(4) }}
          >
            Last Updated:{' '}
          </Text>
          <Text
            style={{ fontWeight: '500', color: '#585858', fontSize: wp(4) }}
          >
            {new Date(resume.updatedAt).toLocaleDateString()}
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
