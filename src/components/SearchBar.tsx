/* eslint-disable react-native/no-inline-styles */
import { View } from 'react-native';
import React from 'react';
import TextInput from './TextInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

type Props = {
  searchText: string;
  setSearchText: (text: string) => void;
};

export default function SearchBar({ searchText, setSearchText }: Props) {
  const { t } = useTranslation();
  return (
    <View className="w-full">
      <TextInput
        handleChangeText={setSearchText}
        value={searchText}
        placeholder={t('search')}
        rightIcon={
          <MaterialCommunityIcons
            style={{ position: 'absolute', right: wp(2), top: wp(2) }}
            name="magnify"
            size={wp(8)}
            color="#1954E5"
          />
        }
        autoCapitalize="none"
      />
    </View>
  );
}
