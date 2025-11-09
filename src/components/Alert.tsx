/* eslint-disable react-native/no-inline-styles */
import { View, Text, Modal, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import { useAppSelector } from '../store/hooks';

type Props = {
  visible: boolean;
  title: string;
  desc: string;
  type: string;
  onPress: () => void;
  isLoading?: boolean;
};

export default function Alert({
  visible,
  title,
  desc,
  type,
  onPress,
  isLoading,
}: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const mainColor =
    type === 'failure' ? '#C21D10' : type === 'inform' ? '#1954E5' : '#C2A510';
  const secondaryColor =
    type === 'failure' ? '#F3D2D6' : type === 'inform' ? '#D1DDFB' : '#F2EDD0';
  const darkSecColor =
    type === 'failure' ? '#50211E' : type === 'inform' ? '#1F1E39' : '#58512B';
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
          className="bg-backgroundColor dark:bg-dark-backgroundColor rounded-2xl shadow-lg"
          style={{ width: wp(85), padding: wp(5), gap: wp(4) }}
        >
          <View className="items-center justify-center">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{
                backgroundColor:
                  theme === 'LIGHT' ? secondaryColor : darkSecColor,
              }}
            >
              <Ionicons name={iconName} size={wp(10)} color={mainColor} />
            </View>
          </View>
          <View style={{ gap: wp(2) }}>
            <Text
              className="text-center text-xl text-textColor dark:text-dark-textColor"
              style={{ fontFamily: 'Kavoon-Regular' }}
            >
              {title}
            </Text>
            <Text className="text-center text-base text-gray-600 dark:text-gray-400">
              {desc}
            </Text>
          </View>
          <View>
            <Button
              handleSubmit={onPress}
              text="Continue"
              type={
                type === 'failure'
                  ? 'delete'
                  : type === 'inform'
                  ? 'forward'
                  : 'success'
              }
              isLoading={isLoading}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
