import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

export type OnboardingStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: undefined;
  CreateResume: undefined;
  CreateCoverLetter: undefined;
  Templates: undefined;
};

export type OnboardingScreenProps<T extends keyof OnboardingStackParamList> =
  StackScreenProps<OnboardingStackParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
