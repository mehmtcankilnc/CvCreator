import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import SearchBar from '../../components/SearchBar';
import MyFileCard, { FileRespModel } from '../../components/MyFileCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../../store/hooks';
import { GetMyCoverLetters } from '../../services/CoverLetterServices';
import { useFocusEffect } from '@react-navigation/native';
import ShimmerFileCard from '../../components/ShimmerFileCard';

type Props = {
  navigation: any;
};

export default function MyCoverLetters({ navigation }: Props) {
  const [myCoverLetters, setMyCoverLetters] = useState<Array<FileRespModel>>(
    [],
  );
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { isAnonymous, userId } = useAppSelector(state => state.auth);

  const fetchCoverLetters = useCallback(async () => {
    setIsLoading(true);
    if (!isAnonymous && userId) {
      try {
        const data = await GetMyCoverLetters(searchText);
        if (data) {
          const mappedCoverLetters = data.map((item: any) => ({
            id: item.id,
            name: item.fileName,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            storagePath: item.storagePath,
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
  }, [isAnonymous, userId, searchText]);

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

    if (isAnonymous) {
      return (
        <View
          className="flex-1 items-center justify-center"
          style={{ gap: wp(5) }}
        >
          <Text className="text-gray-500 text-lg text-center">
            You need to login via Google to save and access your cover letters.
          </Text>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Text className="text-gray-500 text-xl italic underline">
              Login Now
            </Text>
          </Pressable>
        </View>
      );
    }

    if (myCoverLetters.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No resumes found.</Text>
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
        title="My Cover Letters"
      />
      <Page>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {renderContent()}
      </Page>
    </View>
  );
}
