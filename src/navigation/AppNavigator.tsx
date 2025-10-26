/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation.types';
import DrawerNav from './DrawerNav';
import CreateResume from '../screens/CreateResume';
import CreateCoverLetter from '../screens/CreateCoverLetter';
import Templates from '../screens/Templates';
import SplashScreen from '../screens/SplashScreen';
import OnboardingStack from './OnboardingStack';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['bottom', 'left', 'right']}
    >
      <NavigationContainer>
        <StatusBar backgroundColor="#1810C2" barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingStack} />
          <Stack.Screen name="App" component={DrawerNav} />
          <Stack.Screen name="CreateResume" component={CreateResume} />
          <Stack.Screen
            name="CreateCoverLetter"
            component={CreateCoverLetter}
          />
          <Stack.Screen name="Templates" component={Templates} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
