/* eslint-disable react-native/no-inline-styles */
import { View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Page from '../components/Page';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { resumeTemplatesData } from '../data/resumeTemplatesData';
import { TemplateCard } from '../components/CreateResumeSteps/TemplateSelectStep';
import Button from '../components/Button';

type Props = {
  navigation: any;
};

const { width: screenWidth } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;

export default function Templates({ navigation }: Props) {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);

  return (
    <View style={{ flex: 1 }}>
      <Header
        handlePress={() => navigation.goBack()}
        iconName="chevron-back"
        title="Templates"
      />
      <Page>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid
          extraScrollHeight={isSmallScreen ? wp(25) : 0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          className="w-full"
        >
          <View
            className="flex-row flex-wrap justify-between"
            style={{ rowGap: wp(5) }}
          >
            {resumeTemplatesData.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={
                  resumeTemplatesData[selectedTemplateIndex].id === template.id
                }
                onPress={() => setSelectedTemplateIndex(template.id)}
              />
            ))}
          </View>
        </KeyboardAwareScrollView>
      </Page>
      <View
        className="w-full flex-row bg-backgroundColor dark:bg-dark-backgroundColor"
        style={{ paddingHorizontal: wp(5), paddingBottom: wp(5) }}
      >
        <Button
          handleSubmit={() =>
            navigation.navigate('CreateResume', {
              templateIndex: selectedTemplateIndex,
            })
          }
          style={{ flex: 1 }}
          text="Create Now"
        />
      </View>
    </View>
  );
}
