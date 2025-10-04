/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  index: number;
  title: string;
};

export default function ListItem({ index, title }: Props) {
  return (
    <View
      className="flex-row items-center justify-between border border-borderColor w-full"
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
          style={{
            padding: wp(1),
            backgroundColor: '#1810C2',
            borderRadius: 9999,
            width: wp(8),
            height: wp(8),
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Kavoon-Regular',
              color: 'white',
              fontSize: wp(4),
            }}
          >
            {index}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            flexShrink: 1,
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(4),
            color: '#585858',
          }}
        >
          {title}
        </Text>
      </View>
      {/** Aksiyonlar */}
      <View
        style={{
          gap: wp(2),
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Feather name="search" size={wp(6)} color="#1810C2" />
        <Feather name="edit" size={wp(6)} color="#C2A510" />
        <Feather name="trash-2" size={wp(6)} color="#C21D10" />
      </View>
    </View>
  );
}
