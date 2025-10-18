/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView, LayoutAnimation } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ExperienceInfo } from '../../types/resumeTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Button from '../Button';
import AccordionItem from '../AccordionItem';
import TextInput from '../TextInput';

type Props = {
  initial: Array<ExperienceInfo>;
  handleForward: (data: Array<ExperienceInfo>) => void;
};

export default function ExperiencesInfoStep({ initial, handleForward }: Props) {
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
        style={{
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          color: '#585858',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Experiences
      </Text>
      {experiences.map((exp, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={exp.title || `Experience #${i + 1}`}
        >
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={exp.title}
            placeholder="Title"
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'company', value)}
            value={exp.company}
            placeholder="Company"
            autoCapitalize="words"
          />
          <View className="flex-row" style={{ gap: wp(3) }}>
            <View className="flex-1">
              <TextInput
                handleChangeText={value =>
                  handleInputChange(i, 'startDate', value)
                }
                value={exp.startDate}
                placeholder="Start Date"
              />
            </View>
            <View className="flex-1">
              <TextInput
                handleChangeText={value =>
                  handleInputChange(i, 'endDate', value)
                }
                value={exp.endDate}
                placeholder="End Date"
              />
            </View>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'text', value)}
            value={exp.text}
            placeholder="Description"
            multiline
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text="Delete This Experience"
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text="Add New Experience" />
    </ScrollView>
  );
}
