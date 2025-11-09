/* eslint-disable react-native/no-inline-styles */
import { Text, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SummaryInfo } from '../../types/resumeTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';

type Props = {
  initial: SummaryInfo;
  handleForward: (data: SummaryInfo) => void;
};

export default function SummaryStep({ initial, handleForward }: Props) {
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
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Summary
      </Text>
      <TextInput
        handleChangeText={value =>
          setSummaryInfo(prev => ({ ...prev, text: value }))
        }
        value={summaryInfo.text}
        placeholder="Summary"
        multiline={true}
      />
    </ScrollView>
  );
}
