/* eslint-disable react-native/no-inline-styles */
import { ScrollView, Text, View, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ResumeTemplate } from '../../types/resumeTemplates';
import { resumeTemplatesData } from '../../data/resumeTemplatesData';

type Props = {
  initial: ResumeTemplate;
  handleForward: (index: number) => void;
};

export default function TemplateSelectStep({ initial, handleForward }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: wp(3) }}
      className="w-full"
    >
      <Text
        className="color-textColor dark:color-dark-textColor"
        style={{
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Choose a Resume Template
      </Text>
      <View className="flex-row" style={{ gap: wp(5) }}>
        {resumeTemplatesData.map(template => (
          <Pressable
            onPress={() => handleForward(template.id)}
            key={template.id}
            className={`flex-1 border ${
              initial.id === template.id
                ? 'border-main'
                : 'border-borderColor dark:border-dark-borderColor'
            }`}
            style={{ height: wp(50), borderRadius: wp(3) }}
          >
            <Text>{template.name}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
