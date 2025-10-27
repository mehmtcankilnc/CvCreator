import { View, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
  isSuccessResponse,
} from '@react-native-google-signin/google-signin';
import { supabase } from '../../lib/supabase';
import GoogleSignInBtn from '../../components/GoogleSignInBtn';
import Alert from '../../components/Alert';
import { setUser } from '../../store/slices/authSlice';
import { useAppDispatch } from '../../store/hooks';

type Props = {
  navigation: any;
};

export default function Settings({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const [isLinking, setIsLinking] = useState(false);
  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);

  const handleAccountLink = async () => {
    if (isLinking) return;
    setIsLinking(true);

    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (isSuccessResponse(response)) {
        const idToken = response.data.idToken;

        if (!idToken) {
          throw new Error('Google girişi sırasında idToken alınamadı.');
        }

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });

        if (error) {
          setAlertVisible(true);
          setAlert({
            type: 'failure',
            title: 'Fail',
            desc: error.message,
            onPress: () => setAlertVisible(false),
          });
        } else {
          dispatch(setUser(data.user.id));
          setAlertVisible(true);
          setAlert({
            type: 'success',
            title: 'Success',
            desc: 'Your Google account has linked now!',
            onPress: () => setAlertVisible(false),
          });
        }
      }
    } catch (error) {
      console.log(error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('Kullanıcı Google girişini iptal etti.');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('devam ediyor');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('servis mevcut değil');
            break;
          default:
            console.log('bilinmeyen hata');
        }
      } else {
        console.log('giriş hatası');
      }
    } finally {
      setIsLinking(false);
    }
  };

  return (
    <View className="flex-1">
      <Header handlePress={() => navigation.toggleDrawer()} title="Settings" />
      <Page>
        <Text>Settings</Text>
        <GoogleSignInBtn
          handleGoogle={handleAccountLink}
          isLoading={isLinking}
        />
      </Page>
      {alertVisible && (
        <Alert
          visible={alertVisible}
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={alert.onPress}
        />
      )}
    </View>
  );
}
