import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackNavigationProp } from '../types/navigation.types';

const SplashScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem('hasShowedOnboarding');

        if (value === null) {
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
        console.error('AsyncStorage hatası:', e);
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      }
    };
    setTimeout(checkOnboardingStatus, 1500);
    //checkOnboardingStatus();
  }, [navigation]);

  return (
    <View>
      <Text>CV Uygulaması</Text>
      <ActivityIndicator size="large" color="#1810C2" />
    </View>
  );
};

export default SplashScreen;
