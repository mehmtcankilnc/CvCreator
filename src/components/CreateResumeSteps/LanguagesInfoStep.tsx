/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { LanguageInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';

type Props = {
  initial: Array<LanguageInfo>;
  handleForward: (data: Array<LanguageInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function LanguagesInfoStep({ initial, handleForward }: Props) {
  const [languages, setLanguages] = useState<LanguageInfo[]>(
    initial.length > 0 ? initial : [{ title: '', scale: '' }],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledLanguages = languages.filter(
        lang => lang.title.trim() !== '',
      );

      handleForwardRef.current(filledLanguages);
    };
  }, [languages]);

  const handleAddNew = () => {
    const newLanguage: LanguageInfo = {
      title: '',
      scale: '',
    };
    setLanguages([...languages, newLanguage]);
    setActiveIndex(languages.length);
  };

  const handleInputChange = (
    index: number,
    field: keyof LanguageInfo,
    value: string,
  ) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index][field] = value;
    setLanguages(updatedLanguages);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setLanguages(prev => prev.filter((_, i) => i !== indexToDelete));

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
        Languages
      </Text>
      {languages.map((lang, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={lang.title || `Language #${i + 1}`}
        >
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={lang.title}
            placeholder="Title"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'scale', value)}
            value={lang.scale}
            placeholder="Scale"
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text="Delete This Language"
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text="Add New Language" />
    </ScrollView>
  );
}
