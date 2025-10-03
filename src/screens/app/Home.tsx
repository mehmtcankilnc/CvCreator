import React from 'react';
import { View, Text } from 'react-native';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center bg-white z-10 -mt-6 rounded-t-3xl">
      <Text>Home</Text>
      <Button
        handlePress={() => console.log('Clicked!')}
        text="Continue"
        width={200}
      />
      <Loading />
    </View>
  );
}
