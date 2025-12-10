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
import OnboardingStack from './OnboardingStack';

import linking from '../Linking';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <SafeAreaView
      className="bg-backgroundColor dark:bg-dark-backgroundColor"
      style={{ flex: 1 }}
      edges={['bottom', 'left', 'right']}
    >
      <NavigationContainer<RootStackParamList> linking={linking}>
        <StatusBar backgroundColor="#1810C2" barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="App"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        >
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
