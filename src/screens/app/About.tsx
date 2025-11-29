/* eslint-disable react-native/no-inline-styles */
import { View, Text, Image } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import Page from '../../components/Page';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

type Props = {
  navigation: any;
};

export default function About({ navigation }: Props) {
  return (
    <View className="flex-1">
      <Header handlePress={() => navigation.toggleDrawer()} title="About" />
      <Page>
        <View
          className="flex-1 justify-center"
          style={{ paddingBottom: wp(10) }}
        >
          <Image
            source={require('../../assets/CvCreatorMaskot.png')}
            style={{ width: wp(85), height: wp(85) }}
            resizeMode="contain"
          />
          <View style={{ gap: wp(5) }}>
            <Text
              className="color-textColor dark:color-dark-textColor"
              style={{
                fontFamily: 'Kavoon-Regular',
                textAlign: 'center',
                fontSize: wp(4),
              }}
            >
              This is the masterpiece cv creator app.
            </Text>
            <Text
              className="color-textColor dark:color-dark-textColor"
              style={{
                fontFamily: 'Kavoon-Regular',
                textAlign: 'center',
                fontSize: wp(4),
              }}
            >
              Created by Mehmetcan Kılınç
            </Text>
          </View>
        </View>
      </Page>
    </View>
  );
}
