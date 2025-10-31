/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable, FlatList } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { languageData } from '../data/languageData';
import { useAppSelector } from '../store/hooks';

type Props = {
  onSelect: (lang: string) => void;
};

export default function LanguageSettingsContent({ onSelect }: Props) {
  const { lang } = useAppSelector(state => state.language);

  return (
    <View style={{ gap: wp(3), padding: wp(5), paddingBottom: wp(15) }}>
      {languageData && (
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={languageData}
          contentContainerStyle={{ gap: wp(3) }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSelect(item.flag)}
              className="flex-row items-center justify-between"
              style={{ gap: wp(3) }}
              disabled={lang === item.flag}
            >
              <Text
                style={{
                  fontFamily: 'Kavoon-Regular',
                  fontSize: wp(5),
                  fontWeight: '600',
                  color: '#585858',
                }}
              >
                {item.name}
              </Text>
              {lang === item.flag && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={wp(8)}
                  color="#1810C2"
                />
              )}
            </Pressable>
          )}
        />
      )}

      <View className="border-b w-full border-b-borderColor" />
    </View>
  );
}
