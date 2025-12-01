/* eslint-disable react-native/no-inline-styles */
import React, { ReactNode, useEffect, useRef, useState } from 'react';
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
import { useAppSelector } from '../store/hooks';

type Props = {
  handleChangeText: (text: string) => void;
  value: string | undefined;
  placeholder: string;
  type?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  multiline?: boolean;
  rightIcon?: ReactNode;
  onRightIconPress?: () => void;
};

export default function TextInput({
  handleChangeText,
  value,
  placeholder,
  type = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  rightIcon,
  onRightIconPress,
}: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const inputColor = theme === 'LIGHT' ? 'black' : '#D9D9D9';

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

  const handleRightIconPress = () => {
    if (onRightIconPress) {
      inputRef.current?.blur();
      onRightIconPress();
    }
  };
  return (
    <View style={{ minHeight: inputHeight }}>
      <RNTextInput
        ref={inputRef}
        className={`border ${
          isFocused
            ? 'border-main'
            : 'border-borderColor dark:border-dark-borderColor'
        }`}
        style={{
          minHeight: inputHeight,
          color: inputColor,
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
      {rightIcon &&
        React.cloneElement(rightIcon as React.ReactElement<any>, {
          onPress: handleRightIconPress,
        })}
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          className="absolute bg-backgroundColor dark:bg-dark-backgroundColor px-1"
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
            numberOfLines={1}
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
