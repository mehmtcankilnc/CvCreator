/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
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
import { supabase } from '../../lib/supabase';
import GoogleSignInBtn from '../../components/GoogleSignInBtn';
import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import Alert from '../../components/Alert';

GoogleSignin.configure({
  webClientId:
    '237778058771-jprkiea07qdldedp5pe4p40b5i7374b2.apps.googleusercontent.com',
});

export default function OnboardingScreen2() {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<OnboardingStackParamList, 'Onboarding1'>,
        StackNavigationProp<RootStackParamList>
      >
    >();

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const navigateToApp = async () => {
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

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    setAlertVisible(true);
    setAlert({
      type: 'inform',
      title: 'Continue?',
      desc: 'Are you sure you want to continue as guest, you can link your account later, whenever you want!',
      onPress: async () => {
        const { error } = await supabase.auth.signInAnonymously();
        if (error == null) {
          navigateToApp();
        } else {
          console.log(error);
        }
        setAlertVisible(false);
      },
    });
    setIsLoading(false);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log(response);
      if (isSuccessResponse(response)) {
        // setUserInfo(response.data);
        setAlertVisible(true);
        setAlert({
          type: 'success',
          title: 'Success',
          desc: 'Signed in successfully! Create your CV, right away!',
          onPress: () => {
            navigateToApp();
            setAlertVisible(false);
          },
        });
      } else {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Fail',
          desc: 'Operation was cancelled, try again for signing in via Google.',
          onPress: () => setAlertVisible(false),
        });
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            setAlertVisible(true);
            setAlert({
              type: 'failure',
              title: 'Fail',
              desc: error.message,
              onPress: () => setAlertVisible(false),
            });
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setAlertVisible(true);
            setAlert({
              type: 'failure',
              title: 'Fail',
              desc: error.message,
              onPress: () => setAlertVisible(false),
            });
            break;
          default:
            setAlertVisible(true);
            setAlert({
              type: 'failure',
              title: 'Fail',
              desc: error.message,
              onPress: () => setAlertVisible(false),
            });
        }
      } else {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Fail',
          desc: 'Something went wrong.',
          onPress: () => setAlertVisible(false),
        });
      }
    } finally {
      setIsLoading(false);
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
          Start creating your CV right away,{'\n'}without login!
        </Text>
        <View className="w-full" style={{ gap: wp(3) }}>
          <Button
            handleSubmit={handleGuestSignIn}
            text="Guest"
            isLoading={isLoading}
          />
          <GoogleSignInBtn
            handleGoogle={handleGoogleSignIn}
            isLoading={isLoading}
          />
        </View>
      </View>
      {alertVisible && (
        <Alert
          visible={alertVisible}
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={alert.onPress}
        />
      )}
    </View>
  );
}
