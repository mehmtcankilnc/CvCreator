/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ResumeTemplate } from '../../types/resumeTemplates';
import Icon from 'react-native-vector-icons/Feather';
import { resumeTemplatesData } from '../../data/resumeTemplatesData';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: ResumeTemplate;
  handleForward: (index: number) => void;
};

export const TemplateCard = ({
  template,
  isSelected,
  onPress,
}: {
  template: ResumeTemplate;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Pressable
      onPress={onPress}
      className={`border items-center justify-center ${
        isSelected
          ? 'border-main'
          : 'border-borderColor dark:border-dark-borderColor'
      }`}
      style={{
        width: wp(43),
        height: hp(25),
        borderRadius: wp(3),
        overflow: 'hidden',
      }}
    >
      {isLoading && <ActivityIndicator size="large" color="#4285F4" />}
      <Image
        source={template.img}
        className="absolute"
        resizeMode="contain"
        onLoadEnd={() => setIsLoading(false)}
        style={{ top: wp(2), width: wp(40), height: hp(21) }}
      />
      <Text className="absolute font-medium w-full text-center bottom-0 capitalize text-textColor dark:text-dark-textColor font-inriaRegular">
        {template.name}
      </Text>
      {isSelected && (
        <View
          className="absolute bg-main rounded-full items-center justify-center"
          style={{ width: wp(7), height: wp(7), top: wp(2), right: wp(2) }}
        >
          <Icon name="check" size={wp(5)} color="white" />
        </View>
      )}
    </Pressable>
  );
};

export default function TemplateSelectStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: wp(3) }}
      className="w-full"
    >
      <Text
        className="color-textColor dark:color-dark-textColor"
        style={{
          fontFamily: 'InriaSerif-Bold',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        {t('resume-step10-title')}
      </Text>
      <View
        className="flex-row flex-wrap justify-between"
        style={{ rowGap: wp(5) }}
      >
        {resumeTemplatesData.map(template => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={initial.id === template.id}
            onPress={() => handleForward(template.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
