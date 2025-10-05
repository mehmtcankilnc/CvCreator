import { View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import MultiStepForm from '../components/MultiStepForm';
import PersonalInfoStep from '../components/CreateResumeSteps/PersonalInfoStep';
import SummaryStep from '../components/CreateResumeSteps/SummaryStep';
import { PersonalInfo, ResumeFormValues } from '../types/resumeTypes';

type Props = {
  navigation: any;
};

const INITIAL_RESUME_VALUES: ResumeFormValues = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    phoneNumber: '',
    email: '',
    link: '',
  },
  summaryInfo: { text: '' },
  educationsInfo: [],
  experiencesInfo: [],
  certificatesInfo: [],
  skillsInfo: [],
  languagesInfo: [],
  referencesInfo: [],
};

export default function CreateResume({ navigation }: Props) {
  const [formValues, setFormValues] = useState<ResumeFormValues>(
    INITIAL_RESUME_VALUES,
  );

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 8;

  const stepForward = () =>
    setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev));
  const stepBack = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  const onPersonalInfoNext = (data: PersonalInfo) => {
    setFormValues(prev => ({ ...prev, personalInfo: data }));
    stepForward();
  };

  return (
    <View className="flex-1">
      <Header
        handlePress={() => navigation.goBack()}
        iconName="chevron-back"
        title="Create Your Resume"
      />
      <Page>
        <MultiStepForm currentStep={currentStep}>
          <PersonalInfoStep
            initial={formValues.personalInfo}
            handleForward={onPersonalInfoNext}
          />
          <SummaryStep
            initial={formValues.summaryInfo}
            handleForward={stepForward}
            handleBack={stepBack}
          />
        </MultiStepForm>
      </Page>
    </View>
  );
}
