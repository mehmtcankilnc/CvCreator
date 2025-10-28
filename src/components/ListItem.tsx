/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  index: number;
  title: string;
};

export default function ListItem({ index, title }: Props) {
  return (
    <View
      className="flex-row items-center justify-between w-full bg-[#fefefe] elevation-md"
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
              fontWeight: '600',
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
            fontSize: wp(4),
            fontWeight: '600',
            color: '#585858',
          }}
        >
          {title}
        </Text>
      </View>
      {/** Aksiyonlar */}
      <MaterialCommunityIcons name="dots-vertical" size={24} color="#585858" />
    </View>
  );
}
