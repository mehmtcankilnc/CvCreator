/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterContent } from '../../types/coverLetterTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';

type Props = {
  initial: CoverLetterContent;
  handleForward: (data: CoverLetterContent) => void;
};

export default function ContentStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [content, setContent] = useState<CoverLetterContent>(initial);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(content);
    };
  }, [content]);

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
        {t('coverletter-step4-title')}
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, salutation: value }))
          }
          value={content.salutation}
          placeholder={t('coverletter-step4-field1')}
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, introduction: value }))
          }
          value={content.introduction}
          placeholder={t('coverletter-step4-field2')}
          multiline={true}
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, body: value }))
          }
          value={content.body}
          placeholder={t('coverletter-step4-field3')}
          multiline={true}
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, conclusion: value }))
          }
          value={content.conclusion}
          placeholder={t('coverletter-step4-field4')}
          multiline={true}
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, signOff: value }))
          }
          value={content.signOff}
          placeholder={t('coverletter-step4-field5')}
          multiline={true}
        />
      </View>
    </View>
  );
}
