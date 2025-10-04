import React, { ReactNode } from 'react';
import { View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Props = {
  children: ReactNode;
};

export default function Page({ children }: Props) {
  return (
    <View
      className="flex-1 items-center bg-white"
      style={{
        marginTop: -hp(3),
        borderTopRightRadius: hp(3),
        borderTopLeftRadius: hp(3),
        padding: wp(5),
      }}
    >
      {children}
    </View>
  );
}
