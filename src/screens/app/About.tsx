import { View, Text } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';

type Props = {
  navigation: any;
};

export default function About({ navigation }: Props) {
  return (
    <View className="flex-1">
      <Header handlePress={() => navigation.toggleDrawer()} title="About" />
      <Page>
        <Text>About</Text>
      </Page>
    </View>
  );
}
