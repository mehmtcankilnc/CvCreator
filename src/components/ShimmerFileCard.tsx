/* eslint-disable react-native/no-inline-styles */
import { View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ShimmerFileCard() {
  const [layoutWidth, setLayoutWidth] = useState(0);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-layoutWidth, layoutWidth],
  });

  return (
    <View
      className="w-full"
      onLayout={event => setLayoutWidth(event.nativeEvent.layout.width)}
    >
      <View
        className="flex-col bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md"
        style={{
          marginHorizontal: wp(3),
          marginTop: wp(3),
          height: wp(60),
          borderRadius: wp(3),
          padding: wp(5),
          gap: wp(3),
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <View
          className="flex-1 bg-[#e0e0e0] dark:bg-[#222d3d]"
          style={{
            height: wp(8),
            borderRadius: wp(1),
            zIndex: 1,
          }}
        />
        <View className="flex-1" style={{ gap: wp(2) }}>
          <View
            className="flex-1 bg-[#e0e0e0] dark:bg-[#222d3d]"
            style={{
              height: wp(8),
              borderRadius: wp(1),
              zIndex: 1,
            }}
          />
          <View
            className="flex-1 bg-[#e0e0e0] dark:bg-[#222d3d]"
            style={{
              height: wp(8),
              borderRadius: wp(1),
              zIndex: 1,
            }}
          />
        </View>
        <View
          className="flex-1 bg-[#e0e0e0] dark:bg-[#222d3d]"
          style={{
            height: wp(8),
            borderRadius: wp(1),
            zIndex: 1,
          }}
        />
        <Animated.View
          className="h-full absolute bg-secondaryBackground dark:bg-dark-secondaryBackground opacity-40"
          style={{
            top: wp(5),
            left: wp(5),
            width: layoutWidth * 0.3,
            height: '100%',
            transform: [{ translateX }],
            zIndex: 2,
          }}
        />
      </View>
    </View>
  );
}
