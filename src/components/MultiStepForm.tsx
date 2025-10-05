/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import React, { Children, ReactNode, useEffect, useRef } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  children: ReactNode;
  currentStep: number;
};

export default function MultiStepForm({ children, currentStep }: Props) {
  const steps = Children.toArray(children);
  const active = steps[currentStep - 1] ?? null;

  return (
    <View className="w-full gap-10">
      <FlatList
        data={steps}
        horizontal
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ index }) => (
          <View style={styles.stepWrapper}>
            <StepIndicator index={index} currentStep={currentStep} />
            {index < steps.length - 1 && (
              <Separator index={index} currentStep={currentStep} />
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
}: {
  index: number;
  currentStep: number;
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
    outputRange: ['#D4D4D4', '#1810C2'],
  });

  return (
    <Animated.View style={[styles.stepContainer, { backgroundColor }]}>
      <Text style={styles.stepText}>{index + 1}</Text>
    </Animated.View>
  );
};

const Separator = ({
  index,
  currentStep,
}: {
  index: number;
  currentStep: number;
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
    outputRange: ['#D4D4D4', '#1810C2'],
  });

  const animatedWidth = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.separator, { backgroundColor: '#D4D4D4' }]}>
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
    justifyContent: 'center',
  },
  stepText: {
    color: 'white',
    fontFamily: 'Kavoon-Regular',
    fontSize: wp(5),
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
