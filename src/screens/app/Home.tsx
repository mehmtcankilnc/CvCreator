/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import ListItem from '../../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppSelector } from '../../store/hooks';

type Props = {
  navigation: any;
};

export default function Home({ navigation }: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const iconColor = theme === 'LIGHT' ? '#1954E5' : '#D9D9D9';

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
              {Array.from({ length: 2 }, (_, i) => (
                <ListItem key={i} index={i + 1} title="MehmetcanKilinc_CV" />
              ))}
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
              {Array.from({ length: 2 }, (_, i) => (
                <ListItem
                  key={i}
                  index={i + 1}
                  title="MehmetcanK_CoverLetter"
                />
              ))}
            </View>
          </View>
        </View>
        <Pressable
          onPress={async () =>
            await AsyncStorage.removeItem('hasShowedOnboarding')
          }
        >
          <Text>Onboarding refresh</Text>
        </Pressable>
      </Page>
    </View>
  );
}
