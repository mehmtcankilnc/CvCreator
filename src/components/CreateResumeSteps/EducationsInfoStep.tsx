/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { EducationInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';

type Props = {
  initial: Array<EducationInfo>;
  handleForward: (data: Array<EducationInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EducationsInfoStep({ initial, handleForward }: Props) {
  const [educations, setEducations] = useState<EducationInfo[]>(
    initial.length > 0
      ? initial
      : [
          {
            isCurrent: false,
            title: '',
            startDate: '',
            endDate: '',
            institute: '',
            gpa: '',
          },
        ],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledEducations = educations.filter(
        edu =>
          edu.title.trim() !== '' ||
          edu.institute.trim() !== '' ||
          edu.startDate.trim() !== '' ||
          edu.endDate?.trim() !== '' ||
          edu.gpa?.trim() !== '',
      );

      handleForwardRef.current(filledEducations);
    };
  }, [educations]);

  const handleAddNew = () => {
    const newEducation: EducationInfo = {
      title: '',
      startDate: '',
      endDate: '',
      institute: '',
      gpa: '',
    };
    setEducations([...educations, newEducation]);
    setActiveIndex(educations.length);
  };

  const handleInputChange = <K extends keyof EducationInfo>(
    index: number,
    field: K,
    value: EducationInfo[K],
  ) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setEducations(prev => prev.filter((_, i) => i !== indexToDelete));

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
        Educations
      </Text>
      {educations.map((edu, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={edu.title || `Education #${i + 1}`}
        >
          <View
            className="flex-row justify-end items-center"
            style={{ gap: wp(2) }}
          >
            <Pressable
              onPress={() => handleInputChange(i, 'isCurrent', !edu.isCurrent)}
              className={`flex-row items-center justify-center border-borderColor dark:border-dark-borderColor`}
              style={{
                width: wp(5),
                height: wp(5),
                borderRadius: wp(1.5),
                backgroundColor: edu.isCurrent ? '#1954E5' : 'transparent',
                borderWidth: edu.isCurrent ? 0 : 1,
              }}
            >
              {edu.isCurrent && (
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
              Present
            </Text>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={edu.title}
            placeholder="Title*"
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'institute', value)}
            value={edu.institute}
            placeholder="Institute*"
            autoCapitalize="words"
          />
          <View className="flex-row items-center" style={{ gap: wp(3) }}>
            <View className="flex-1">
              <TextInput
                handleChangeText={value =>
                  handleInputChange(i, 'startDate', value)
                }
                value={edu.startDate}
                placeholder="Start Date*"
              />
            </View>
            <View className="flex-1">
              {edu.isCurrent ? (
                <Text
                  className="text-center color-textColor dark:color-dark-textColor"
                  style={{
                    fontFamily: 'Kavoon-Regular',
                    fontSize: wp(4),
                  }}
                >
                  - Present
                </Text>
              ) : (
                <TextInput
                  handleChangeText={value =>
                    handleInputChange(i, 'endDate', value)
                  }
                  value={edu.endDate}
                  placeholder="End Date"
                />
              )}
            </View>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'gpa', value)}
            value={edu.gpa}
            placeholder="GPA"
            autoCapitalize="none"
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text="Delete This Education"
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text="Add New Education" />
    </ScrollView>
  );
}
