/* eslint-disable react-native/no-inline-styles */
import { View, Dimensions } from 'react-native';
import React, { useCallback, useState } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import {
  CoverLetterContent,
  CoverLetterFormValues,
  CoverLetterMetaInfo,
  CoverLetterRecipientInfo,
  CoverLetterSenderInfo,
} from '../types/coverLetterTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MultiStepForm from '../components/MultiStepForm';
import SenderInfoStep from '../components/CreateCoverLetterSteps/SenderInfoStep';
import RecipientInfoStep from '../components/CreateCoverLetterSteps/RecipientInfoStep';
import MetaInfoStep from '../components/CreateCoverLetterSteps/MetaInfoStep';
import ContentStep from '../components/CreateCoverLetterSteps/ContentStep';
import Button from '../components/Button';
import Alert from '../components/Alert';
import CreatedInfoModal from '../components/CreatedInfoModal';
import {
  PostCoverLetterValues,
  UpdateCoverLetterValues,
} from '../services/CoverLetterServices';
import { useTranslation } from 'react-i18next';

type Props = {
  navigation: any;
  route: any;
};

const INITIAL_COVER_LETTER_VALUES: CoverLetterFormValues = {
  senderInfo: {
    fullName: '',
    jobTitle: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
  },
  recipientInfo: {
    companyName: '',
    hiringManagerName: '',
  },
  metaInfo: {
    sentDate: '',
    subject: '',
  },
  content: {
    salutation: '',
    introduction: '',
    body: '',
    conclusion: '',
    signOff: '',
  },
};

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

export default function CreateCoverLetter({ navigation, route }: Props) {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState<CoverLetterFormValues>(
    route.params?.formValues ?? INITIAL_COVER_LETTER_VALUES,
  );

  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 4;

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

  const handleSenderInfoUpdate = useCallback((data: CoverLetterSenderInfo) => {
    setFormValues(prev => ({ ...prev, senderInfo: data }));
  }, []);

  const handleRecipientInfoUpdate = useCallback(
    (data: CoverLetterRecipientInfo) => {
      setFormValues(prev => ({ ...prev, recipientInfo: data }));
    },
    [],
  );

  const handleMetaInfoUpdate = useCallback((data: CoverLetterMetaInfo) => {
    setFormValues(prev => ({ ...prev, metaInfo: data }));
  }, []);

  const handleContentUpdate = useCallback((data: CoverLetterContent) => {
    setFormValues(prev => ({ ...prev, content: data }));
  }, []);

  const submitCoverLetterValues = async () => {
    const { senderInfo, recipientInfo, metaInfo, content } = formValues;

    if (!senderInfo.fullName.trim() || !senderInfo.email.trim()) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('cl-missingsender-alert-title'),
        desc: t('cl-missingsender-alert-text'),
        onPress: () => {
          setAlertVisible(false);
          setCurrentStep(1);
        },
      });
      return;
    }

    if (
      !recipientInfo.companyName.trim() ||
      !recipientInfo.hiringManagerName.trim()
    ) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('cl-missingreceiver-alert-title'),
        desc: t('cl-missingreceiver-alert-text'),
        onPress: () => {
          setAlertVisible(false);
          setCurrentStep(1);
        },
      });
      return;
    }

    if (!metaInfo.sentDate.trim() || !metaInfo.subject.trim()) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('cl-missingheader-alert-title'),
        desc: t('cl-missingheader-alert-text'),
        onPress: () => {
          setAlertVisible(false);
          setCurrentStep(1);
        },
      });
      return;
    }

    if (
      !content.body.trim() ||
      !content.conclusion.trim() ||
      !content.introduction.trim() ||
      !content.salutation.trim() ||
      !content.signOff.trim()
    ) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('cl-missingcontent-alert-title'),
        desc: t('cl-missingcontent-alert-text'),
        onPress: () => {
          setAlertVisible(false);
          setCurrentStep(1);
        },
      });
      return;
    }

    try {
      setIsSubmitting(true);

      let response;
      if (route.params?.formValues) {
        response = await UpdateCoverLetterValues(
          formValues,
          route.params.coverLetterId,
        );
      } else {
        response = await PostCoverLetterValues(formValues);
      }

      if (response && response.ok) {
        setIsCreated(true);
        setCreatedInfo(response);
      }
    } catch (error) {
      console.error(error);
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('cl-unknown-alert-title'),
        desc: t('cl-unknown-alert-text'),
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
        title={`${
          route.params?.formValues
            ? t('edit-cover-letter-header')
            : t('create-cover-letter-header')
        }`}
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
            <SenderInfoStep
              initial={formValues.senderInfo}
              handleForward={handleSenderInfoUpdate}
            />
            <RecipientInfoStep
              initial={formValues.recipientInfo}
              handleForward={handleRecipientInfoUpdate}
            />
            <MetaInfoStep
              initial={formValues.metaInfo}
              handleForward={handleMetaInfoUpdate}
            />
            <ContentStep
              initial={formValues.content}
              handleForward={handleContentUpdate}
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
          text={t('back')}
          style={{ flex: 1 }}
          type="back"
          isDisabled={currentStep === 1}
        />
        <Button
          handleSubmit={() => {
            currentStep !== 4 ? stepForward() : submitCoverLetterValues();
          }}
          style={{ flex: 1 }}
          text={currentStep !== 4 ? t('continue') : t('submit')}
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
          onDismiss={() => setAlertVisible(false)}
        />
      )}
      {isCreated && createdInfo && (
        <CreatedInfoModal
          type="coverletter"
          isCreated={isCreated}
          createdInfo={createdInfo}
          handleDismiss={() => {
            setIsCreated(false);
            // setCreatedInfo(null);
            // setFormValues(INITIAL_COVER_LETTER_VALUES);
            // setCurrentStep(1);
            // navigation.goBack();
          }}
        />
      )}
    </View>
  );
}
