import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../types/navigation.types';
import { useAppDispatch } from '../store/hooks';
import { setAnon, setUser } from '../store/slices/authSlice';
import { supabase } from '../lib/supabase';

const SplashScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          dispatch(
            setUser({
              id: session.user.id,
              name: session.user.email ?? null,
            }),
          );
        } else {
          const isGuest = await AsyncStorage.getItem('isGuest');
          if (isGuest === 'true') {
            dispatch(setAnon(true));
          }
        }

        const onboardingValue = await AsyncStorage.getItem(
          'hasShowedOnboarding',
        );

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
      } catch (e) {
        console.error('Kullanıcı durumu kontrol hatası:', e);
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      }
    };
    setTimeout(checkUserStatus, 1500);
  }, [dispatch, navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-backgroundColor dark:bg-dark-backgroundColor">
      <ActivityIndicator size="large" color="#1810C2" />
    </View>
  );
};

export default SplashScreen;
