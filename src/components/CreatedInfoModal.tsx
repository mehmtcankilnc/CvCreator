/* eslint-disable react-native/no-inline-styles */
import { View, Modal, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useAppSelector } from '../store/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from './Button';

type Props = {
  isCreated: boolean;
  createdInfo: Response | null;
  handleDismiss: () => void;
};

export default function CreatedInfoModal({
  isCreated,
  createdInfo,
  handleDismiss,
}: Props) {
  const { theme } = useAppSelector(state => state.theme);

  const [isLoading, setIsLoading] = useState(false);

  const secondaryColor = '#F2EDD0';
  const darkSecColor = '#58512B';

  const processResult = async () => {
    if (createdInfo) {
      setIsLoading(true);

      const pdfBlob = await createdInfo.blob();

      const reader = new FileReader();
      reader.readAsDataURL(pdfBlob);

      const base64Data = await new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
        reader.onerror = error => {
          console.error('Blob read error:', error);
          reject(error);
        };
      });

      const fileName = 'ozgecmis.pdf';
      const path = `${RNFS.CachesDirectoryPath}/${fileName}`;

      await RNFS.writeFile(path, base64Data, 'base64');

      const exists = await RNFS.exists(path);
      console.log(`Dosya yolu: ${path}, Oluştu mu: ${exists}`);

      if (exists) {
        try {
          const fileUri = `file://${path}`;

          await Share.open({
            title: 'Özgeçmişini Görüntüle',
            url: fileUri,
            type: 'application/pdf',
            failOnCancel: false,
          });
        } catch (e) {
          console.log('Paylaşma/Açma hatası:', e);
        } finally {
          setIsLoading(false);
          handleDismiss();
        }
      }
    }
  };

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
              style={{ fontFamily: 'Kavoon-Regular' }}
            >
              Başarılı
            </Text>
            <Text className="text-center text-base text-gray-600 dark:text-gray-400">
              Özgeçmişiniz başarıyla oluşturulmuştur. Aşağıdaki paylaş butonuna
              basarak indirebilir veya cihazınıza kaydedbilirsiniz.
            </Text>
          </View>
          <View>
            <Button
              handleSubmit={processResult}
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
