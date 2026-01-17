/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import GoogleSignInBtn from '../../components/GoogleSignInBtn';
import Alert from '../../components/Alert';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setTheme } from '../../store/slices/themeSlice';
import { openBottomSheet } from '../../store/slices/bottomSheetSlice';
import { LanguageTypes, setLanguage } from '../../store/slices/languageSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteUser } from '../../services/UserServices';
import i18n from '../../utilities/i18n';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: any;
};

export default function Settings({ navigation }: Props) {
  const { t } = useTranslation();
  const { user, loginGoogle, logout, loginGuest, authenticatedFetch } =
    useAuth();
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

    try {
      setIsLinking(true);
      const isSucceed = await loginGoogle();
      if (isSucceed) {
        navigation.navigate('Home');
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
    const isSucceed = await logout();

    if (!isSucceed) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('signout-error-title'),
        desc: t('signout-error-text'),
        onPress: () => setAlertVisible(false),
      });
    } else {
      const isGuestSucceed = await loginGuest();
      if (isGuestSucceed) {
        await AsyncStorage.setItem('isGuest', 'false');
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
                style={{
                  fontSize: wp(4),
                  color: '#1954E5',
                  fontFamily: 'InriaSerif-Bold',
                }}
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
                  fontFamily: 'InriaSerif-Bold',
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
                  fontFamily: 'InriaSerif-Bold',
                  fontSize: wp(4.5),
                  fontWeight: '600',
                  color: color,
                }}
              >
                {t('language')}
              </Text>
            </Pressable>
          </View>
          {user?.isGuest ? (
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
                    fontFamily: 'InriaSerif-Bold',
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
                    fontFamily: 'InriaSerif-Bold',
                    fontSize: wp(4.5),
                    fontWeight: '600',
                    color: color,
                  }}
                >
                  {user?.userName}
                </Text>
              </View>
              <Pressable // Çıkış Yap
                className={`flex-row items-center ${
                  user?.isGuest ? 'opacity-25' : 'opacity-100'
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
                disabled={user?.isGuest}
              >
                <MaterialCommunityIcons
                  name="logout"
                  size={wp(8)}
                  color={color}
                />
                <Text
                  style={{
                    fontFamily: 'InriaSerif-Bold',
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
                  user?.isGuest ? 'opacity-25' : 'opacity-100'
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
                      const res = await deleteUser(authenticatedFetch);
                      if (res && res.isSuccess) {
                        handleLogout();
                      }
                    },
                  });
                }}
                disabled={user?.isGuest}
              >
                <MaterialCommunityIcons
                  name="delete-forever-outline"
                  size={wp(8)}
                  color={color}
                />
                <Text
                  style={{
                    fontFamily: 'InriaSerif-Bold',
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
