import {
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

type Props = {
  activeHeight: number;
  children?: ReactNode;
  backgroundColor: string;
  backDropColor: string;
};

const BottomSheet = forwardRef<BottomSheetMethods, Props>(
  ({ activeHeight, children, backgroundColor, backDropColor }: Props, ref) => {
    const { height } = useWindowDimensions();
    const newActiveHeight = height - activeHeight;
    const topAnimation = useSharedValue(height);

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(newActiveHeight, {
        damping: 100,
        stiffness: 400,
      });
    }, [newActiveHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withSpring(height, {
        damping: 100,
        stiffness: 400,
      });
    }, [height, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });
    const backDropAnimation = useAnimatedStyle(() => {
      const opacity = interpolate(
        topAnimation.value,
        [height, newActiveHeight],
        [0, 0.5],
      );
      const display = opacity === 0 ? 'none' : 'flex';
      return {
        opacity,
        display,
      };
    });

    return (
      <>
        <TouchableWithoutFeedback
          onPress={() => {
            close();
          }}
        >
          <Animated.View
            style={[
              styles.backDrop,
              backDropAnimation,
              { backgroundColor: backDropColor },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.container,
            animationStyle,
            { height: activeHeight, backgroundColor: backgroundColor },
          ]}
        >
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          {children}
        </Animated.View>
      </>
    );
  },
);

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    left: 0,
    right: 0,
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  backDrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'none',
  },
});
