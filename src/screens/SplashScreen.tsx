/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef, useState } from 'react';
import { useColorScheme, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation.types';
import { useAppDispatch } from '../store/hooks';
import { setAnon, setUser } from '../store/slices/authSlice';
import { supabase } from '../lib/supabase';
import { LanguageTypes, setLanguage } from '../store/slices/languageSlice';
import i18n from '../utilities/i18n';
import LottieView from 'lottie-react-native';
import { setTheme } from '../store/slices/themeSlice';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingValue, setOnboardingValue] = useState<string | null>();
  const animationRef = useRef(null);

  const systemTheme = useColorScheme();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const handleAnimationFinish = () => {
    setIsLoading(false);

    if (onboardingValue === null) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
    }
  };

  useEffect(() => {
    const checkUserStatus = async () => {
      setIsLoading(true);
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          const { error: anonErr } = await supabase.auth.signInAnonymously();
          if (anonErr == null) {
            dispatch(setAnon(true));
          }
          return;
        }

        if (!user) {
          console.log('Kullanıcı oturumu yok.');
          return;
        }

        if (user.is_anonymous) {
          dispatch(setAnon(true));
        } else {
          dispatch(
            setUser({
              id: user.id,
              name: user.email ?? null,
            }),
          );
        }

        const savedLanguage = await AsyncStorage.getItem('preferredLanguage');
        if (savedLanguage) {
          dispatch(setLanguage(savedLanguage as LanguageTypes));
          i18n.changeLanguage(savedLanguage);
        }

        const themeData = await AsyncStorage.getItem('theme');
        if (themeData) {
          if (themeData === 'LIGHT') {
            dispatch(setTheme('LIGHT'));
          } else {
            dispatch(setTheme('DARK'));
          }
        } else {
          systemTheme === 'dark'
            ? dispatch(setTheme('DARK'))
            : dispatch(setTheme('LIGHT'));
        }

        const value = await AsyncStorage.getItem('hasShowedOnboarding');
        setOnboardingValue(value);
      } catch (e) {
        console.error('Kullanıcı durumu kontrol hatası:', e);
      }
    };
    setTimeout(checkUserStatus, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor">
      {isLoading && (
        <LottieView
          ref={animationRef}
          source={require('../assets/splash.json')}
          autoPlay
          loop={false}
          resizeMode="cover"
          onAnimationFinish={handleAnimationFinish}
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </View>
  );
};

export default SplashScreen;
