import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { GetMyResumes } from '../../services/ResumeServices';
import MyFileCard, { FileRespModel } from '../../components/MyFileCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from '../../components/SearchBar';
import ShimmerFileCard from '../../components/ShimmerFileCard';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: any;
};

export default function MyResumes({ navigation }: Props) {
  const { t } = useTranslation();
  const { user, authenticatedFetch } = useAuth();

  const [myResumes, setMyResumes] = useState<Array<FileRespModel>>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchResumes = useCallback(async () => {
    setIsLoading(true);
    if (!user?.isGuest && user?.id) {
      try {
        const data = await GetMyResumes(authenticatedFetch, searchText);
        if (data) {
          const mappedResumes = data.map((item: any) => ({
            id: item.id,
            name: item.fileName,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));
          setMyResumes(mappedResumes);
        }
      } catch (error) {
        console.error('Error fetching resumes:', error);
        setMyResumes([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setMyResumes([]);
    }
  }, [user?.isGuest, user?.id, authenticatedFetch, searchText]);

  useFocusEffect(
    useCallback(() => {
      fetchResumes();
    }, [fetchResumes]),
  );

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
    }, []),
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="w-full flex-1">
          <ShimmerFileCard />
        </View>
      );
    }

    if (user?.isGuest) {
      return (
        <View
          className="flex-1 items-center justify-center"
          style={{ gap: wp(5) }}
        >
          <Text className="text-gray-500 text-lg text-center font-inriaRegular">
            {t('resume-login-required')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Text className="text-gray-500 text-xl italic underline font-inriaBold">
              {t('login-now')}
            </Text>
          </Pressable>
        </View>
      );
    }

    if (myResumes.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg font-inriaBold">
            {t('no-resume')}
          </Text>
        </View>
      );
    }

    return (
      <View className="w-full flex-1">
        <FlatList
          data={myResumes}
          contentContainerStyle={{ padding: wp(3), gap: wp(3) }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MyFileCard
              file={item}
              type="resumes"
              navigation={navigation}
              fetchFunc={async () => await fetchResumes()}
            />
          )}
          showsVerticalScrollIndicator={false}
          bounces={false}
        />
      </View>
    );
  };

  return (
    <View className="flex-1">
      <Header
        handlePress={() => navigation.toggleDrawer()}
        title={t('my-resumes')}
      />
      <Page>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {renderContent()}
      </Page>
    </View>
  );
}
