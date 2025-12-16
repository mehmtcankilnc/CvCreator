/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterSenderInfo } from '../../types/coverLetterTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: CoverLetterSenderInfo;
  handleForward: (data: CoverLetterSenderInfo) => void;
};

export default function SenderInfoStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [senderInfo, setSenderInfo] = useState<CoverLetterSenderInfo>(initial);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(senderInfo);
    };
  }, [senderInfo]);

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
        {t('coverletter-step1-title')}
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setSenderInfo(prev => ({ ...prev, fullName: value }))
          }
          value={senderInfo.fullName}
          placeholder={t('coverletter-step1-field1')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setSenderInfo(prev => ({ ...prev, jobTitle: value }))
          }
          value={senderInfo.jobTitle}
          placeholder={t('coverletter-step1-field2')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setSenderInfo(prev => ({ ...prev, phoneNumber: value }))
          }
          value={senderInfo.phoneNumber}
          placeholder={t('coverletter-step1-field3')}
          type="phone-pad"
        />
        <TextInput
          handleChangeText={value =>
            setSenderInfo(prev => ({ ...prev, email: value }))
          }
          value={senderInfo.email}
          placeholder={t('coverletter-step1-field4')}
          type="email-address"
          autoCapitalize="none"
        />
        <TextInput
          handleChangeText={value =>
            setSenderInfo(prev => ({ ...prev, website: value }))
          }
          value={senderInfo.website}
          placeholder={t('coverletter-step1-field5')}
          autoCapitalize="none"
        />
        <TextInput
          handleChangeText={value =>
            setSenderInfo(prev => ({ ...prev, address: value }))
          }
          value={senderInfo.address}
          placeholder={t('coverletter-step1-field6')}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
