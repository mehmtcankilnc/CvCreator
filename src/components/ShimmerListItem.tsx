/* eslint-disable react-native/no-inline-styles */
import { Animated, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ShimmerListItem() {
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
        className="flex-row bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md"
        style={{
          height: wp(12),
          padding: wp(2),
          borderRadius: wp(2),
          gap: wp(2),
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Sol Yuvarlak */}
        <View
          className="bg-[#e0e0e0] dark:bg-[#222d3d]"
          style={{
            borderRadius: 9999,
            width: wp(8),
            height: wp(8),
            padding: wp(1),
            zIndex: 1,
          }}
        />

        {/* Sağ Çubuk */}
        <View
          className="flex-1 bg-[#e0e0e0] dark:bg-[#222d3d]"
          style={{
            height: wp(8),
            borderRadius: wp(1),
            zIndex: 1,
          }}
        />

        {/* Shimmer Efekti */}
        <Animated.View
          className="h-full absolute bg-secondaryBackground dark:bg-dark-secondaryBackground opacity-40"
          style={{
            top: wp(2),
            left: wp(2),
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
