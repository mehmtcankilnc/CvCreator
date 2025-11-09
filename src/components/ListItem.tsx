/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { openBottomSheet } from '../store/slices/bottomSheetSlice';

type Props = {
  index: number;
  title: string;
};

export default function ListItem({ index, title }: Props) {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);

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

  const iconColor = theme === 'LIGHT' ? '#585858' : '#D9D9D9';

  return (
    <View
      className="flex-row items-center justify-between w-full bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md"
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
          className="color-textColor dark:color-dark-textColor"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            flexShrink: 1,
            fontSize: wp(4),
            fontWeight: '600',
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
    </View>
  );
}
