/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { ReferenceInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';

type Props = {
  initial: Array<ReferenceInfo>;
  handleForward: (data: Array<ReferenceInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ReferencesInfoStep({ initial, handleForward }: Props) {
  const [references, setReferences] = useState<ReferenceInfo[]>(
    initial.length > 0 ? initial : [{ fullName: '', contact: '' }],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledReferences = references.filter(
        ref => ref.fullName.trim() !== '' || ref.contact.trim() !== '',
      );

      handleForwardRef.current(filledReferences);
    };
  }, [references]);

  const handleAddNew = () => {
    const newReference: ReferenceInfo = {
      fullName: '',
      contact: '',
    };
    setReferences([...references, newReference]);
    setActiveIndex(references.length);
  };

  const handleInputChange = (
    index: number,
    field: keyof ReferenceInfo,
    value: string,
  ) => {
    const updatedReferences = [...references];
    updatedReferences[index][field] = value;
    setReferences(updatedReferences);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setReferences(prev => prev.filter((_, i) => i !== indexToDelete));

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
        References
      </Text>
      {references.map((ref, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={ref.fullName || `Reference #${i + 1}`}
        >
          <TextInput
            handleChangeText={value => handleInputChange(i, 'fullName', value)}
            value={ref.fullName}
            placeholder="Full Name"
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'contact', value)}
            value={ref.contact}
            placeholder="Contact"
            autoCapitalize="none"
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text="Delete This Reference"
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text="Add New Reference" />
    </ScrollView>
  );
}
