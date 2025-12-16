/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../store/hooks';
import { useTranslation } from 'react-i18next';

interface Props {
  onShow: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function FileSettingsContent({
  onShow,
  onEdit,
  onDelete,
}: Props) {
  const { t } = useTranslation();

  const { theme } = useAppSelector(state => state.theme);

  const iconColor = theme === 'LIGHT' ? '#585858' : '#D9D9D9';

  return (
    <View style={{ gap: wp(3), padding: wp(5), paddingBottom: wp(15) }}>
      <Pressable
        onPress={onShow}
        className="flex-row items-center"
        style={{ gap: wp(3) }}
      >
        <MaterialCommunityIcons name="magnify" size={wp(8)} color={iconColor} />
        <Text
          className="text-textColor dark:text-dark-textColor"
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(5),
            fontWeight: '600',
          }}
        >
          {t('show')}
        </Text>
      </Pressable>
      <View className="border-b w-full border-b-borderColor dark:border-b-dark-borderColor" />
      <Pressable
        onPress={onEdit}
        className="flex-row items-center"
        style={{ gap: wp(3) }}
      >
        <MaterialCommunityIcons
          name="file-edit-outline"
          size={wp(8)}
          color={iconColor}
        />
        <Text
          className="text-textColor dark:text-dark-textColor"
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(5),
            fontWeight: '600',
          }}
        >
          {t('edit')}
        </Text>
      </Pressable>
      <View className="border-b w-full border-b-borderColor dark:border-b-dark-borderColor" />
      <Pressable
        onPress={onDelete}
        className="flex-row items-center"
        style={{ gap: wp(3) }}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={wp(8)}
          color={iconColor}
        />
        <Text
          className="text-textColor dark:text-dark-textColor"
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(5),
            fontWeight: '600',
          }}
        >
          {t('delete')}
        </Text>
      </Pressable>
    </View>
  );
}
