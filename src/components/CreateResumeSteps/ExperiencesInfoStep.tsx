/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  Pressable,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ExperienceInfo } from '../../types/resumeTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from '../Button';
import AccordionItem from '../AccordionItem';
import TextInput from '../TextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: Array<ExperienceInfo>;
  handleForward: (data: Array<ExperienceInfo>) => void;
};

export default function ExperiencesInfoStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [experiences, setExperiences] = useState<ExperienceInfo[]>(
    initial.length > 0
      ? initial
      : [
          {
            isCurrent: false,
            title: '',
            company: '',
            startDate: '',
            endDate: '',
            text: '',
          },
        ],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledExperiences = experiences.filter(
        exp =>
          exp.title.trim() !== '' ||
          exp.startDate.trim() !== '' ||
          exp.company?.trim() !== '' ||
          exp.endDate?.trim() !== '' ||
          exp.text?.trim() !== '',
      );
      handleForwardRef.current(filledExperiences);
    };
  }, [experiences]);

  const handleAddNew = () => {
    const newExperience: ExperienceInfo = {
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      text: '',
    };
    setExperiences([...experiences, newExperience]);
    setActiveIndex(experiences.length);
  };

  const handleInputChange = <K extends keyof ExperienceInfo>(
    index: number,
    field: K,
    value: ExperienceInfo[K],
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setExperiences(prev => prev.filter((_, i) => i !== indexToDelete));

    if (activeIndex === indexToDelete) {
      setActiveIndex(-1);
    } else if (activeIndex > indexToDelete) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleToggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

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
        {t('resume-step3-title')}
      </Text>
      {experiences.map((exp, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={exp.title || `${t('resume-step3-text')} #${i + 1}`}
        >
          <View
            className="flex-row justify-end items-center"
            style={{ gap: wp(2) }}
          >
            <Pressable
              onPress={() => handleInputChange(i, 'isCurrent', !exp.isCurrent)}
              className={`flex-row items-center justify-center border-borderColor dark:border-dark-borderColor`}
              style={{
                width: wp(5),
                height: wp(5),
                borderRadius: wp(1.5),
                backgroundColor: exp.isCurrent ? '#1954E5' : 'transparent',
                borderWidth: exp.isCurrent ? 0 : 1,
              }}
            >
              {exp.isCurrent && (
                <Ionicons name="checkmark" size={wp(4)} color="#D9D9D9" />
              )}
            </Pressable>
            <Text
              className="color-textColor dark:color-dark-textColor"
              style={{
                fontFamily: 'Kavoon-Regular',
                fontSize: wp(3),
              }}
            >
              {t('present')}
            </Text>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={exp.title}
            placeholder={t('resume-step3-field1')}
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'company', value)}
            value={exp.company}
            placeholder={t('resume-step3-field2')}
            autoCapitalize="words"
          />
          <View className="flex-row items-center" style={{ gap: wp(3) }}>
            <View className="flex-1">
              <TextInput
                handleChangeText={value =>
                  handleInputChange(i, 'startDate', value)
                }
                value={exp.startDate}
                placeholder={t('resume-step3-field3')}
              />
            </View>
            <View className="flex-1">
              {exp.isCurrent ? (
                <Text
                  className="text-center color-textColor dark:color-dark-textColor"
                  style={{
                    fontFamily: 'Kavoon-Regular',
                    fontSize: wp(4),
                  }}
                >
                  - {t('present')}
                </Text>
              ) : (
                <TextInput
                  handleChangeText={value =>
                    handleInputChange(i, 'endDate', value)
                  }
                  value={exp.endDate}
                  placeholder={t('resume-step3-field4')}
                />
              )}
            </View>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'text', value)}
            value={exp.text}
            placeholder={t('resume-step3-field5')}
            multiline
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text={t('resume-step3-delete')}
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text={t('resume-step3-btn')} />
    </ScrollView>
  );
}
