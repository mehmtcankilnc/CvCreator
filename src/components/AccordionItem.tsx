/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, Platform, UIManager } from 'react-native';
import React, { ReactNode } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type AccordionItemProps = {
  isActive: boolean;
  onToggle: () => void;
  title: string;
  children: ReactNode;
};

export default function AccordionItem({
  isActive,
  onToggle,
  title,
  children,
}: AccordionItemProps) {
  const contentHeight = useSharedValue(0);

  const heightAnimationStyle = useAnimatedStyle(() => ({
    height: isActive ? withTiming(contentHeight.value) : withTiming(0),
  }));

  return (
    <View className="w-full border border-borderColor rounded-xl overflow-hidden">
      <Pressable
        onPress={onToggle}
        className="flex-row items-center justify-between w-full"
        style={{ paddingHorizontal: wp(5), paddingVertical: wp(3) }}
      >
        <Text
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(4),
            color: '#585858',
          }}
        >
          {title}
        </Text>
        <Ionicons
          name={isActive ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#585858"
        />
      </Pressable>
      <Animated.View style={heightAnimationStyle}>
        <Animated.View
          onLayout={event => {
            contentHeight.value = event.nativeEvent.layout.height;
          }}
          style={{
            position: 'absolute',
            width: '100%',
            padding: wp(5),
            gap: wp(3),
          }}
        >
          {children}
        </Animated.View>
      </Animated.View>
    </View>
  );
}
