/* eslint-disable react-native/no-inline-styles */
import { View, Text, Modal, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';

type Props = {
  visible: boolean;
  title: string;
  desc: string;
  type: string;
  onPress: () => void;
};

export default function Alert({ visible, title, desc, type, onPress }: Props) {
  const mainColor =
    type === 'failure' ? '#C21D10' : type === 'inform' ? '#1810C2' : '#C2A510';
  const secondaryColor =
    type === 'failure' ? '#F3D2D6' : type === 'inform' ? '#D1D0F3' : '#F2EDD0';
  const iconName =
    type === 'failure'
      ? 'close-circle'
      : type === 'inform'
      ? 'information-circle'
      : 'checkmark-circle';

  return (
    <Modal
      visible={visible}
      onRequestClose={onPress}
      transparent
      animationType="fade"
    >
      <Pressable
        onPress={onPress}
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Pressable
          className="bg-white rounded-2xl shadow-lg"
          style={{ width: wp(85), padding: wp(5), gap: wp(4) }}
        >
          <View className="items-center justify-center">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{ backgroundColor: secondaryColor }}
            >
              <Ionicons name={iconName} size={wp(10)} color={mainColor} />
            </View>
          </View>
          <View style={{ gap: wp(2) }}>
            <Text
              className="text-center text-xl text-gray-800"
              style={{ fontFamily: 'Kavoon-Regular' }}
            >
              {title}
            </Text>
            <Text className="text-center text-base text-gray-600">{desc}</Text>
          </View>
          <View>
            <Button
              handleSubmit={onPress}
              text="Tamam"
              type={
                type === 'failure'
                  ? 'delete'
                  : type === 'inform'
                  ? 'forward'
                  : 'success'
              }
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
