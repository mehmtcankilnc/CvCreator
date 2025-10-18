/* eslint-disable react-native/no-inline-styles */
import { View, Text } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import Page from '../components/Page';

type Props = {
  navigation: any;
};

export default function CreateCoverLetter({ navigation }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        handlePress={() => navigation.goBack()}
        iconName="chevron-back"
        title="Create Cover Letter"
      />
      <Page>
        <Text>Create Cover Letter</Text>
      </Page>
    </View>
  );
}
