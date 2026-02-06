/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  View,
  Pressable,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CertificateInfo } from '../../types/resumeTypes';
import Button from '../Button';
import TextInput from '../TextInput';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AccordionItem from '../AccordionItem';
import { useTranslation } from 'react-i18next';
import Alert from '../Alert';
import DatePicker from 'react-native-date-picker';

type Props = {
  initial: Array<CertificateInfo>;
  handleForward: (data: Array<CertificateInfo>) => void;
};

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CertificatesInfoStep({
  initial,
  handleForward,
}: Props) {
  const { t } = useTranslation();

  const [certificates, setCertificates] = useState<CertificateInfo[]>(
    initial.length > 0
      ? initial
      : [{ title: '', issuer: '', date: '', link: '' }],
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
    field: 'date';
    open: boolean;
  }>({ index: 0, field: 'date', open: false });

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      const filledCertificates = certificates.filter(
        cert => cert.title.trim() !== '',
      );

      handleForwardRef.current(filledCertificates);
    };
  }, [certificates]);

  const handleAddNew = () => {
    const newCertificate: CertificateInfo = {
      title: '',
      issuer: '',
      date: '',
      link: '',
    };
    setCertificates([...certificates, newCertificate]);
    setActiveIndex(certificates.length);
  };

  const handleInputChange = (
    index: number,
    field: keyof CertificateInfo,
    value: string,
  ) => {
    const updatedCertificates = [...certificates];
    updatedCertificates[index][field] = value;
    setCertificates(updatedCertificates);
  };

  const handleDelete = (indexToDelete: number) => {
    if (indexToDelete === 0) {
      return;
    }

    setCertificates(prev => prev.filter((_, i) => i !== indexToDelete));

    if (activeIndex === indexToDelete) {
      setActiveIndex(-1);
    } else if (activeIndex > indexToDelete) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleToggle = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveIndex(prevIndex => (prevIndex === index ? -1 : index));
  };

  const openPicker = (index: number, field: 'date') => {
    setDatePickerConfig({ index, field, open: true });
  };

  const selectDate = (date: Date) => {
    const selectedDate = date;
    const now = new Date();

    if (selectedDate > now) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('date_error'),
        desc: t('cert_date_error'),
        onPress: () => {
          setAlertVisible(false);
        },
      });
      setDatePickerConfig({ ...datePickerConfig, open: false });
      return;
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
        {t('resume-step5-title')}
      </Text>
      {certificates.map((cert, i) => (
        <AccordionItem
          key={i}
          isActive={activeIndex === i}
          onToggle={() => handleToggle(i)}
          title={cert.title || `${t('resume-step5-text')} ${i + 1}`}
        >
          <TextInput
            handleChangeText={value => handleInputChange(i, 'title', value)}
            value={cert.title}
            placeholder={t('resume-step5-field1')}
            autoCapitalize="words"
          />
          <TextInput
            handleChangeText={value => handleInputChange(i, 'issuer', value)}
            value={cert.issuer}
            placeholder={t('resume-step5-field2')}
            autoCapitalize="words"
          />
          <Pressable className="flex-1" onPress={() => openPicker(i, 'date')}>
            <View pointerEvents="none">
              <TextInput
                value={cert.date}
                placeholder={t('resume-step5-field3')}
                handleChangeText={() => {}}
              />
            </View>
          </Pressable>
          <TextInput
            handleChangeText={value => handleInputChange(i, 'link', value)}
            value={cert.link}
            placeholder={t('resume-step5-field4')}
          />
          {i > 0 && (
            <Button
              handleSubmit={() => handleDelete(i)}
              text={t('resume-step5-delete')}
              type="delete"
            />
          )}
        </AccordionItem>
      ))}
      <Button handleSubmit={handleAddNew} text={t('resume-step5-btn')} />
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
