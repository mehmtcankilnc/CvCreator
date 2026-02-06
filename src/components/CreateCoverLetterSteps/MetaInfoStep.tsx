/* eslint-disable react-native/no-inline-styles */
import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { CoverLetterMetaInfo } from '../../types/coverLetterTypes';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import TextInput from '../TextInput';
import { useTranslation } from 'react-i18next';
import Alert from '../Alert';
import DatePicker from 'react-native-date-picker';

type Props = {
  initial: CoverLetterMetaInfo;
  handleForward: (data: CoverLetterMetaInfo) => void;
};

export default function MetaInfoStep({ initial, handleForward }: Props) {
  const { t } = useTranslation();

  const [metaInfo, setMetaInfo] = useState<CoverLetterMetaInfo>(initial);

  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const [datePickerConfig, setDatePickerConfig] = useState<{
    open: boolean;
  }>({ open: false });

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(metaInfo);
    };
  }, [metaInfo]);

  const openPicker = () => {
    setDatePickerConfig({ open: true });
  };

  const selectDate = (date: Date) => {
    const selectedDate = date;
    const now = new Date();

    if (selectedDate > now) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('date_error'),
        desc: t('meta_info_date_error'),
        onPress: () => {
          setAlertVisible(false);
        },
      });
      setDatePickerConfig({ ...datePickerConfig, open: false });
      return;
    }

    const dateString = selectedDate.toISOString().split('T')[0];
    setMetaInfo(prev => ({ ...prev, sentDate: dateString }));
    setDatePickerConfig({ ...datePickerConfig, open: false });
  };

  return (
    <View style={{ gap: wp(3) }} className="w-full">
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
        {t('coverletter-step3-title')}
      </Text>
      <View style={{ gap: wp(3) }}>
        <TextInput
          handleChangeText={value =>
            setMetaInfo(prev => ({ ...prev, subject: value }))
          }
          value={metaInfo.subject}
          placeholder={t('coverletter-step3-field1')}
          autoCapitalize="words"
        />
        <Pressable className="flex-1" onPress={() => openPicker()}>
          <View pointerEvents="none">
            <TextInput
              value={metaInfo.sentDate}
              placeholder={t('coverletter-step3-field2')}
              autoCapitalize="none"
              handleChangeText={() => {}}
            />
          </View>
        </Pressable>
      </View>
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
    </View>
  );
}
