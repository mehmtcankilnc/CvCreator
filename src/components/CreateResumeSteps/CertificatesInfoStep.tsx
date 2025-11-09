/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CertificateInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';

type Props = {
  initial: Array<CertificateInfo>;
  handleForward: (data: Array<CertificateInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CertificatesInfoStep({
  initial,
  handleForward,
}: Props) {
  const [certificates, setCertificates] = useState<CertificateInfo[]>(
    initial.length > 0
      ? initial
      : [{ title: '', issuer: '', date: '', link: '' }],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledCertificates = certificates.filter(
        cert => cert.title.trim() !== '',
      );

      handleForwardRef.current(filledCertificates);
    };
  }, [certificates]);

  const handleAddNew = () => {
    const newCertificate: CertificateInfo = {
      title: '',
      issuer: '',
      date: '',
      link: '',
    };
    setCertificates([...certificates, newCertificate]);
    setActiveIndex(certificates.length);
  };

  const handleInputChange = (
    index: number,
    field: keyof CertificateInfo,
    value: string,
  ) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setCertificates(prev => prev.filter((_, i) => i !== indexToDelete));

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
        Certificates
      </Text>
      {certificates.map((cert, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={cert.title || `Certificate #${i + 1}`}
        >
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={cert.title}
            placeholder="Title"
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'issuer', value)}
            value={cert.issuer}
            placeholder="Issuer"
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'date', value)}
            value={cert.date}
            placeholder="Date"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'link', value)}
            value={cert.link}
            placeholder="Verification Link"
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text="Delete This Certificate"
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text="Add New Certificate" />
    </ScrollView>
  );
}
