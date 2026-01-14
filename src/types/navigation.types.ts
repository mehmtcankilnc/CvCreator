import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  App: undefined;
  CreateResume: undefined;
  CreateCoverLetter: undefined;
  Templates: undefined;
  FileViewer: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
