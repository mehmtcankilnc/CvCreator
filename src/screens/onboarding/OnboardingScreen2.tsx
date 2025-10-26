/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  RootStackParamList,
  OnboardingStackParamList,
} from '../../types/navigation.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import OnboardingWave from '../../components/OnboardingWave';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function OnboardingScreen2() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<OnboardingStackParamList, 'Onboarding1'>,
        StackNavigationProp<RootStackParamList>
      >
    >();

  const handleGuestLogin = async () => {
    try {
      await AsyncStorage.setItem('hasShowedOnboarding', 'true');

      navigation.getParent()?.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
    } catch (e) {
      console.error('Failed to save onboarding status', e);
    }
  };

  return (
    <View className="flex-1">
      <View className="absolute top-0 bottom-0 right-0 left-0">
        <OnboardingWave title="CV Creator" />
      </View>
      <Image
        source={require('../../assets/CvCreatorMaskot.png')}
        style={{
          width: wp(50),
          height: wp(50),
          position: 'absolute',
          right: wp(-5),
          top: wp(15),
        }}
        resizeMode="contain"
      />
      <View
        className="flex-1 justify-end items-center"
        style={{
          gap: wp(20),
          paddingVertical: wp(20),
          paddingHorizontal: wp(5),
        }}
      >
        <Text
          style={{
            fontFamily: 'Kavoon-Regular',
            fontSize: wp(8),
            color: '#585858',
          }}
        >
          Start creating your CVright away,{'\n'}without login!
        </Text>
        <View className="w-full" style={{ gap: wp(3) }}>
          <Button handleSubmit={handleGuestLogin} text="Misafir" />
          <Button
            type="back"
            handleSubmit={() => console.log('s')}
            text="Google"
          />
        </View>
      </View>
    </View>
  );
}
