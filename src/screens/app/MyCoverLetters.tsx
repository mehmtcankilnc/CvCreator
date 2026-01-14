import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import SearchBar from '../../components/SearchBar';
import MyFileCard, { FileRespModel } from '../../components/MyFileCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { GetMyCoverLetters } from '../../services/CoverLetterServices';
import { useFocusEffect } from '@react-navigation/native';
import ShimmerFileCard from '../../components/ShimmerFileCard';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

type Props = {
  navigation: any;
};

export default function MyCoverLetters({ navigation }: Props) {
  const { t } = useTranslation();
  const { user, authenticatedFetch } = useAuth();

  const [myCoverLetters, setMyCoverLetters] = useState<Array<FileRespModel>>(
    [],
  );
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoverLetters = useCallback(async () => {
    setIsLoading(true);
    if (!user?.isGuest && user?.id) {
      try {
        const data = await GetMyCoverLetters(authenticatedFetch, searchText);
        if (data) {
          const mappedCoverLetters = data.map((item: any) => ({
            id: item.id,
            name: item.fileName,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));
          setMyCoverLetters(mappedCoverLetters);
        }
      } catch (error) {
        console.error('Error fetching coverletters:', error);
        setMyCoverLetters([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setMyCoverLetters([]);
    }
  }, [user?.isGuest, user?.id, authenticatedFetch, searchText]);

  useFocusEffect(
    useCallback(() => {
      fetchCoverLetters();
    }, [fetchCoverLetters]),
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
            {t('coverletter-login-required')}
          </Text>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Text className="text-gray-500 text-xl italic underline">
              {t('login-now')}
            </Text>
          </Pressable>
        </View>
      );
    }

    if (myCoverLetters.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg font-inriaBold">
            {t('no-coverletter')}
          </Text>
        </View>
      );
    }

    return (
      <View className="w-full flex-1">
        <FlatList
          data={myCoverLetters}
          contentContainerStyle={{ padding: wp(3), gap: wp(3) }}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MyFileCard
              file={item}
              type="coverletters"
              navigation={navigation}
              fetchFunc={async () => await fetchCoverLetters()}
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
        title={t('my-cover-letters')}
      />
      <Page>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {renderContent()}
      </Page>
    </View>
  );
}
