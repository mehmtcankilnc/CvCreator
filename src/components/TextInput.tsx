/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  TextInputProps,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  handleChangeText: (text: string) => void;
  value: string | undefined;
  placeholder: string;
  type?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  multiline?: boolean;
};

export default function TextInput({
  handleChangeText,
  value,
  placeholder,
  type = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<RNTextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  const inputHeight = wp(12);
  const mainPadding = wp(4);

  const initialFontSize = wp(4);
  const finalFontSize = wp(3);

  // const initialLineHeight = initialFontSize + 4;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, value]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  return (
    <View style={{ minHeight: inputHeight }}>
      <RNTextInput
        ref={inputRef}
        className={`border ${isFocused ? 'border-main' : 'border-borderColor'}`}
        style={{
          minHeight: inputHeight,
          color: 'black',
          paddingLeft: mainPadding,
          paddingRight: mainPadding,
          borderRadius: wp(2),
          fontSize: initialFontSize,
          textAlignVertical: multiline ? 'top' : 'center',
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        value={value}
        autoCapitalize={autoCapitalize}
        keyboardType={type}
        multiline={multiline}
      />
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          className="absolute bg-white px-1"
          style={{
            top: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [
                (inputHeight - initialFontSize * 1.2) / 2,
                -initialFontSize * 0.4,
              ],
            }),
            left: focusAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [mainPadding, mainPadding - 1],
            }),
          }}
        >
          <Animated.Text
            className={`${isFocused ? 'color-main' : 'color-borderColor'}`}
            style={{
              fontSize: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [initialFontSize, finalFontSize],
              }),
              lineHeight: focusAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [initialFontSize * 1.2, finalFontSize],
              }),
            }}
          >
            {placeholder}
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}
