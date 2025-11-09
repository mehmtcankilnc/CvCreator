/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native';
import React, { Children, ReactNode, useEffect, useRef } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../store/hooks';

type Props = {
  children: ReactNode;
  currentStep: number;
  onStepPress: (step: number) => void;
};

export default function MultiStepForm({
  children,
  currentStep,
  onStepPress,
}: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const inActiveColor = theme === 'LIGHT' ? '#D4D4D4' : '#5D5D5D';
  const textColor = theme === 'LIGHT' ? 'white' : '#D9D9D9';

  const steps = Children.toArray(children);
  const active = steps[currentStep - 1] ?? null;
  const flatListRef = useRef<FlatList>(null);

  const screenWidth = Dimensions.get('window').width;
  const stepIndicatorWidth = wp(10);
  const separatorWidth = wp(8) + wp(2) * 2;
  const itemWidth = stepIndicatorWidth + separatorWidth;

  useEffect(() => {
    if (flatListRef.current) {
      const activeIndex = currentStep - 1;
      const offset = activeIndex * itemWidth - screenWidth / 2 + itemWidth / 2;

      flatListRef.current.scrollToOffset({
        offset: Math.max(0, offset),
        animated: true,
      });
    }
  }, [currentStep, itemWidth, screenWidth]);

  const getItemLayout = (_: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  return (
    <View className="w-full gap-10">
      <FlatList
        ref={flatListRef}
        data={steps}
        horizontal
        initialScrollIndex={0}
        getItemLayout={getItemLayout}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ index }) => (
          <View style={styles.stepWrapper}>
            <Pressable onPress={() => onStepPress(index + 1)}>
              <StepIndicator
                index={index}
                currentStep={currentStep}
                inActiveColor={inActiveColor}
                textColor={textColor}
              />
            </Pressable>
            {index < steps.length - 1 && (
              <Separator
                index={index}
                currentStep={currentStep}
                inActiveColor={inActiveColor}
              />
            )}
          </View>
        )}
        contentContainerStyle={styles.listContentContainer}
        style={styles.list}
      />
      <View className="w-full">{active}</View>
    </View>
  );
}

const StepIndicator = ({
  index,
  currentStep,
  inActiveColor,
  textColor,
}: {
  index: number;
  currentStep: number;
  inActiveColor: string;
  textColor: string;
}) => {
  const isActive = index < currentStep;
  const isCurrent = index === currentStep - 1;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      delay: isCurrent ? 300 : 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
    if (!isCurrent) anim.setValue(isActive ? 1 : 0);
  }, [isActive, anim, isCurrent]);

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [inActiveColor, '#1954E5'],
  });

  return (
    <Animated.View style={[styles.stepContainer, { backgroundColor }]}>
      <Text style={[styles.stepText, { color: textColor }]}>{index + 1}</Text>
    </Animated.View>
  );
};

const Separator = ({
  index,
  currentStep,
  inActiveColor,
}: {
  index: number;
  currentStep: number;
  inActiveColor: string;
}) => {
  const isPassed = index < currentStep - 1;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isPassed ? 1 : 0,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [isPassed, anim]);

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [inActiveColor, '#1954E5'],
  });

  const animatedWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.separator, { backgroundColor: inActiveColor }]}>
      <Animated.View
        style={{ height: '100%', width: animatedWidth, backgroundColor }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: { flexGrow: 0 },
  listContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepContainer: {
    width: wp(10),
    height: wp(10),
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  stepText: {
    fontFamily: 'Kavoon-Regular',
    fontSize: wp(6),
  },
  separator: {
    width: wp(8),
    height: wp(1),
    borderRadius: 9999,
    marginHorizontal: wp(2),
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
