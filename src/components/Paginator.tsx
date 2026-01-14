/* eslint-disable react-native/no-inline-styles */
import { useWindowDimensions, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  interpolateColor,
  SharedValue,
} from 'react-native-reanimated';

type DotProps = {
  index: number;
  scrollX: SharedValue<number>;
  width: number;
};

const Dot = ({ index, scrollX, width }: DotProps) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [10, 25, 10],
      Extrapolation.CLAMP,
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.3, 1, 0.3],
      Extrapolation.CLAMP,
    );

    const backgroundColor = interpolateColor(scrollX.value, inputRange, [
      '#d1d1d1',
      '#1954E5',
      '#d1d1d1',
    ]);

    return {
      width: dotWidth,
      opacity,
      backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 10,
          borderRadius: 5,
          marginHorizontal: 5,
        },
        animatedDotStyle,
      ]}
    />
  );
};

export default function Paginator({
  data,
  scrollX,
}: {
  data: any[];
  scrollX: SharedValue<number>;
}) {
  const { width } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {data.map((_, i) => {
        return (
          <Dot key={i.toString()} index={i} scrollX={scrollX} width={width} />
        );
      })}
    </View>
  );
}
