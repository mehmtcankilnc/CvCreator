import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import SearchBar from '../../components/SearchBar';
import MyFileCard, { FileRespModel } from '../../components/MyFileCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../../store/hooks';
import { GetMyCoverLetters } from '../../services/CoverLetterServices';
import { useFocusEffect } from '@react-navigation/native';

type Props = {
  navigation: any;
};

export default function MyCoverLetters({ navigation }: Props) {
  const [myCoverLetters, setMyCoverLetters] = useState<Array<FileRespModel>>(
    [],
  );
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const isUserAnon = useAppSelector(state => state.auth.isAnonymous);
  const userId = useAppSelector(state => state.auth.userId);

  useFocusEffect(
    useCallback(() => {
      const fetchResumes = async () => {
        setIsLoading(true);
        if (!isUserAnon && userId) {
          try {
            const data = await GetMyCoverLetters(userId, searchText);
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
      };

      fetchResumes();
    }, [isUserAnon, searchText, userId]),
  );

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
    }, []),
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1810C2" />
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
            <MyFileCard file={item} type="coverletters" />
          )}
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
