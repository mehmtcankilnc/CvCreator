/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { supabase } from '../../lib/supabase';
import GoogleSignInBtn from '../../components/GoogleSignInBtn';
import Alert from '../../components/Alert';
import { setUser } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setTheme } from '../../store/slices/themeSlice';
import { openBottomSheet } from '../../store/slices/bottomSheetSlice';
import { LanguageTypes, setLanguage } from '../../store/slices/languageSlice';

type Props = {
  navigation: any;
};

export default function Settings({ navigation }: Props) {
  const { isAnonymous, userName } = useAppSelector(state => state.auth);
  const { theme } = useAppSelector(state => state.theme);
  const dispatch = useAppDispatch();

  const [isLinking, setIsLinking] = useState(false);
  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const handleAccountLink = async () => {
    if (isLinking) return;
    setIsLinking(true);

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;

        if (!idToken) {
          throw new Error('Google girişi sırasında idToken alınamadı.');
        }

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });

        if (error) {
          setAlertVisible(true);
          setAlert({
            type: 'failure',
            title: 'Fail',
            desc: error.message,
            onPress: () => setAlertVisible(false),
          });
        } else {
          dispatch(
            setUser({ id: data.user.id, name: data.user.user_metadata.name }),
          );
          setAlertVisible(true);
          setAlert({
            type: 'success',
            title: 'Success',
            desc: 'Your Google account has linked now!',
            onPress: () => setAlertVisible(false),
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('Kullanıcı Google girişini iptal etti.');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('devam ediyor');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('servis mevcut değil');
            break;
          default:
            console.log('bilinmeyen hata');
        }
      } else {
        console.log('giriş hatası');
      }
    } finally {
      setIsLinking(false);
    }
  };

  const handleThemeChange = () => {
    if (theme === 'DARK') {
      dispatch(setTheme('LIGHT'));
    } else {
      dispatch(setTheme('DARK'));
    }
  };

  const handleOpenPress = () => {
    dispatch(
      openBottomSheet({
        type: 'LANGUAGE_SETTINGS',
        props: { onSelect: handleLangSelect },
      }),
    );
  };

  const handleLangSelect = (lang: LanguageTypes) => {
    dispatch(setLanguage(lang));
  };

  return (
    <View className="flex-1">
      <Header handlePress={() => navigation.toggleDrawer()} title="Settings" />
      <Page>
        <View className="w-full" style={{ gap: wp(3) }}>
          {/** Hesap Bilgileri */}
          <View
            className="w-full bg-[#fefefe] elevation-md"
            style={{ borderRadius: wp(4), padding: wp(5), gap: wp(3) }}
          >
            <View style={{ gap: wp(1) }}>
              <Text
                style={{ fontSize: wp(4), color: '#1810C2', fontWeight: '600' }}
              >
                Account Information
              </Text>
              <View className="border-b w-full border-b-borderColor" />
            </View>
            {isAnonymous ? (
              <GoogleSignInBtn
                handleGoogle={handleAccountLink}
                isLoading={isLinking}
              />
            ) : (
              <Pressable // Kullanıcı Adı
                className="flex-row items-center"
                style={{ gap: wp(3) }}
              >
                <MaterialCommunityIcons
                  name="account-outline"
                  size={wp(8)}
                  color="#585858"
                />
                <Text
                  style={{
                    fontFamily: 'Kavoon-Regular',
                    fontSize: wp(4.5),
                    fontWeight: '600',
                    color: '#585858',
                  }}
                >
                  {userName}
                </Text>
              </Pressable>
            )}
          </View>
          {/** Genel Ayarlar */}
          <View
            className="w-full bg-[#fefefe] elevation-md"
            style={{ borderRadius: wp(4), padding: wp(5), gap: wp(3) }}
          >
            <View style={{ gap: wp(1) }}>
              <Text
                style={{ fontSize: wp(4), color: '#1810C2', fontWeight: '600' }}
              >
                General Settings
              </Text>
              <View className="border-b w-full border-b-borderColor" />
            </View>
            {/** Tema Değişme */}
            <Pressable
              onPress={handleThemeChange}
              className="flex-row items-center"
              style={{ gap: wp(3) }}
            >
              <MaterialCommunityIcons
                name={theme === 'DARK' ? 'lightbulb-outline' : 'lightbulb-on'}
                size={wp(8)}
                color="#585858"
              />
              <Text
                style={{
                  fontFamily: 'Kavoon-Regular',
                  fontSize: wp(4.5),
                  fontWeight: '600',
                  color: '#585858',
                }}
              >
                Switch Theme
              </Text>
            </Pressable>
            {/** Dil Değişme */}
            <Pressable
              onPress={handleOpenPress}
              className="flex-row items-center"
              style={{ gap: wp(3) }}
            >
              <MaterialCommunityIcons name="web" size={wp(8)} color="#585858" />
              <Text
                style={{
                  fontFamily: 'Kavoon-Regular',
                  fontSize: wp(4.5),
                  fontWeight: '600',
                  color: '#585858',
                }}
              >
                Language
              </Text>
            </Pressable>
          </View>
        </View>
      </Page>
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
