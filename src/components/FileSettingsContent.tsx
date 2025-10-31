/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  return (
    <View style={{ gap: wp(3), padding: wp(5), paddingBottom: wp(15) }}>
      <Pressable
        onPress={onShow}
        className="flex-row items-center"
        style={{ gap: wp(3) }}
      >
        <MaterialCommunityIcons name="magnify" size={wp(8)} color="#585858" />
        <Text
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(5),
            fontWeight: '600',
            color: '#585858',
          }}
        >
          Show
        </Text>
      </Pressable>
      <View className="border-b w-full border-b-borderColor" />
      <Pressable
        onPress={onEdit}
        className="flex-row items-center"
        style={{ gap: wp(3) }}
      >
        <MaterialCommunityIcons
          name="file-edit-outline"
          size={wp(8)}
          color="#585858"
        />
        <Text
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(5),
            fontWeight: '600',
            color: '#585858',
          }}
        >
          Edit
        </Text>
      </Pressable>
      <View className="border-b w-full border-b-borderColor" />
      <Pressable
        onPress={onDelete}
        className="flex-row items-center"
        style={{ gap: wp(3) }}
      >
        <MaterialCommunityIcons
          name="delete-outline"
          size={wp(8)}
          color="#585858"
        />
        <Text
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(5),
            fontWeight: '600',
            color: '#585858',
          }}
        >
          Delete
        </Text>
      </Pressable>
    </View>
  );
}
