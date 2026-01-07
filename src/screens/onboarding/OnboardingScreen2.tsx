/* eslint-disable react-native/no-inline-styles */
import 'react-native-url-polyfill/auto';
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
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Alert from '../../components/Alert';
import { useAppDispatch } from '../../store/hooks';
import { setAnon, setUser } from '../../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

type AlertType = 'failure' | 'success' | 'inform';

interface AlertState {
  type: AlertType;
  title: string;
  desc: string;
  onPress: () => void;
}

export default function OnboardingScreen2() {
  const { t } = useTranslation();

  const navigation =
    useNavigation<
      CompositeNavigationProp<
        StackNavigationProp<OnboardingStackParamList, 'Onboarding1'>,
        StackNavigationProp<RootStackParamList>
      >
    >();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isAlertLoading, setIsAlertLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
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
    setAlertVisible(true);
    setAlert({
      type: 'inform',
      title: t('anon-signin-alert-title'),
      desc: t('anon-signin-alert-text'),
      onPress: async () => {
        setIsAlertLoading(true);
        const { error } = await supabase.auth.signInAnonymously();
        if (error == null) {
          dispatch(setAnon(true));
          await AsyncStorage.setItem('isGuest', 'true');
          navigateToApp();
        } else {
          console.log(error);
          setIsAlertLoading(false);
        }
        setAlertVisible(false);
      },
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'cvcreator://google-auth',
        },
      });

      if (error || !data.url) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: t('google-signin-error-title'),
          desc: t('google-signin-error-text'),
          onPress: () => setAlertVisible(false),
        });
        return;
      }

      const { url } = data;

      if (url) {
        const deepLink = 'cvcreator://google-auth';
        console.log('URL:', url);
        const result = await InAppBrowser.openAuth(url, deepLink, {
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          showTitle: false,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: true,
        });

        if (result.type === 'success' && result.url) {
          const resultUrl = result.url;
          const params: { [key: string]: string } = {};
          const regex = /[?&#]([^=]+)=([^&]*)/g;
          let match;
          while ((match = regex.exec(resultUrl))) {
            params[match[1]] = match[2];
          }
          const { access_token, refresh_token } = params;

          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

            if (sessionError) {
              setAlertVisible(true);
              setAlert({
                type: 'failure',
                title: t('session-error-title'),
                desc: t('session-error-text'),
                onPress: () => setAlertVisible(false),
              });
            } else {
              const {
                data: { user },
              } = await supabase.auth.getUser();
              if (user) {
                dispatch(
                  setUser({
                    id: user.id,
                    name: user.email ?? null,
                  }),
                );
                await AsyncStorage.setItem('isGuest', 'false');
              }
              navigateToApp();
            }
          }
        }
      }
    } catch (error) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('unknown-fail-alert-title'),
        desc: t('unknown-fail-alert-text'),
        onPress: () => setAlertVisible(false),
      });
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
            fontFamily: 'InriaSerif-Bold',
            fontSize: wp(8),
            color: '#585858',
          }}
        >
          Start creating your CV right away,{'\n'}without login!
        </Text>
        <View className="w-full" style={{ gap: wp(3) }}>
          <Button
            handleSubmit={handleGuestSignIn}
            text="Continue as Guest"
            type="back"
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
          isLoading={isAlertLoading}
          onDismiss={() => setAlertVisible(false)}
        />
      )}
    </View>
  );
}
