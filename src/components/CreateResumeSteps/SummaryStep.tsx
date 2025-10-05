/* eslint-disable react-native/no-inline-styles */
import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SummaryInfo } from '../../types/resumeTypes';
import * as yup from 'yup';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Formik } from 'formik';
import TextInput from '../TextInput';
import Button from '../Button';

type Props = {
  initial: SummaryInfo;
  handleForward: (data: SummaryInfo) => void;
  handleBack: (data: SummaryInfo) => void;
};

const validationSchema = yup.object().shape({
  text: yup.string().required('Required'),
});

export default function SummaryStep({
  initial,
  handleForward,
  handleBack,
}: Props) {
  return (
    <ScrollView contentContainerStyle={{ gap: wp(3) }} className="w-full">
      <Text
        style={{
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          color: '#585858',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Summary
      </Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={initial}
        onSubmit={values => handleForward(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View>
              <TextInput
                handleChangeText={handleChange('text')}
                handleBlur={handleBlur('text')}
                value={values.text}
                placeholder="Summary"
              />
              <Text
                className="text-rejectColor"
                style={{
                  fontFamily: 'Kavoon-Regular',
                  color: '#C21D10',
                  fontSize: wp(2.5),
                }}
              >
                {touched.text && errors.text ? errors.text : ''}
              </Text>
            </View>
            <View className="flex-row justify-between" style={{ gap: wp(3) }}>
              <Button
                handleSubmit={() => handleBack(values)}
                text="Back"
                type="back"
              />
              <Button handleSubmit={handleSubmit} text="Continue" />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
}
