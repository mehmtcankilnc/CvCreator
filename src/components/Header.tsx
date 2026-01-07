/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useAppSelector } from '../store/hooks';

type Props = {
  handlePress: () => void;
  iconName?: string;
  title?: string;
};

export default function Header({ handlePress, iconName, title }: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const iconColor = theme === 'LIGHT' ? 'white' : '#D9D9D9';

  return (
    <View
      className="flex-row bg-main items-center justify-center"
      style={{ height: hp(13), paddingHorizontal: wp(3) }}
    >
      <Ionicons
        name={iconName || 'menu'}
        size={hp(4)}
        color={iconColor}
        style={{ left: wp(3), position: 'absolute' }}
        onPress={handlePress}
      />
      <Text
        className="text-white dark:text-dark-textColor"
        style={{
          fontSize: hp(3),
          fontFamily: 'InriaSerif-Bold',
          lineHeight: hp(3.5),
        }}
        numberOfLines={1}
      >
        {title || 'Cv Creator'}
      </Text>
    </View>
  );
}
