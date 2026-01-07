/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterMetaInfo } from '../../types/coverLetterTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: CoverLetterMetaInfo;
  handleForward: (data: CoverLetterMetaInfo) => void;
};

export default function MetaInfoStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [metaInfo, setMetaInfo] = useState<CoverLetterMetaInfo>(initial);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(metaInfo);
    };
  }, [metaInfo]);

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
        {t('coverletter-step3-title')}
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setMetaInfo(prev => ({ ...prev, subject: value }))
          }
          value={metaInfo.subject}
          placeholder={t('coverletter-step3-field1')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setMetaInfo(prev => ({ ...prev, sentDate: value }))
          }
          value={metaInfo.sentDate}
          placeholder={t('coverletter-step3-field2')}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}
