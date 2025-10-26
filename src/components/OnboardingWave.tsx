import React from 'react';
import Svg, { Path, TSpan } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  title: string;
};

export default function OnboardingWave({ title }: Props) {
  return (
    <Svg width={540} height={960}>
      <Path fill="#FFF" d="M0 0h540v960H0z" />
      <Path
        fill="#1810C2"
        d="m0 356 18-7c18-7 54-21 90-20.8 36 .1 72 14.5 108 22.6 36 8.2 72 10.2 108-8.8s72-59 108-74 72-5 90 0l18 5V0H0Z"
      />
      <TSpan
        x={wp(10)}
        y={wp(40)}
        fill="white"
        fontFamily="Kavoon-Regular"
        fontSize={wp(10)}
      >
        {title}
      </TSpan>
    </Svg>
  );
}
