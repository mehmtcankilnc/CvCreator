import { View } from 'react-native';
import React from 'react';
import Button from './Button';

export default function GoogleSignInBtn({ handleGoogle, isLoading }) {
  return (
    <View className="w-full">
      <Button
        handleSubmit={handleGoogle}
        text="Sign In via Google"
        type="back"
        isLoading={isLoading}
      />
    </View>
  );
}
