import { View, Text } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';

type Props = {
  navigation: any;
};

export default function Settings({ navigation }: Props) {
  return (
    <View className="flex-1">
      <Header handlePress={() => navigation.toggleDrawer()} />
      <Page>
        <Text>Settings</Text>
      </Page>
    </View>
  );
}
