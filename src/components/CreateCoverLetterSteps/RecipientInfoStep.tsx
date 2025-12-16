/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterRecipientInfo } from '../../types/coverLetterTypes';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: CoverLetterRecipientInfo;
  handleForward: (data: CoverLetterRecipientInfo) => void;
};

export default function RecipientInfoStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

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
        {t('coverletter-step2-title')}
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setRecipientInfo(prev => ({ ...prev, companyName: value }))
          }
          value={recipientInfo.companyName}
          placeholder={t('coverletter-step2-field1')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setRecipientInfo(prev => ({ ...prev, hiringManagerName: value }))
          }
          value={recipientInfo.hiringManagerName}
          placeholder={t('coverletter-step2-field2')}
          autoCapitalize="words"
        />
      </View>
    </View>
  );
}
