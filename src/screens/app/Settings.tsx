/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { supabase } from '../../lib/supabase';
import GoogleSignInBtn from '../../components/GoogleSignInBtn';
import Alert from '../../components/Alert';
import { setAnon, setUser } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setTheme } from '../../store/slices/themeSlice';
import { openBottomSheet } from '../../store/slices/bottomSheetSlice';
import { LanguageTypes, setLanguage } from '../../store/slices/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { deleteUser } from '../../services/UserServices';
import i18n from '../../utilities/i18n';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: any;
};

export default function Settings({ navigation }: Props) {
  const { t } = useTranslation();

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

  const color = theme === 'LIGHT' ? 'black' : '#D9D9D9';

  const handleAccountLink = async () => {
    if (isLinking) return;
    setIsLinking(true);

    try {
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

              navigation.navigate('Home');
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
      setIsLinking(false);
    }
  };

  const handleThemeChange = async () => {
    if (theme === 'DARK') {
      dispatch(setTheme('LIGHT'));
      await AsyncStorage.setItem('theme', 'LIGHT');
    } else {
      dispatch(setTheme('DARK'));
      await AsyncStorage.setItem('theme', 'DARK');
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

  const handleLangSelect = async (lang: LanguageTypes) => {
    dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
    await AsyncStorage.setItem('preferredLanguage', lang);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('signout-error-title'),
        desc: t('signout-error-text'),
        onPress: () => setAlertVisible(false),
      });
    } else {
      const { error: anonErr } = await supabase.auth.signInAnonymously();
      if (anonErr == null) {
        dispatch(setAnon(true));
        await AsyncStorage.removeItem('isGuest');
      } else {
        console.log(anonErr);
      }

      navigation.navigate('Home');
    }
  };

  return (
    <View className="flex-1">
      <Header
        handlePress={() => navigation.toggleDrawer()}
        title={t('settings')}
      />
      <Page>
        <View className="w-full" style={{ gap: wp(3) }}>
          {/** Genel Ayarlar */}
          <View
            className="w-full bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md"
            style={{ borderRadius: wp(4), padding: wp(5), gap: wp(3) }}
          >
            <View style={{ gap: wp(1) }}>
              <Text
                style={{ fontSize: wp(4), color: '#1954E5', fontWeight: '600' }}
              >
                {t('general-settings')}
              </Text>
              <View className="border-b w-full border-b-borderColor dark:border-b-dark-borderColor" />
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
                color={color}
              />
              <Text
                style={{
                  fontFamily: 'Kavoon-Regular',
                  fontSize: wp(4.5),
                  fontWeight: '600',
                  color: color,
                }}
              >
                {t('switch-theme')}
              </Text>
            </Pressable>
            {/** Dil Değişme */}
            <Pressable
              onPress={handleOpenPress}
              className="flex-row items-center"
              style={{ gap: wp(3) }}
            >
              <MaterialCommunityIcons name="web" size={wp(8)} color={color} />
              <Text
                style={{
                  fontFamily: 'Kavoon-Regular',
                  fontSize: wp(4.5),
                  fontWeight: '600',
                  color: color,
                }}
              >
                {t('language')}
              </Text>
            </Pressable>
          </View>
          {isAnonymous ? (
            <GoogleSignInBtn // Google Sign In
              handleGoogle={handleAccountLink}
              isLoading={isLinking}
            />
          ) : (
            <View // Hesap Bilgileri
              className="w-full bg-secondaryBackground dark:bg-dark-secondaryBackground elevation-md"
              style={{ borderRadius: wp(4), padding: wp(5), gap: wp(3) }}
            >
              <View style={{ gap: wp(1) }}>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: '#1954E5',
                    fontWeight: '600',
                  }}
                >
                  {t('account-info')}
                </Text>
                <View className="border-b w-full border-b-borderColor dark:border-b-dark-borderColor" />
              </View>
              <View // Kullanıcı Adı
                className="flex-row items-center"
                style={{ gap: wp(3) }}
              >
                <MaterialCommunityIcons
                  name="account-outline"
                  size={wp(8)}
                  color={color}
                />
                <Text
                  style={{
                    fontFamily: 'Kavoon-Regular',
                    fontSize: wp(4.5),
                    fontWeight: '600',
                    color: color,
                  }}
                >
                  {userName}
                </Text>
              </View>
              <Pressable // Çıkış Yap
                className={`flex-row items-center ${
                  isAnonymous ? 'opacity-25' : 'opacity-100'
                }`}
                style={{ gap: wp(3) }}
                onPress={() => {
                  setAlertVisible(true);
                  setAlert({
                    type: 'inform',
                    title: t('are-you-sure'),
                    desc: t('logout-msg'),
                    onPress: () => {
                      setAlertVisible(false);
                      handleLogout();
                    },
                  });
                }}
                disabled={isAnonymous}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={wp(8)}
                  color={color}
                />
                <Text
                  style={{
                    fontFamily: 'Kavoon-Regular',
                    fontSize: wp(4.5),
                    fontWeight: '600',
                    color: color,
                  }}
                >
                  {t('logout')}
                </Text>
              </Pressable>
              <Pressable // Hesabı Sil
                className={`flex-row items-center ${
                  isAnonymous ? 'opacity-25' : 'opacity-100'
                }`}
                style={{ gap: wp(3) }}
                onPress={() => {
                  setAlertVisible(true);
                  setAlert({
                    type: 'failure',
                    title: t('are-you-sure'),
                    desc: t('delete-acc-msg'),
                    onPress: async () => {
                      setAlertVisible(false);
                      const res = await deleteUser();
                      if (res && res.ok) {
                        handleLogout();
                      } else {
                        console.log(res);
                      }
                    },
                  });
                }}
                disabled={isAnonymous}
              >
                <MaterialCommunityIcons
                  name="delete-forever-outline"
                  size={wp(8)}
                  color={color}
                />
                <Text
                  style={{
                    fontFamily: 'Kavoon-Regular',
                    fontSize: wp(4.5),
                    fontWeight: '600',
                    color: color,
                  }}
                >
                  {t('delete-acc')}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </Page>
      {alertVisible && (
        <Alert
          visible={alertVisible}
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={alert.onPress}
          onDismiss={() => setAlertVisible(false)}
        />
      )}
    </View>
  );
}
