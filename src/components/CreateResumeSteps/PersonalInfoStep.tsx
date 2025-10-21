/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PersonalInfo } from '../../types/resumeTypes';

type Props = {
  initial: PersonalInfo;
  handleForward: (data: PersonalInfo) => void;
};

export default function PersonalInfoStep({ handleForward, initial }: Props) {
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
        style={{
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          color: '#585858',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Personal Information
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, fullName: value }))
          }
          value={personalInfo.fullName}
          placeholder="Full Name*"
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, jobTitle: value }))
          }
          value={personalInfo.jobTitle}
          placeholder="Job Title"
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, phoneNumber: value }))
          }
          value={personalInfo.phoneNumber}
          placeholder="Phone Number"
          type="phone-pad"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, email: value }))
          }
          value={personalInfo.email}
          placeholder="Email*"
          type="email-address"
          autoCapitalize="none"
        />
        <TextInput
          handleChangeText={value =>
            setPersonalInfo(prev => ({ ...prev, website: value }))
          }
          value={personalInfo.website}
          placeholder="Link"
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
