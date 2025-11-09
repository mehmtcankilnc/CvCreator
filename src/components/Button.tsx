/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  Pressable,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  handleSubmit: () => void;
  text: string;
  type?: 'forward' | 'back' | 'delete' | 'success';
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Button({
  handleSubmit,
  text,
  type = 'forward',
  isDisabled = false,
  isLoading = false,
  style,
}: Props) {
  return (
    <Pressable
      disabled={isDisabled || isLoading}
      className={`w-full items-center justify-center ${
        type === 'back'
          ? 'border border-borderColor dark:border-transparent bg-white dark:bg-dark-secondaryBackground'
          : type === 'delete'
          ? 'bg-rejectColor'
          : type === 'success'
          ? 'bg-confirmColor'
          : 'bg-main'
      } ${isDisabled || isLoading ? 'opacity-50' : ''}`}
      style={[{ height: wp(12), borderRadius: wp(2) }, style]}
      onPress={handleSubmit}
    >
      {isLoading ? (
        <ActivityIndicator color={type === 'back' ? '#585858' : 'white'} />
      ) : (
        <Text
          className={`${
            type === 'back' ? 'color-[#585858]' : 'color-white'
          } dark:color-dark-textColor`}
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(4),
          }}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
}
