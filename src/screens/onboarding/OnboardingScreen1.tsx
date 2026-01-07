/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  OnboardingStackParamList,
  RootStackParamList,
} from '../../types/navigation.types';
import OnboardingWave from '../../components/OnboardingWave';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from '../../components/Button';

export default function OnboardingScreen1() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<OnboardingStackParamList, 'Onboarding1'>,
        StackNavigationProp<RootStackParamList>
      >
    >();

  const handleNext = () => {
    navigation.navigate('Onboarding2');
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
            fontFamily: 'InriaSerif-Bold',
            fontSize: wp(8),
            color: '#585858',
          }}
        >
          Create a standout CV{'\n'}in minutes
        </Text>
        <Button handleSubmit={handleNext} text={'Next'} />
      </View>
    </View>
  );
}
