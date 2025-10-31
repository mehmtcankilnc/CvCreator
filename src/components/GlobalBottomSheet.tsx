/* eslint-disable react-native/no-inline-styles */
import { Pressable, useWindowDimensions } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearBottomSheetContent,
  closeBottomSheet,
} from '../store/slices/bottomSheetSlice';
import ExampleContent from './ExampleContent';
import FileSettingsContent from './FileSettingsContent';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { scheduleOnRN } from 'react-native-worklets';
import LanguageSettingsContent from './LanguageSettingsContent';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 100,
  mass: 1,
};

const TIMING_CONFIG = {
  duration: 250,
};

const renderContent = (content: any) => {
  const { type, props } = content;

  switch (type) {
    case 'EXAMPLE_CONTENT':
      return <ExampleContent {...props} />;
    case 'FILE_SETTINGS':
      return <FileSettingsContent {...props} />;
    case 'LANGUAGE_SETTINGS':
      return <LanguageSettingsContent {...props} />;
    default:
      return null;
  }
};

export default function GlobalBottomSheet() {
  const { isOpen, content } = useAppSelector(state => state.bottomSheet);
  const dispatch = useAppDispatch();

  const { height: SCREEN_HEIGHT } = useWindowDimensions();

  const SNAP_POINT = SCREEN_HEIGHT * 0.3;
  const gestureContentY = useSharedValue(0);
  const translateY = useSharedValue(SCREEN_HEIGHT);

  const [isSheetVisible, setIsSheetVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSheetVisible(true);
      translateY.value = withSpring(0, SPRING_CONFIG);
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, TIMING_CONFIG);

      const timerId = setTimeout(() => {
        setIsSheetVisible(false);
        dispatch(clearBottomSheetContent());
      }, TIMING_CONFIG.duration);

      return () => {
        clearTimeout(timerId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, dispatch, SCREEN_HEIGHT]);

  const dispatchClose = useCallback(() => {
    dispatch(closeBottomSheet());
  }, [dispatch]);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      gestureContentY.value = translateY.value;
    })
    .onUpdate(event => {
      'worklet';
      const newTranslateY = gestureContentY.value + event.translationY;

      translateY.value = Math.max(newTranslateY, 0);
    })
    .onEnd(event => {
      'worklet';
      if (translateY.value > SNAP_POINT || event.velocityY > 500) {
        scheduleOnRN(dispatchClose);
        // runOnJS(dispatchClose)();
      } else {
        translateY.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const rBackdropStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, SCREEN_HEIGHT],
      [0.5, 0],
      Extrapolation.CLAMP,
    );
    return {
      opacity: opacity,
    };
  });

  const rSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const handleBackdropPress = () => {
    dispatch(closeBottomSheet());
  };

  if (!isSheetVisible) {
    return null;
  }

  return (
    <Animated.View
      className="absolute inset-0"
      style={{ pointerEvents: 'box-none' }}
    >
      <AnimatedPressable
        onPress={handleBackdropPress}
        className="absolute inset-0 bg-black/50"
        style={rBackdropStyle}
      />
      <GestureDetector gesture={panGesture}>
        <Animated.View
          onStartShouldSetResponder={() => true}
          style={rSheetStyle}
          className="absolute bottom-0 w-full bg-white rounded-t-2xl shadow-lg md:max-w-lg md:mx-auto md:bottom-4 md:rounded-xl"
        >
          <Animated.View className="w-16 h-1 bg-[#1810C2] rounded-full self-center my-3" />
          {content ? renderContent(content) : null}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
