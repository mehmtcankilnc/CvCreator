import { Pressable, Text } from 'react-native';
import React from 'react';

type Props = {
  text: string;
  handlePress: () => void | Promise<void>;
  disabled?: boolean;
  width: number;
};

export default function Button({ text, handlePress, disabled, width }: Props) {
  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className="justify-center items-center bg-main p-all rounded-all"
      style={{
        width: width,
      }}
    >
      <Text className="color-white font-medium text-lg">{text}</Text>
    </Pressable>
  );
}
