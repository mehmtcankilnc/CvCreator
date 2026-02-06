/* eslint-disable react-native/no-inline-styles */
import { View, Text, Linking, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  visible: boolean;
  storeUrl: string;
};

export default function UpdateAppModal({ visible, storeUrl }: Props) {
  const { t } = useTranslation();
  const theme = useAppSelector(state => state.theme.theme);
  const isDarkMode = theme === 'DARK';

  const handleUpdatePress = () => {
    Linking.openURL(storeUrl).catch(err =>
      console.error('An error occurred', err),
    );
  };

  if (!visible) return;

  return (
    <Modal
      key="update-modal"
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View
        className="flex-1 items-center justify-center bg-black/80"
        style={{ padding: wp(6) }}
      >
        <View
          className={`w-full items-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          style={{
            padding: wp(6),
            borderRadius: wp(5),
            gap: wp(4),
            elevation: 10,
          }}
        >
          <View className="bg-blue-100 rounded-full" style={{ padding: wp(4) }}>
            <MaterialCommunityIcons
              name="rocket-launch"
              size={wp(10)}
              color="#1954E5"
            />
          </View>
          <Text
            className="text-center text-textColor dark:text-dark-textColor"
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: wp(5),
              lineHeight: wp(7.5),
            }}
          >
            {t('updateAvailable')}
          </Text>
          <Text
            className="text-center text-gray-600 dark:text-gray-400"
            style={{
              fontFamily: 'Montserrat-Regular',
              fontSize: wp(3),
              lineHeight: wp(4.5),
            }}
          >
            {t('updateDesc')}
          </Text>
          <TouchableOpacity
            onPress={handleUpdatePress}
            className="w-full bg-main rounded-xl items-center justify-center"
            style={{ paddingVertical: wp(4), marginTop: wp(2) }}
          >
            <Text
              className="text-white"
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: wp(4),
                lineHeight: wp(6),
              }}
            >
              {t('updateNow')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
