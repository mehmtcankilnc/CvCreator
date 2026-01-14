/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  Image,
  FlatList,
  ViewToken,
  Pressable,
} from 'react-native';
import React, { useRef, useState, useCallback, useMemo } from 'react';
import OnboardingWave from '../components/OnboardingWave';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import { useTranslation } from 'react-i18next';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import Paginator from '../components/Paginator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Feather from 'react-native-vector-icons/Feather';
import Alert from '../components/Alert';
import Video from 'react-native-video';
import { useAuth } from '../context/AuthContext';

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { loginGuest, loginGoogle } = useAuth();

  const scrollX = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({
    type: 'failure',
    title: '',
    desc: '',
    onPress: () => {},
  });
  const [alertVisible, setAlertVisible] = useState(false);
  const [isAlertLoading, setIsAlertLoading] = useState(false);

  const steps = useMemo(
    () => [
      {
        id: 0,
        title: t('onboarding_step1_title'),
        video: require('../assets/video.mp4'),
        poster: require('../assets/CvCreatorAppIcon.png'),
      },
      {
        id: 1,
        title1: t('onboarding_step2_title1'),
        title2: t('onboarding_step2_title2'),
        image: require('../assets/onboardingstep2image.png'),
      },
      {
        id: 2,
        title: t('onboarding_step3_title'),
        video: require('../assets/onboardingstep3video.mp4'),
        poster: require('../assets/onboardingstep3poster.png'),
      },
      {
        id: 3,
        title: t('onboarding_step4_title'),
        image: require('../assets/onboardingstep4image.png'),
      },
    ],
    [t],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      const isFocused = currentIndex === index;

      return (
        <View
          className="flex-1 justify-center"
          style={{
            width: wp(100),
            height: hp(80),
            paddingHorizontal: wp(5),
            gap: wp(5),
          }}
        >
          {item.id === 0 && (
            <>
              <View
                style={{
                  width: wp(55),
                  height: wp(55),
                  alignSelf: 'center',
                  marginTop: wp(5),
                  borderRadius: wp(4),
                  elevation: 10,
                  backgroundColor: '#000',
                  overflow: 'hidden',
                }}
              >
                <Video
                  source={item.video}
                  poster={{
                    source: item.poster,
                    resizeMode: 'contain',
                    style: { width: '100%', height: '100%' },
                  }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                  repeat={true}
                  muted={true}
                  paused={!isFocused}
                  playInBackground={false}
                  playWhenInactive={false}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'InriaSerif-Bold',
                  fontSize: wp(10),
                  lineHeight: wp(15),
                  color: '#585858',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </>
          )}
          {item.id === 1 && (
            <>
              <Image
                source={item.image}
                style={{
                  width: wp(55),
                  height: wp(55),
                  alignSelf: 'center',
                  marginTop: wp(5),
                  borderRadius: wp(4),
                }}
                resizeMode="contain"
                className="elevation-lg"
              />
              <Text
                style={{
                  fontFamily: 'InriaSerif-Bold',
                  fontSize: wp(8),
                  lineHeight: wp(12),
                  color: '#585858',
                  textAlign: 'center',
                }}
              >
                {item.title1}
              </Text>
              <Text
                style={{
                  fontFamily: 'InriaSerif-Bold',
                  fontSize: wp(8),
                  lineHeight: wp(12),
                  color: '#585858',
                  textAlign: 'center',
                }}
              >
                {item.title2}
              </Text>
            </>
          )}
          {item.id === 2 && (
            <>
              <View
                style={{
                  width: wp(55),
                  height: wp(55),
                  alignSelf: 'center',
                  marginTop: wp(5),
                  borderRadius: wp(4),
                  elevation: 10,
                  backgroundColor: '#000',
                  overflow: 'hidden',
                }}
              >
                <Video
                  source={item.video}
                  poster={{
                    source: item.poster,
                    resizeMode: 'cover',
                    style: { width: '100%', height: '100%' },
                  }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                  repeat={true}
                  muted={true}
                  paused={!isFocused}
                  playInBackground={false}
                  playWhenInactive={false}
                />
              </View>
              <Text
                style={{
                  fontFamily: 'InriaSerif-Bold',
                  fontSize: wp(8),
                  lineHeight: wp(15),
                  color: '#585858',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </>
          )}
          {item.id === 3 && (
            <>
              <Image
                source={item.image}
                style={{
                  width: wp(55),
                  height: wp(55),
                  alignSelf: 'center',
                  marginTop: wp(5),
                  borderRadius: wp(4),
                }}
                resizeMode="contain"
                className="elevation-lg"
              />
              <Text
                style={{
                  fontFamily: 'InriaSerif-Bold',
                  fontSize: wp(8),
                  lineHeight: wp(15),
                  color: '#585858',
                  textAlign: 'center',
                }}
              >
                {item.title}
              </Text>
            </>
          )}
        </View>
      );
    },
    [currentIndex],
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleNext = () => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex + 1,
      animated: true,
    });
  };

  const handleBack = () => {
    flatListRef.current?.scrollToIndex({
      index: currentIndex - 1,
      animated: true,
    });
  };

  const navigateToApp = async () => {
    try {
      await AsyncStorage.setItem('hasShowedOnboarding', 'true');

      navigation.reset({
        index: 0,
        routes: [{ name: 'App' }],
      });
    } catch (e) {
      console.error('Failed to save onboarding status', e);
    }
  };

  const handleGuestSignIn = () => {
    setAlert({
      type: 'inform',
      title: t('anon-signin-alert-title'),
      desc: t('anon-signin-alert-text'),
      onPress: async () => {
        setIsAlertLoading(true);
        const isSucceed = await loginGuest();
        if (isSucceed) {
          navigateToApp();
        }
        setIsAlertLoading(false);
        setAlertVisible(false);
      },
    });
    setAlertVisible(true);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmitting(true);
      const isSucceed = await loginGoogle();
      if (isSucceed) {
        navigateToApp();
      }
    } catch (error) {
      setAlertVisible(true);
      setAlert({
        type: 'failure',
        title: t('unknown-fail-alert-title'),
        desc: t('unknown-fail-alert-text'),
        onPress: () => setAlertVisible(false),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1">
      <View className="flex-1 absolute top-0 bottom-0 right-0 left-0">
        <OnboardingWave />
        <Pressable
          className="absolute top-10 right-6 bg-backgroundColor rounded-full flex-row items-center elevation-md"
          style={{ padding: wp(2), zIndex: 50 }}
          onPress={handleGuestSignIn}
        >
          <Text
            className="font-inriaRegular underline"
            style={{ fontSize: wp(4), lineHeight: wp(6) }}
          >
            {t('guest-signin')}
          </Text>
          <Feather name="chevron-right" size={wp(5)} color="black" />
        </Pressable>
      </View>
      <View
        className="flex-1 justify-end items-center"
        style={{
          gap: wp(5),
          paddingBottom: wp(5),
        }}
      >
        <Animated.FlatList
          ref={flatListRef}
          data={steps}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={3}
          removeClippedSubviews={false}
          style={{ flexGrow: 0 }}
        />
        <Paginator data={steps} scrollX={scrollX} />
        <View
          style={{
            width: wp(100),
            paddingHorizontal: wp(5),
            alignItems: 'center',
          }}
        >
          {currentIndex < steps.length - 1 ? (
            <Button handleSubmit={handleNext} text={t('next')} />
          ) : (
            <View
              className="w-full flex-row bg-backgroundColor dark:bg-dark-backgroundColor"
              style={{
                gap: wp(3),
              }}
            >
              <Button
                handleSubmit={handleBack}
                text={t('back')}
                style={{ flex: 1 }}
                type="back"
              />
              <Button
                handleSubmit={handleGoogleSignIn}
                style={{ flex: 1 }}
                text={t('google-signin')}
                isLoading={isSubmitting}
              />
            </View>
          )}
        </View>
      </View>
      {alertVisible && (
        <Alert
          visible={alertVisible}
          title={alert.title}
          desc={alert.desc}
          type={alert.type}
          onPress={alert.onPress}
          isLoading={isAlertLoading}
          onDismiss={() => setAlertVisible(false)}
        />
      )}
    </View>
  );
}
