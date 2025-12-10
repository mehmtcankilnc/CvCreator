/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PhotoInfo } from '../../types/resumeTypes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import Alert from '../Alert';
import Button from '../Button';

type Props = {
  initial: PhotoInfo;
  handleForward: (data: PhotoInfo) => void;
};

export default function UploadPhotoStep({ initial, handleForward }: Props) {
  const [photoInfo, setPhotoInfo] = useState<PhotoInfo>(initial);
  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const handleForwardRef = useRef(handleForward);
  handleForwardRef.current = handleForward;

  useEffect(() => {
    return () => {
      handleForwardRef.current(photoInfo);
    };
  }, [photoInfo]);

  const selectImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      setAlert({
        type: 'failure',
        title: 'İzin Gerekli',
        desc: 'Galeriye erişim izni verilmedi.',
        onPress: () => setAlertVisible(false),
      });
      setAlertVisible(true);
      return;
    }

    launchImageLibrary(
      { mediaType: 'photo', includeBase64: true },
      response => {
        if (response.didCancel) {
          console.log('Kullanıcı işlemi iptal etti');
        } else if (response.errorMessage) {
          console.error('Hata:', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          const imageBase64 = `data:${asset.type};base64,${asset.base64}`;

          if (imageBase64) {
            const newImage: PhotoInfo = {
              base64Image: imageBase64,
            };
            setPhotoInfo(newImage);
          }
        }
      },
    );
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const sdkInt = Platform.Version as number;
        const permission =
          sdkInt >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('İzin kontrol hatası:', err);
        return false;
      }
    }
    return true;
  };

  const removeImage = () => {
    setPhotoInfo({ base64Image: '' });
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
          fontFamily: 'Kavoon-Regular',
          textAlign: 'center',
          fontSize: wp(4),
          marginBottom: wp(3),
        }}
      >
        Upload a Photo
      </Text>
      <View className="w-full items-center border border-borderColor dark:border-dark-borderColor rounded-xl overflow-hidden">
        {photoInfo.base64Image ? (
          <View className="w-full" style={{ padding: wp(3), gap: wp(3) }}>
            <Image
              source={{ uri: photoInfo.base64Image }}
              style={{
                width: wp(40),
                height: hp(25),
                borderRadius: wp(3),
                overflow: 'hidden',
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
            <Button type="delete" text="Vazgeç" handleSubmit={removeImage} />
          </View>
        ) : (
          <Pressable onPress={selectImage} style={{ marginVertical: wp(2) }}>
            <MaterialCommunityIcons
              name="camera-image"
              size={wp(10)}
              color="#1954E5"
              className="border border-main border-dashed self-center"
              style={{ padding: wp(5), margin: wp(2), borderRadius: wp(3) }}
            />
            <Text className="color-textColor dark:color-dark-textColor">
              Resminizi yüklemek için tıklayın
            </Text>
          </Pressable>
        )}
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
    </ScrollView>
  );
}
