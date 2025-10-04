/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

type Props = {
  handlePress: () => void;
};

export default function Header({ handlePress }: Props) {
  return (
    <View
      className="flex-row bg-main items-center justify-center"
      style={{ height: hp(13), paddingHorizontal: wp(3) }}
    >
      <Ionicons
        name="menu"
        color="white"
        size={hp(4)}
        style={{ left: wp(3), position: 'absolute' }}
        onPress={handlePress}
      />
      <Text
        style={{
          fontSize: hp(4),
          color: 'white',
          fontFamily: 'Kavoon-Regular',
          lineHeight: hp(3),
        }}
      >
        Cv Creator
      </Text>
    </View>
  );
}
