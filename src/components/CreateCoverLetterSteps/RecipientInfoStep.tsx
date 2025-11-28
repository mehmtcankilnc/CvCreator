/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterRecipientInfo } from '../../types/coverLetterTypes';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  initial: CoverLetterRecipientInfo;
  handleForward: (data: CoverLetterRecipientInfo) => void;
};

export default function RecipientInfoStep({ initial, handleForward }: Props) {
  const [recipientInfo, setRecipientInfo] =
    useState<CoverLetterRecipientInfo>(initial);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(recipientInfo);
    };
  }, [recipientInfo]);

  return (
    <View style={{ gap: wp(3) }} className="w-full">
      <Text
        className="color-textColor dark:color-dark-textColor"
        style={{
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Receiver Information
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setRecipientInfo(prev => ({ ...prev, companyName: value }))
          }
          value={recipientInfo.companyName}
          placeholder="Company Name*"
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setRecipientInfo(prev => ({ ...prev, hiringManagerName: value }))
          }
          value={recipientInfo.hiringManagerName}
          placeholder="Hiring Manager Name*"
          autoCapitalize="words"
        />
      </View>
    </View>
  );
}
