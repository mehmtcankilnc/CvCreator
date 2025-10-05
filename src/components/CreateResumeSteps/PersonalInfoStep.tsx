/* eslint-disable react-native/no-inline-styles */
import { Text, View, ScrollView } from 'react-native';
import React from 'react';
import TextInput from '../TextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { PersonalInfo } from '../../types/resumeTypes';
import Button from '../Button';

type Props = {
  initial: PersonalInfo;
  handleForward: (data: PersonalInfo) => void;
};

const validationSchema = yup.object().shape({
  fullName: yup.string().required('Required'),
  jobTitle: yup.string().required('Required'),
  phoneNumber: yup.string().required('Required'),
  email: yup.string().required('Required'),
  link: yup.string().required('Required'),
});

export default function PersonalInfoStep({ handleForward, initial }: Props) {
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
        Personal Information
      </Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={initial}
        onSubmit={values => {
          console.log(values);
          handleForward(values);
        }}
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
                handleChangeText={handleChange('fullName')}
                handleBlur={handleBlur('fullName')}
                value={values.fullName}
                placeholder="Full Name"
                autoCapitalize="words"
              />
              <Text
                className="text-rejectColor"
                style={{
                  fontFamily: 'Kavoon-Regular',
                  color: '#C21D10',
                  fontSize: wp(2.5),
                }}
              >
                {touched.fullName && errors.fullName ? errors.fullName : ''}
              </Text>
            </View>
            <View>
              <TextInput
                handleChangeText={handleChange('jobTitle')}
                handleBlur={handleBlur('jobTitle')}
                value={values.jobTitle}
                placeholder="Job Title"
                autoCapitalize="words"
              />
              <Text
                className="text-rejectColor"
                style={{
                  fontFamily: 'Kavoon-Regular',
                  color: '#C21D10',
                  fontSize: wp(2.5),
                }}
              >
                {touched.jobTitle && errors.jobTitle ? errors.jobTitle : ''}
              </Text>
            </View>
            <View>
              <TextInput
                handleChangeText={handleChange('phoneNumber')}
                handleBlur={handleBlur('phoneNumber')}
                value={values.phoneNumber}
                placeholder="Phone Number"
                type="phone-pad"
              />
              <Text
                className="text-rejectColor"
                style={{
                  fontFamily: 'Kavoon-Regular',
                  color: '#C21D10',
                  fontSize: wp(2.5),
                }}
              >
                {touched.phoneNumber && errors.phoneNumber
                  ? errors.phoneNumber
                  : ''}
              </Text>
            </View>
            <View>
              <TextInput
                handleChangeText={handleChange('email')}
                handleBlur={handleBlur('email')}
                value={values.email}
                placeholder="Email"
                type="email-address"
                autoCapitalize="none"
              />
              <Text
                className="text-rejectColor"
                style={{
                  fontFamily: 'Kavoon-Regular',
                  color: '#C21D10',
                  fontSize: wp(2.5),
                }}
              >
                {touched.email && errors.email ? errors.email : ''}
              </Text>
            </View>
            <View>
              <TextInput
                handleChangeText={handleChange('link')}
                handleBlur={handleBlur('link')}
                value={values.link}
                placeholder="Link"
                autoCapitalize="none"
              />
              <Text
                className="text-rejectColor"
                style={{
                  fontFamily: 'Kavoon-Regular',
                  color: '#C21D10',
                  fontSize: wp(2.5),
                }}
              >
                {touched.link && errors.link ? errors.link : ''}
              </Text>
            </View>
            <Button handleSubmit={handleSubmit} text="Continue" />
          </>
        )}
      </Formik>
    </ScrollView>
  );
}
