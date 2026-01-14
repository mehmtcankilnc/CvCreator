/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation.types';
import { useAppDispatch } from '../store/hooks';
import { LanguageTypes, setLanguage } from '../store/slices/languageSlice';
import i18n from '../utilities/i18n';
import LottieView from 'lottie-react-native';
import { setTheme } from '../store/slices/themeSlice';
import * as RNLocalize from 'react-native-localize';
import { useAuth } from '../context/AuthContext';

const SplashScreen = () => {
  const { getUser } = useAuth();

  const [isAppReady, setIsAppReady] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [onboardingValue, setOnboardingValue] = useState<string | null>(null);

  const animationRef = useRef<LottieView>(null);
  const systemTheme = useColorScheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        await getUser();

        const savedLanguage = await AsyncStorage.getItem('preferredLanguage');

        if (savedLanguage) {
          dispatch(setLanguage(savedLanguage as LanguageTypes));
          i18n.changeLanguage(savedLanguage);
        } else {
          const locales = RNLocalize.getLocales();
          const deviceLanguage = locales[0]?.languageCode;

          const defaultLang = deviceLanguage === 'tr' ? 'tr' : 'en';

          dispatch(setLanguage(defaultLang as LanguageTypes));
          i18n.changeLanguage(defaultLang);
        }

        const themeData = await AsyncStorage.getItem('theme');
        if (themeData) {
          dispatch(setTheme(themeData === 'LIGHT' ? 'LIGHT' : 'DARK'));
        } else {
          dispatch(setTheme(systemTheme === 'dark' ? 'DARK' : 'LIGHT'));
        }

        const value = await AsyncStorage.getItem('hasShowedOnboarding');
        setOnboardingValue(value);
      } catch (e) {
        console.error('Başlangıç hatası:', e);
      } finally {
        setIsAppReady(true);
      }
    };

    checkUserStatus();
  }, [dispatch, getUser, systemTheme]);

  useEffect(() => {
    if (isAppReady && isAnimationFinished) {
      if (onboardingValue === null) {
        navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'App' }] });
      }
    }
  }, [isAppReady, isAnimationFinished, onboardingValue, navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor dark:bg-dark-backgroundColor">
      <LottieView
        ref={animationRef}
        source={require('../assets/splash.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        onAnimationFinish={handleAnimationFinish}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};

export default SplashScreen;
