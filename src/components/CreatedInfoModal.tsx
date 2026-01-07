/* eslint-disable react-native/no-inline-styles */
import { View, Modal, Pressable, Text } from 'react-native';
import React, { useState } from 'react';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../store/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import { shareFile } from '../utilities/shareFile';

type Props = {
  isCreated: boolean;
  createdInfo: Response | null;
  handleDismiss: () => void;
  type: 'resume' | 'coverletter';
};

export default function CreatedInfoModal({
  isCreated,
  createdInfo,
  handleDismiss,
  type,
}: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const [isLoading, setIsLoading] = useState(false);

  const secondaryColor = '#F2EDD0';
  const darkSecColor = '#58512B';

  return (
    <Modal
      visible={isCreated}
      onRequestClose={handleDismiss}
      transparent
      animationType="fade"
    >
      <Pressable
        onPress={handleDismiss}
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      >
        <Pressable
          className="bg-backgroundColor dark:bg-dark-backgroundColor rounded-2xl shadow-lg"
          style={{ width: wp(85), padding: wp(5), gap: wp(4) }}
        >
          <View className="items-center justify-center">
            <View
              className="w-16 h-16 rounded-full items-center justify-center"
              style={{
                backgroundColor:
                  theme === 'LIGHT' ? secondaryColor : darkSecColor,
              }}
            >
              <Ionicons name="checkmark-circle" size={wp(10)} color="#C2A510" />
            </View>
          </View>
          <View style={{ gap: wp(2) }}>
            <Text
              className="text-center text-xl text-textColor dark:text-dark-textColor"
              style={{ fontFamily: 'InriaSerif-Bold' }}
            >
              Başarılı
            </Text>
            <Text className="text-center text-base text-gray-600 dark:text-gray-400">
              {type === 'coverletter' ? 'Mektubunuz' : 'Özgeçmişiniz'} başarıyla
              oluşturulmuştur. Aşağıdaki paylaş butonuna basarak indirebilir
              veya cihazınıza kaydedebilirsiniz.
            </Text>
          </View>
          <View>
            <Button
              handleSubmit={() => {
                setIsLoading(true);
                shareFile(createdInfo, type);
                setIsLoading(false);
                handleDismiss();
              }}
              text="Paylaş"
              type="success"
              isLoading={isLoading}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
