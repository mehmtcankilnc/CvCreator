/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SkillInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';

type Props = {
  initial: Array<SkillInfo>;
  handleForward: (data: Array<SkillInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SkillsInfoStep({ initial, handleForward }: Props) {
  const [skills, setSkills] = useState<SkillInfo[]>(
    initial.length > 0 ? initial : [{ title: '', scale: '' }],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledSkills = skills.filter(skill => skill.title.trim() !== '');
      handleForwardRef.current(filledSkills);
    };
  }, [skills]);

  const handleAddNew = () => {
    const newSkill: SkillInfo = {
      title: '',
      scale: '',
    };
    setSkills([...skills, newSkill]);
    setActiveIndex(skills.length);
  };

  const handleInputChange = (
    index: number,
    field: keyof SkillInfo,
    value: string,
  ) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setSkills(prev => prev.filter((_, i) => i !== indexToDelete));

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
        Skills
      </Text>
      {skills.map((skill, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={skill.title || `Skill #${i + 1}`}
        >
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={skill.title}
            placeholder="Skill"
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'scale', value)}
            value={skill.scale}
            placeholder="Level (e.g., Advanced, 4/5)"
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text="Delete This Skill"
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text="Add New Skill" />
    </ScrollView>
  );
}
