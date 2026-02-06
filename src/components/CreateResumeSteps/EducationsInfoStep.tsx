/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import { EducationInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import Alert from '../Alert';

type Props = {
  initial: Array<EducationInfo>;
  handleForward: (data: Array<EducationInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function EducationsInfoStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [educations, setEducations] = useState<EducationInfo[]>(
    initial.length > 0
      ? initial
      : [
          {
            isCurrent: false,
            title: '',
            startDate: '',
            endDate: '',
            institute: '',
            gpa: '',
          },
        ],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const [datePickerConfig, setDatePickerConfig] = useState<{
    index: number;
    field: 'startDate' | 'endDate';
    open: boolean;
  }>({ index: 0, field: 'startDate', open: false });

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledEducations = educations.filter(
        edu =>
          edu.title.trim() !== '' ||
          edu.institute.trim() !== '' ||
          edu.startDate.trim() !== '' ||
          edu.endDate?.trim() !== '' ||
          edu.gpa?.trim() !== '',
      );
      handleForwardRef.current(filledEducations);
    };
  }, [educations]);

  const handleAddNew = () => {
    const newEducation: EducationInfo = {
      title: '',
      startDate: '',
      endDate: '',
      institute: '',
      gpa: '',
      isCurrent: false,
    };
    setEducations([...educations, newEducation]);
    setActiveIndex(educations.length);
  };

  const handleInputChange = <K extends keyof EducationInfo>(
    index: number,
    field: K,
    value: EducationInfo[K],
  ) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) return;
    setEducations(prev => prev.filter((_, i) => i !== indexToDelete));
    if (activeIndex === indexToDelete) setActiveIndex(-1);
    else if (activeIndex > indexToDelete) setActiveIndex(prev => prev - 1);
  };

  const handleToggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const openPicker = (index: number, field: 'startDate' | 'endDate') => {
    setDatePickerConfig({ index, field, open: true });
  };

  const selectDate = (date: Date) => {
    const selectedDate = date;
    const now = new Date();
    const currentEdu = educations[datePickerConfig.index];

    if (datePickerConfig.field === 'endDate' && selectedDate > now) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('date_error'),
        desc: t('error_future_date'),
        onPress: () => {
          setAlertVisible(false);
        },
      });
      setDatePickerConfig({ ...datePickerConfig, open: false });
      return;
    }

    if (datePickerConfig.field === 'endDate' && currentEdu.startDate) {
      const startDate = new Date(currentEdu.startDate);
      if (selectedDate < startDate) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: t('date_error'),
          desc: t('error_date_order'),
          onPress: () => {
            setAlertVisible(false);
          },
        });
        setDatePickerConfig({ ...datePickerConfig, open: false });
        return;
      }
    }

    if (datePickerConfig.field === 'startDate' && currentEdu.endDate) {
      const endDate = new Date(currentEdu.endDate);
      if (selectedDate > endDate) {
        setAlertVisible(true);
        setAlert({
          type: 'failure',
          title: t('date_error'),
          desc: t('error_start_after_end'),
          onPress: () => {
            setAlertVisible(false);
          },
        });
        setDatePickerConfig({ ...datePickerConfig, open: false });
        return;
      }
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    handleInputChange(
      datePickerConfig.index,
      datePickerConfig.field,
      dateString,
    );
    setDatePickerConfig({ ...datePickerConfig, open: false });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: wp(3) }}
      className="w-full"
    >
      <Text
        className="color-textColor dark:color-dark-textColor"
        style={{
          fontFamily: 'Montserrat-Bold',
          textAlign: 'center',
          fontSize: wp(4),
          lineHeight: wp(6),
          marginBottom: wp(3),
        }}
      >
        {t('resume-step4-title')}
      </Text>
      {educations.map((edu, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={edu.title || `${t('resume-step4-text')} ${i + 1}`}
        >
          <View
            className="flex-row justify-end items-center"
            style={{ gap: wp(2) }}
          >
            <Pressable
              onPress={() => handleInputChange(i, 'isCurrent', !edu.isCurrent)}
              className="flex-row items-center justify-center border-borderColor dark:border-dark-borderColor"
              style={{
                width: wp(5),
                height: wp(5),
                borderRadius: wp(1.5),
                backgroundColor: edu.isCurrent ? '#1954E5' : 'transparent',
                borderWidth: edu.isCurrent ? 0 : 1,
              }}
            >
              {edu.isCurrent && (
                <Ionicons name="checkmark" size={wp(4)} color="#D9D9D9" />
              )}
            </Pressable>
            <Text
              className="color-textColor dark:color-dark-textColor"
              style={{ fontFamily: 'Montserrat-Regular', fontSize: wp(3) }}
            >
              {t('present')}
            </Text>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={edu.title}
            placeholder={t('resume-step4-field1')}
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'institute', value)}
            value={edu.institute}
            placeholder={t('resume-step4-field2')}
            autoCapitalize="words"
          />
          <View className="flex-row items-center" style={{ gap: wp(3) }}>
            <Pressable
              className="flex-1"
              onPress={() => openPicker(i, 'startDate')}
            >
              <View pointerEvents="none">
                <TextInput
                  value={edu.startDate}
                  placeholder={t('resume-step4-field3')}
                  handleChangeText={() => {}}
                />
              </View>
            </Pressable>
            <View className="flex-1">
              {edu.isCurrent ? (
                <Text
                  className="text-center color-textColor dark:color-dark-textColor"
                  style={{ fontFamily: 'Montserrat-Regular', fontSize: wp(4) }}
                >
                  - {t('present')}
                </Text>
              ) : (
                <Pressable onPress={() => openPicker(i, 'endDate')}>
                  <View pointerEvents="none">
                    <TextInput
                      value={edu.endDate}
                      placeholder={t('resume-step4-field4')}
                      handleChangeText={() => {}}
                    />
                  </View>
                </Pressable>
              )}
            </View>
          </View>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'gpa', value)}
            value={edu.gpa}
            placeholder={t('resume-step4-field5')}
            autoCapitalize="none"
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text={t('resume-step4-delete')}
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text={t('resume-step4-btn')} />
      <DatePicker
        modal
        mode="date"
        locale="tr"
        open={datePickerConfig.open}
        date={new Date()}
        onConfirm={selectDate}
        onCancel={() => {
          setDatePickerConfig({ ...datePickerConfig, open: false });
        }}
        confirmText={t('submit')}
        cancelText={t('cancel')}
        title={t('selectDate')}
      />
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
    </ScrollView>
  );
}
