/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

export default function GoogleSignInBtn({ handleGoogle, isLoading }) {
  const { t } = useTranslation();

  return (
    <View className="w-full items-center">
      <Pressable
        className="flex-row items-center justify-evenly rounded-full bg-[#4285F4]"
        onPress={handleGoogle}
        style={{ height: wp(15), width: wp(60) }}
      >
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'#1810C2'} />
        ) : (
          <>
            <Image
              source={require('../assets/icons/googleIcon.png')}
              style={{
                width: wp(10),
                height: wp(10),
                backgroundColor: 'white',
                borderRadius: 9999,
              }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: wp(4.5),
                fontFamily: 'InriaSerif-Bold',
                color: 'white',
              }}
            >
              {t('google-signin')}
            </Text>
          </>
        )}
      </Pressable>
    </View>
  );
}
