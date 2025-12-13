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

type Props = {
  navigation: any;
};

export default function Home({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector(state => state.theme);
  const iconColor = theme === 'LIGHT' ? '#1954E5' : '#D9D9D9';

  const FILE_NUMBER = 2;

  const { isAnonymous, userId } = useAppSelector(state => state.auth);
  const [myResumes, setMyResumes] = useState([]);
  const [isResumesLoading, setIsResumesLoading] = useState(true);
  const [myCoverLetters, setMyCoverLetters] = useState([]);
  const [isCoverLettersLoading, setIsCoverLettersLoading] = useState(true);

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
              gap: wp(3),
              height: wp(50),
            }}
          >
            <View className="flex-1" style={{ gap: wp(3) }}>
              {/** Özgeçmiş Oluştur Butonu */}
              <Pressable
                className="flex-1 flex-row items-center justify-between bg-[#F6F2DB] dark:bg-[#58512B] elevation-md"
                style={{
                  borderRadius: wp(4),
                  paddingHorizontal: wp(5),
                }}
                onPress={() => navigation.navigate('CreateResume')}
              >
                <Image
                  source={require('../../assets/icons/resumeIcon.png')}
                  style={{ width: wp(10), height: wp(10) }}
                />
                <Text
                  className="font-kavoon text-center color-textColor dark:text-dark-textColor"
                  style={{ fontSize: wp(3.5) }}
                >
                  Create your{'\n'}resume
                </Text>
              </Pressable>
              {/** Motivasyon Mektubu Oluştur Butonu */}
              <Pressable
                className="flex-1 flex-row items-center justify-between bg-[#F6DDDB] dark:bg-[#50211E] elevation-md"
                style={{
                  borderRadius: wp(4),
                  paddingHorizontal: wp(5),
                }}
                onPress={() => navigation.navigate('CreateCoverLetter')}
              >
                <Image
                  source={require('../../assets/icons/coverLetterIcon.png')}
                  style={{ width: wp(10), height: wp(10) }}
                />
                <Text
                  className="font-kavoon text-center color-textColor dark:text-dark-textColor"
                  style={{ fontSize: wp(3.5) }}
                >
                  Create your{'\n'}cover letter
                </Text>
              </Pressable>
            </View>
            {/** Şablonlar Butonu */}
            <Pressable
              className="flex-1 items-center justify-between bg-[#DCDBF6] dark:bg-[#1F1E39] elevation-md"
              style={{ borderRadius: wp(4), paddingVertical: wp(5) }}
              onPress={() => navigation.navigate('Templates')}
            >
              <Image
                source={require('../../assets/icons/templatesIcon.png')}
                style={{ width: wp(15), height: wp(15) }}
              />
              <Text
                className="font-kavoon text-center color-textColor dark:text-dark-textColor"
                style={{ fontSize: wp(3.5) }}
              >
                Explore all{'\n'}templates
              </Text>
            </Pressable>
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
                My Resumes
              </Text>
              <Pressable
                className="flex-row items-center justify-between bg-[#DCDBF6] dark:bg-main"
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
                  More
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
                  You need to login via Google to save and access your resumes.{' '}
                  <Text
                    onPress={() => navigation.navigate('Settings')}
                    className="text-gray-500 italic underline"
                  >
                    Login Now
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
                  You don't have any saved resumes.{' '}
                  <Text
                    onPress={() => navigation.navigate('CreateResume')}
                    className="text-gray-500 italic underline"
                  >
                    Create Now
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
                My Cover Letters
              </Text>
              <Pressable
                className="flex-row items-center justify-between bg-[#DCDBF6] dark:bg-main"
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
                  More
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
                  You need to login via Google to save and access your cover
                  letters.{' '}
                  <Text
                    onPress={() => navigation.navigate('Settings')}
                    className="text-gray-500 italic underline"
                  >
                    Login Now
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
                  You don't have any saved cover letters.{' '}
                  <Text
                    onPress={() => navigation.navigate('CreateCoverLetter')}
                    className="text-gray-500 italic underline"
                  >
                    Login Now
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
