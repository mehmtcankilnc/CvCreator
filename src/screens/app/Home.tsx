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
import { supabase } from '../../lib/supabase';
import { setUser } from '../../store/slices/authSlice';
import { GetMyCoverLetters } from '../../services/CoverLetterServices';
import ShimmerListItem from '../../components/ShimmerListItem';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: any;
};

export default function Home({ navigation }: Props) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  const iconColor = theme === 'LIGHT' ? '#1954E5' : '#D9D9D9';

  const FILE_NUMBER = 2;

  const { isAnonymous, userId } = useAppSelector(state => state.auth);
  const [myResumes, setMyResumes] = useState([]);
  const [isResumesLoading, setIsResumesLoading] = useState(!isAnonymous);
  const [myCoverLetters, setMyCoverLetters] = useState([]);
  const [isCoverLettersLoading, setIsCoverLettersLoading] = useState(
    !isAnonymous,
  );

  useEffect(() => {
    const ensureUserData = async () => {
      if (!isAnonymous && !userId) {
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
        }
      }
    };

    ensureUserData();
  }, [isAnonymous, userId, dispatch]);

  const fetchData = useCallback(async () => {
    if (!isAnonymous && userId) {
      setIsResumesLoading(true);
      const resumeData = await GetMyResumes('', FILE_NUMBER);
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
      const coverLetterData = await GetMyCoverLetters('', FILE_NUMBER);
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
    }
  }, [isAnonymous, userId]);

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
            className="flex-row justify-between"
            style={{
              width: wp(100),
              padding: wp(5),
              gap: wp(5),
              height: wp(60),
            }}
          >
            {/** Özgeçmiş Oluştur Butonu */}
            <Pressable
              className="flex-1 items-center justify-center bg-[#e5eded] dark:bg-[#122B29] elevation-md"
              style={{
                borderRadius: wp(4),
                gap: wp(5),
              }}
              onPress={() => navigation.navigate('CreateResume')}
            >
              {theme === 'LIGHT' ? (
                <Image
                  source={require('../../assets/icons/resumeIconLight.png')}
                  style={{ width: wp(20), height: wp(20) }}
                />
              ) : (
                <Image
                  source={require('../../assets/icons/resumeIconDark.png')}
                  style={{ width: wp(20), height: wp(20) }}
                />
              )}
              <Text
                className="font-kavoon text-center color-[#2D706C] dark:text-[#92D3CF]"
                style={{ fontSize: wp(4.5) }}
              >
                {t('create-resume')}
              </Text>
            </Pressable>
            <View className="flex-1" style={{ gap: wp(5) }}>
              {/** Motivasyon Mektubu Oluştur Butonu */}
              <Pressable
                className="flex-1 flex-row items-center justify-between bg-[#F6DDDB] dark:bg-[#50211E] elevation-md"
                style={{
                  borderRadius: wp(4),
                  paddingHorizontal: wp(5),
                  gap: wp(3),
                }}
                onPress={() => navigation.navigate('CreateCoverLetter')}
              >
                {theme === 'LIGHT' ? (
                  <Image
                    source={require('../../assets/icons/coverLetterIconLight.png')}
                    style={{ width: wp(10), height: wp(10) }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/coverLetterIconDark.png')}
                    style={{ width: wp(10), height: wp(10) }}
                  />
                )}
                <Text
                  className="font-kavoon text-center color-[#90542F] dark:text-[#D39B78]"
                  style={{ fontSize: wp(3) }}
                >
                  {t('create-cover-letter')}
                </Text>
              </Pressable>
              {/** Şablonlar Butonu */}
              <Pressable
                className="flex-1 flex-row items-center justify-between bg-[#DCDBF6] dark:bg-[#1F1E39] elevation-md"
                style={{ borderRadius: wp(4), paddingHorizontal: wp(5) }}
                onPress={() => navigation.navigate('Templates')}
              >
                {theme === 'LIGHT' ? (
                  <Image
                    source={require('../../assets/icons/templatesIconLight.png')}
                    style={{ width: wp(10), height: wp(10) }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icons/templatesIconDark.png')}
                    style={{ width: wp(10), height: wp(10) }}
                  />
                )}
                <Text
                  className="font-kavoon text-center color-[#553284] dark:text-[#A07DCE]"
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
                className="text-main"
                style={{
                  fontWeight: '800',
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
                  className="color-main dark:color-dark-textColor"
                  style={{
                    fontWeight: '500',
                    fontSize: wp(3),
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
              ) : isAnonymous ? (
                <Text className="text-gray-500 text-lg">
                  {t('resume-login-required')}{' '}
                  <Text
                    onPress={() => navigation.navigate('Settings')}
                    className="text-gray-500 italic underline"
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
                <Text className="text-gray-500 text-lg">
                  {t('no-resume')}{' '}
                  <Text
                    onPress={() => navigation.navigate('CreateResume')}
                    className="text-gray-500 italic underline"
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
                className="text-main"
                style={{
                  fontWeight: '800',
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
                  className="color-main dark:color-dark-textColor"
                  style={{
                    fontWeight: '500',
                    fontSize: wp(3),
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
              ) : isAnonymous ? (
                <Text className="text-gray-500 text-lg">
                  {t('coverletter-login-required')}{' '}
                  <Text
                    onPress={() => navigation.navigate('Settings')}
                    className="text-gray-500 italic underline"
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
                <Text className="text-gray-500 text-lg">
                  {t('no-coverletter')}{' '}
                  <Text
                    onPress={() => navigation.navigate('CreateCoverLetter')}
                    className="text-gray-500 italic underline"
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
