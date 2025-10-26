/* eslint-disable react-native/no-inline-styles */
import { Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  handleSubmit: () => void;
  text: string;
  type?: 'forward' | 'back' | 'delete' | 'success';
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  handleSubmit,
  text,
  type = 'forward',
  isDisabled = false,
  style,
}: Props) {
  return (
    <Pressable
      disabled={isDisabled}
      className={`w-full items-center justify-center ${
        type === 'back'
          ? 'border border-borderColor bg-white'
          : type === 'delete'
          ? 'bg-rejectColor'
          : type === 'success'
          ? 'bg-confirmColor'
          : 'bg-main'
      } ${isDisabled ? 'opacity-50' : ''}`}
      style={[{ height: wp(12), borderRadius: wp(2) }, style]}
      onPress={handleSubmit}
    >
      <Text
        style={{
          fontFamily: 'Kavoon-Regular',
          fontSize: wp(4),
          color: type === 'back' ? '#585858' : 'white',
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
