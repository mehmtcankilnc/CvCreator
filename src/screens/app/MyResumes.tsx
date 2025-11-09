import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { GetMyResumes } from '../../services/ResumeServices';
import { useAppSelector } from '../../store/hooks';
import MyResumeCard, { ResumeRespModel } from '../../components/MyResumeCard';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  navigation: any;
};

export default function MyResumes({ navigation }: Props) {
  const [myResumes, setMyResumes] = useState<Array<ResumeRespModel>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isUserAnon = useAppSelector(state => state.auth.isAnonymous);
  const userId = useAppSelector(state => state.auth.userId);

  useEffect(() => {
    const fetchResumes = async () => {
      setIsLoading(true);
      if (!isUserAnon && userId) {
        try {
          const data = await GetMyResumes(userId);
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
  }, [isUserAnon, userId]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1810C2" />
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
      <FlatList
        data={myResumes}
        contentContainerStyle={{ margin: wp(3), gap: wp(3) }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MyResumeCard resume={item} />}
      />
    );
  };

  return (
    <View className="flex-1">
      <Header
        handlePress={() => navigation.toggleDrawer()}
        title="My Resumes"
      />
      <Page>
        <View className="flex-1 w-full" style={{ marginBottom: wp(5) }}>
          {renderContent()}
        </View>
      </Page>
    </View>
  );
}
