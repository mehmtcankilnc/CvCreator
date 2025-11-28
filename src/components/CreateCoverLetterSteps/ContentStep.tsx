/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterContent } from '../../types/coverLetterTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';

type Props = {
  initial: CoverLetterContent;
  handleForward: (data: CoverLetterContent) => void;
};

export default function ContentStep({ initial, handleForward }: Props) {
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
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Content
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, salutation: value }))
          }
          value={content.salutation}
          placeholder="Salutation*"
          autoCapitalize="words"
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, introduction: value }))
          }
          value={content.introduction}
          placeholder="Introduction*"
          multiline={true}
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, body: value }))
          }
          value={content.body}
          placeholder="Content*"
          multiline={true}
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, conclusion: value }))
          }
          value={content.conclusion}
          placeholder="Conclusion*"
          multiline={true}
        />
        <TextInput
          handleChangeText={value =>
            setContent(prev => ({ ...prev, signOff: value }))
          }
          value={content.signOff}
          placeholder="Sign Off*"
          multiline={true}
        />
      </View>
    </View>
  );
}
