/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import ListItem from '../../components/ListItem';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { GetMyResumes } from '../../services/ResumeServices';
import { GetMyCoverLetters } from '../../services/CoverLetterServices';
import ShimmerListItem from '../../components/ShimmerListItem';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: any;
};

export default function Home({ navigation }: Props) {
  const FILE_NUMBER = 2;

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  const { user, getUser, authenticatedFetch } = useAuth();

  const iconColor = theme === 'LIGHT' ? '#1954E5' : '#D9D9D9';

  const [myResumes, setMyResumes] = useState([]);
  const [isResumesLoading, setIsResumesLoading] = useState(!user?.isGuest);
  const [myCoverLetters, setMyCoverLetters] = useState([]);
  const [isCoverLettersLoading, setIsCoverLettersLoading] = useState(
    !user?.isGuest,
  );

  useEffect(() => {
    const ensureUserData = async () => {
      if (!user?.isGuest && !user?.id) {
        await getUser();
      }
    };

    ensureUserData();
  }, [user?.isGuest, user?.id, dispatch, getUser]);

  const fetchData = useCallback(async () => {
    if (!user?.isGuest && user?.id) {
      setIsResumesLoading(true);
      const resumeData = await GetMyResumes(
        authenticatedFetch,
        '',
        FILE_NUMBER,
      );
      if (resumeData) {
        const mappedResumes = resumeData.map((r: any) => ({
          id: r.id,
          name: r.fileName,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          storagePath: r.storagePath,
        }));
        setMyResumes(mappedResumes);
        setIsResumesLoading(false);
      }

      setIsCoverLettersLoading(true);
      const coverLetterData = await GetMyCoverLetters(
        authenticatedFetch,
        '',
        FILE_NUMBER,
      );
      if (coverLetterData) {
        const mappedCoverLetters = coverLetterData.map((r: any) => ({
          id: r.id,
          name: r.fileName,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,
          storagePath: r.storagePath,
        }));
        setMyCoverLetters(mappedCoverLetters);
        setIsCoverLettersLoading(false);
      }
    } else {
      setIsResumesLoading(false);
      setIsCoverLettersLoading(false);
    }
  }, [authenticatedFetch, user?.id, user?.isGuest]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return (
    <View className="flex-1">
      {/** Header Bileşeni */}
      <Header handlePress={() => navigation.toggleDrawer()} />
      {/** Sayfanın Geri Kalanı */}
      <Page>
        <View className="flex-1 items-center" style={{ gap: wp(3) }}>
          {/** Özellik Butonları */}
          <View
            className="flex justify-between"
            style={{
              width: wp(100),
              padding: wp(5),
              gap: wp(5),
              height: wp(75),
            }}
          >
            {/** Özgeçmiş Oluştur Butonu */}
            <Pressable
              className="flex-1 flex-row items-center justify-start bg-main elevation-md"
              style={{
                borderRadius: wp(4),
                gap: wp(5),
                padding: wp(5),
              }}
              onPress={() => navigation.navigate('CreateResume')}
            >
              <View
                className="bg-[#1b6eff] items-center justify-center"
                style={{ padding: wp(4), borderRadius: wp(4) }}
              >
                <Image
                  source={require('../../assets/icons/resumeIcon.png')}
                  style={{ width: wp(10), height: wp(10) }}
                />
              </View>
              <View className="flex-1">
                <Text
                  className="font-inriaBold text-white dark:text-dark-textColor"
                  style={{ fontSize: wp(5) }}
                >
                  {t('create-resume-header')}
                </Text>
                <Text
                  className="font-inriaRegular text-blue-300"
                  style={{ fontSize: wp(3) }}
                >
                  {t('create-resume-desc')}
                </Text>
              </View>
              <Feather name="chevron-right" size={wp(8)} color="#FFF" />
            </Pressable>
            <View className="flex-1 flex-row" style={{ gap: wp(5) }}>
              {/** Motivasyon Mektubu Oluştur Butonu */}
              <Pressable
                className="flex-1 items-center justify-center bg-[#f6edff] dark:bg-[#342359] elevation-md border border-purple-200/50"
                style={{
                  borderRadius: wp(4),
                  paddingHorizontal: wp(5),
                  gap: wp(1),
                }}
                onPress={() => navigation.navigate('CreateCoverLetter')}
              >
                <View
                  className="bg-white dark:bg-[#364153] items-center justify-center"
                  style={{ padding: wp(2), borderRadius: wp(3) }}
                >
                  {theme === 'LIGHT' ? (
                    <Image
                      source={require('../../assets/icons/coverLetterIconLight.png')}
                      style={{ width: wp(8), height: wp(8) }}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/icons/coverLetterIconDark.png')}
                      style={{ width: wp(8), height: wp(8) }}
                    />
                  )}
                </View>
                <Text
                  className="font-inriaBold text-center text-[#90168b] dark:text-[#e9d4ff]"
                  style={{ fontSize: wp(3) }}
                >
                  {t('create-cover-letter')}
                </Text>
              </Pressable>
              {/** Şablonlar Butonu */}
              <Pressable
                className="flex-1 items-center justify-center bg-[#fdecf5] dark:bg-[#421e3d] elevation-md border border-pink-200/50"
                style={{
                  borderRadius: wp(4),
                  paddingHorizontal: wp(5),
                  gap: wp(1),
                }}
                onPress={() => navigation.navigate('Templates')}
              >
                <View
                  className="bg-white dark:bg-[#364153] items-center justify-center"
                  style={{ padding: wp(2), borderRadius: wp(3) }}
                >
                  {theme === 'LIGHT' ? (
                    <Image
                      source={require('../../assets/icons/templatesIconLight.png')}
                      style={{ width: wp(8), height: wp(8) }}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/icons/templatesIconDark.png')}
                      style={{ width: wp(8), height: wp(8) }}
                    />
                  )}
                </View>
                <Text
                  className="font-inriaBold text-center text-textColor dark:text-[#fccedd]"
                  style={{ fontSize: wp(3) }}
                >
                  {t('templates')}
                </Text>
              </Pressable>
            </View>
          </View>
          {/** Özgeçmişlerim Bölgesi */}
          <View style={{ width: wp(100), paddingHorizontal: wp(5) }}>
            {/** Başlık ve Daha Fazla Butonu */}
            <View className="flex-row items-center justify-between">
              <Text
                className="text-main font-inriaBold"
                style={{
                  fontSize: wp(5),
                }}
              >
                {t('my-resumes')}
              </Text>
              <Pressable
                className="flex-row items-center justify-between"
                style={{
                  paddingVertical: wp(1),
                  paddingLeft: wp(2),
                  borderRadius: 9999,
                }}
                onPress={() => navigation.jumpTo('MyResumes')}
              >
                <Text
                  className="color-main dark:color-dark-textColor font-inriaRegular"
                  style={{
                    fontSize: wp(3),
                    lineHeight: wp(5),
                  }}
                >
                  {t('more')}
                </Text>
                <Feather name="chevron-right" size={wp(5)} color={iconColor} />
              </Pressable>
            </View>
            {/** Elemanlar */}
            <View style={{ gap: wp(2), paddingVertical: wp(3) }}>
              {isResumesLoading ? (
                <ShimmerListItem />
              ) : user?.isGuest ? (
                <Text className="text-gray-500 text-lg font-light">
                  {t('resume-login-required')}{' '}
                  <Text
                    onPress={() => navigation.navigate('Settings')}
                    className="text-gray-500 italic underline font-medium"
                  >
                    {t('login-now')}
                  </Text>
                </Text>
              ) : myResumes && myResumes.length > 0 ? (
                myResumes.map((item: any, index: number) => (
                  <ListItem
                    key={item.id}
                    index={index + 1}
                    title={item.name}
                    navigation={navigation}
                    file={item}
                    type={'resumes'}
                    fetchFunc={async () => await fetchData()}
                  />
                ))
              ) : (
                <Text className="text-gray-500 text-lg font-light">
                  {t('no-resume')}{' '}
                  <Text
                    onPress={() => navigation.navigate('CreateResume')}
                    className="text-gray-500 italic underline font-medium"
                  >
                    {t('create-now')}
                  </Text>
                </Text>
              )}
            </View>
          </View>
          {/** Motivasyon Mektuplarım Bölgesi */}
          <View style={{ width: wp(100), paddingHorizontal: wp(5) }}>
            {/** Başlık ve Daha Fazla Butonu */}
            <View className="flex-row items-center justify-between">
              <Text
                className="text-main font-inriaBold"
                style={{
                  fontSize: wp(5),
                }}
              >
                {t('my-cover-letters')}
              </Text>
              <Pressable
                className="flex-row items-center justify-between"
                style={{
                  paddingVertical: wp(1),
                  paddingLeft: wp(2),
                  borderRadius: 9999,
                }}
                onPress={() => navigation.jumpTo('MyCoverLetters')}
              >
                <Text
                  className="color-main dark:color-dark-textColor font-inriaRegular"
                  style={{
                    fontSize: wp(3),
                    lineHeight: wp(5),
                  }}
                >
                  {t('more')}
                </Text>
                <Feather name="chevron-right" size={wp(5)} color={iconColor} />
              </Pressable>
            </View>
            {/** Elemanlar */}
            <View style={{ gap: wp(2), paddingVertical: wp(3) }}>
              {isCoverLettersLoading ? (
                <ShimmerListItem />
              ) : user?.isGuest ? (
                <Text className="text-gray-500 text-lg font-light">
                  {t('coverletter-login-required')}{' '}
                  <Text
                    onPress={() => navigation.navigate('Settings')}
                    className="text-gray-500 italic underline font-medium"
                  >
                    {t('login-now')}
                  </Text>
                </Text>
              ) : myCoverLetters && myCoverLetters.length > 0 ? (
                myCoverLetters.map((item: any, index: number) => (
                  <ListItem
                    key={item.id}
                    index={index + 1}
                    title={item.name}
                    navigation={navigation}
                    file={item}
                    type="coverletters"
                    fetchFunc={async () => await fetchData()}
                  />
                ))
              ) : (
                <Text className="text-gray-500 text-lg font-light">
                  {t('no-coverletter')}{' '}
                  <Text
                    onPress={() => navigation.navigate('CreateCoverLetter')}
                    className="text-gray-500 italic underline font-medium"
                  >
                    {t('create-now')}
                  </Text>
                </Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </View>
  );
}
