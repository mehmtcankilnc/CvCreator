/* eslint-disable react-native/no-inline-styles */
import { Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SummaryInfo } from '../../types/resumeTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: SummaryInfo;
  handleForward: (data: SummaryInfo) => void;
};

export default function SummaryStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [summaryInfo, setSummaryInfo] = useState<SummaryInfo>(initial);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(summaryInfo);
    };
  }, [summaryInfo]);

  return (
    <ScrollView contentContainerStyle={{ gap: wp(3) }} className="w-full">
      <Text
        className="color-textColor dark:color-dark-textColor"
        style={{
          fontFamily: 'InriaSerif-Bold',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        {t('resume-step2-title')}
      </Text>
      <TextInput
        handleChangeText={value =>
          setSummaryInfo(prev => ({ ...prev, text: value }))
        }
        value={summaryInfo.text}
        placeholder={t('resume-step2-title')}
        multiline={true}
      />
    </ScrollView>
  );
}
