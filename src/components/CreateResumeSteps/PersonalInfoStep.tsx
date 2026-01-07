/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PersonalInfo } from '../../types/resumeTypes';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: PersonalInfo;
  handleForward: (data: PersonalInfo) => void;
};

export default function PersonalInfoStep({ handleForward, initial }: Props) {
  const { t } = useTranslation();

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initial);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(personalInfo);
    };
  }, [personalInfo]);

  return (
    <View style={{ gap: wp(3) }} className="w-full">
      <Text
        className="color-textColor dark:color-dark-textColor"
        style={{
          fontFamily: 'InriaSerif-Bold',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        {t('resume-step1-title')}
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, fullName: value }))
          }
          value={personalInfo.fullName}
          placeholder={t('resume-step1-field1')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, jobTitle: value }))
          }
          value={personalInfo.jobTitle}
          placeholder={t('resume-step1-field2')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, phoneNumber: value }))
          }
          value={personalInfo.phoneNumber}
          placeholder={t('resume-step1-field3')}
          type="phone-pad"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, email: value }))
          }
          value={personalInfo.email}
          placeholder={t('resume-step1-field4')}
          type="email-address"
          autoCapitalize="none"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, website: value }))
          }
          value={personalInfo.website}
          placeholder={t('resume-step1-field5')}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
