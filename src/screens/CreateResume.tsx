/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  CertificateInfo,
  EducationInfo,
  ExperienceInfo,
  LanguageInfo,
  PersonalInfo,
  PhotoInfo,
  ReferenceInfo,
  ResumeFormValues,
  SkillInfo,
  SummaryInfo,
} from '../types/resumeTypes';
import Header from '../components/Header';
import Page from '../components/Page';
import MultiStepForm from '../components/MultiStepForm';
import Button from '../components/Button';
import PersonalInfoStep from '../components/CreateResumeSteps/PersonalInfoStep';
import SummaryStep from '../components/CreateResumeSteps/SummaryStep';
import ExperiencesInfoStep from '../components/CreateResumeSteps/ExperiencesInfoStep';
import CertificatesInfoStep from '../components/CreateResumeSteps/CertificatesInfoStep';
import SkillsInfoStep from '../components/CreateResumeSteps/SkillsInfoStep';
import LanguagesInfoStep from '../components/CreateResumeSteps/LanguagesInfoStep';
import ReferencesInfoStep from '../components/CreateResumeSteps/ReferencesInfoStep';
import EducationsInfoStep from '../components/CreateResumeSteps/EducationsInfoStep';
import Alert from '../components/Alert';
import { PostResumeValues } from '../services/ResumeServices';
import TemplateSelectStep from '../components/CreateResumeSteps/TemplateSelectStep';
import { resumeTemplatesData } from '../data/resumeTemplatesData';
import CreatedInfoModal from '../components/CreatedInfoModal';
import UploadPhotoStep from '../components/CreateResumeSteps/UploadPhotoStep';

type Props = {
  navigation: any;
  route: any;
};

const INITIAL_RESUME_VALUES: ResumeFormValues = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    phoneNumber: '',
    email: '',
    website: '',
  },
};

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

export default function CreateResume({ navigation, route }: Props) {
  const [formValues, setFormValues] = useState<ResumeFormValues>(
    INITIAL_RESUME_VALUES,
  );
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(
    route.params?.templateIndex ?? 0,
  );

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 10;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const [isCreated, setIsCreated] = useState(false);
  const [createdInfo, setCreatedInfo] = useState<Response | null>(null);

  const stepForward = () =>
    setCurrentStep(prev => (prev < totalSteps ? prev + 1 : prev));
  const stepBack = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

  const handlePersonalInfoUpdate = useCallback((data: PersonalInfo) => {
    setFormValues(prev => ({ ...prev, personalInfo: data }));
  }, []);

  const handleSummaryUpdate = useCallback((data: SummaryInfo) => {
    setFormValues(prev => ({ ...prev, summaryInfo: data }));
  }, []);

  const handleExperiencesUpdate = useCallback((data: ExperienceInfo[]) => {
    setFormValues(prev => ({ ...prev, experiencesInfo: data }));
  }, []);

  const handleEducationsUpdate = useCallback((data: EducationInfo[]) => {
    setFormValues(prev => ({ ...prev, educationsInfo: data }));
  }, []);

  const handleCertificatesUpdate = useCallback((data: CertificateInfo[]) => {
    setFormValues(prev => ({ ...prev, certificatesInfo: data }));
  }, []);

  const handleSkillsUpdate = useCallback((data: SkillInfo[]) => {
    setFormValues(prev => ({ ...prev, skillsInfo: data }));
  }, []);

  const handleLanguagesUpdate = useCallback((data: LanguageInfo[]) => {
    setFormValues(prev => ({ ...prev, languagesInfo: data }));
  }, []);

  const handleReferencesUpdate = useCallback((data: ReferenceInfo[]) => {
    setFormValues(prev => ({ ...prev, referencesInfo: data }));
  }, []);

  const handlePhotoUpdate = useCallback((data: PhotoInfo) => {
    setFormValues(prev => ({ ...prev, photoInfo: data }));
  }, []);

  const submitResumeValues = async () => {
    const {
      personalInfo,
      educationsInfo,
      experiencesInfo,
      certificatesInfo,
      skillsInfo,
      languagesInfo,
      referencesInfo,
    } = formValues;

    if (!personalInfo.fullName.trim() || !personalInfo.email.trim()) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: 'Eksik Kişisel Bilgi',
        desc: 'Lütfen Kişisel Bilgiler adımındaki zorunlu alanları (*) doldurunuz.',
        onPress: () => {
          setAlertVisible(false);
          setCurrentStep(1);
        },
      });
      return;
    }

    if (educationsInfo && educationsInfo.length > 0) {
      const isAnyEducationIncomplete = educationsInfo.some(
        edu =>
          !edu.title.trim() || !edu.institute.trim() || !edu.startDate.trim(),
      );

      if (isAnyEducationIncomplete) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Eksik Eğitim Bilgisi',
          desc: 'Başladığınız bir eğitim kaydında zorunlu alanları (*) doldurmadınız. Lütfen kontrol edin.',
          onPress: () => {
            setAlertVisible(false);
            setCurrentStep(4);
          },
        });
        return;
      }
    }

    if (experiencesInfo && experiencesInfo.length > 0) {
      const isAnyExperienceIncomplete = experiencesInfo.some(
        exp => !exp.title.trim() || !exp.startDate.trim(),
      );

      if (isAnyExperienceIncomplete) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Eksik Deneyim Bilgisi',
          desc: 'Başladığınız bir deneyim kaydında zorunlu alanları (*) doldurmadınız. Lütfen kontrol edin.',
          onPress: () => {
            setAlertVisible(false);
            setCurrentStep(3);
          },
        });
        return;
      }
    }

    if (certificatesInfo && certificatesInfo.length > 0) {
      const isAnyCertificateIncomplete = certificatesInfo.some(
        cert => !cert.title.trim(),
      );

      if (isAnyCertificateIncomplete) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Eksik Sertifika Bilgisi',
          desc: 'Başladığınız bir sertifika kaydında zorunlu alanları (*) doldurmadınız. Lütfen kontrol edin.',
          onPress: () => {
            setAlertVisible(false);
            setCurrentStep(5);
          },
        });
        return;
      }
    }

    if (skillsInfo && skillsInfo.length > 0) {
      const isAnySkillIncomplete = skillsInfo.some(
        skill => !skill.title.trim(),
      );

      if (isAnySkillIncomplete) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Eksik Yetenek Bilgisi',
          desc: 'Başladığınız bir yetenek kaydında zorunlu alanları (*) doldurmadınız. Lütfen kontrol edin.',
          onPress: () => {
            setAlertVisible(false);
            setCurrentStep(6);
          },
        });
        return;
      }
    }

    if (languagesInfo && languagesInfo.length > 0) {
      const isAnyLanguageIncomplete = languagesInfo.some(
        lang => !lang.title.trim(),
      );

      if (isAnyLanguageIncomplete) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Eksik Dil Bilgisi',
          desc: 'Başladığınız bir dil kaydında zorunlu alanları (*) doldurmadınız. Lütfen kontrol edin.',
          onPress: () => {
            setAlertVisible(false);
            setCurrentStep(7);
          },
        });
        return;
      }
    }

    if (referencesInfo && referencesInfo.length > 0) {
      const isAnyReferenceIncomplete = referencesInfo.some(
        ref => !ref.fullName.trim() || !ref.contact.trim(),
      );

      if (isAnyReferenceIncomplete) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: 'Eksik Referans Bilgisi',
          desc: 'Başladığınız bir referans kaydında zorunlu alanları (*) doldurmadınız. Lütfen kontrol edin.',
          onPress: () => {
            setAlertVisible(false);
            setCurrentStep(8);
          },
        });
        return;
      }
    }

    try {
      setIsSubmitting(true);
      const response = await PostResumeValues(
        formValues,
        resumeTemplatesData[selectedTemplateIndex].name,
      );

      if (response && response.ok) {
        setIsCreated(true);
        setCreatedInfo(response);
      }
    } catch (error) {
      console.error(error);
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: 'Bir Hata Oluştu',
        desc: 'Özgeçmişiniz oluşturulamadı. Lütfen tekrar deneyiniz.',
        onPress: () => setAlertVisible(false),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        handlePress={() => navigation.goBack()}
        iconName="chevron-back"
        title="Create Resume"
      />
      <Page>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          extraScrollHeight={isSmallScreen ? wp(25) : 0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          className="w-full"
        >
          <MultiStepForm currentStep={currentStep} onStepPress={setCurrentStep}>
            <PersonalInfoStep
              initial={formValues.personalInfo}
              handleForward={handlePersonalInfoUpdate}
            />
            <SummaryStep
              initial={formValues.summaryInfo ?? { text: '' }}
              handleForward={handleSummaryUpdate}
            />
            <ExperiencesInfoStep
              initial={formValues.experiencesInfo ?? []}
              handleForward={handleExperiencesUpdate}
            />
            <EducationsInfoStep
              initial={formValues.educationsInfo ?? []}
              handleForward={handleEducationsUpdate}
            />
            <CertificatesInfoStep
              initial={formValues.certificatesInfo ?? []}
              handleForward={handleCertificatesUpdate}
            />
            <SkillsInfoStep
              initial={formValues.skillsInfo ?? []}
              handleForward={handleSkillsUpdate}
            />
            <LanguagesInfoStep
              initial={formValues.languagesInfo ?? []}
              handleForward={handleLanguagesUpdate}
            />
            <ReferencesInfoStep
              initial={formValues.referencesInfo ?? []}
              handleForward={handleReferencesUpdate}
            />
            <UploadPhotoStep
              initial={formValues.photoInfo ?? { base64Image: '' }}
              handleForward={handlePhotoUpdate}
            />
            <TemplateSelectStep
              initial={resumeTemplatesData[selectedTemplateIndex]}
              handleForward={index => setSelectedTemplateIndex(index)}
            />
          </MultiStepForm>
        </KeyboardAwareScrollView>
      </Page>
      <View
        className="w-full flex-row bg-backgroundColor dark:bg-dark-backgroundColor"
        style={{ gap: wp(3), paddingHorizontal: wp(5), paddingBottom: wp(5) }}
      >
        <Button
          handleSubmit={stepBack}
          text="Back"
          style={{ flex: 1 }}
          type="back"
          isDisabled={currentStep === 1}
        />
        <Button
          handleSubmit={() => {
            currentStep !== 10 ? stepForward() : submitResumeValues();
          }}
          style={{ flex: 1 }}
          text={currentStep !== 10 ? 'Continue' : 'Submit'}
          isLoading={isSubmitting}
        />
      </View>
      {alertVisible && (
        <Alert
          visible={alertVisible}
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={alert.onPress}
        />
      )}
      {isCreated && createdInfo && (
        <CreatedInfoModal
          type="resume"
          isCreated={isCreated}
          createdInfo={createdInfo}
          handleDismiss={() => {
            setIsCreated(false);
            // setCreatedInfo(null);
            // setFormValues(INITIAL_RESUME_VALUES);
            // setCurrentStep(1);
            // navigation.goBack();
          }}
        />
      )}
    </View>
  );
}
