import { View, Text, FlatList, Pressable } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { GetMyResumes } from '../../services/ResumeServices';
import { useAppSelector } from '../../store/hooks';
import MyFileCard, { FileRespModel } from '../../components/MyFileCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchBar from '../../components/SearchBar';
import ShimmerFileCard from '../../components/ShimmerFileCard';

type Props = {
  navigation: any;
};

export default function MyResumes({ navigation }: Props) {
  const [myResumes, setMyResumes] = useState<Array<FileRespModel>>([]);
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
            const data = await GetMyResumes(searchText);
            if (data) {
              const mappedResumes = data.map((item: any) => ({
                id: item.id,
                name: item.fileName,
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
                storagePath: item.storagePath,
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
        <View className="w-full flex-1">
          <ShimmerFileCard />
        </View>
      );
    }

    if (isUserAnon) {
      return (
        <View
          className="flex-1 items-center justify-center"
          style={{ gap: wp(5) }}
        >
          <Text className="text-gray-500 text-lg text-center">
            You need to login via Google to save and access your resumes.
          </Text>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <Text className="text-gray-500 text-xl italic underline">
              Login Now
            </Text>
          </Pressable>
        </View>
      );
    }

    if (myResumes.length === 0) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">No resumes found.</Text>
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
            <MyFileCard file={item} type="resumes" navigation={navigation} />
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
        title="My Resumes"
      />
      <Page>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        {renderContent()}
      </Page>
    </View>
  );
}
