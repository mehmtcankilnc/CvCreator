import { View, Text } from 'react-native';
import React from 'react';

interface ExampleContentProps {
  title: string;
  itemId: number;
}

export default function ExampleContent({ title, itemId }: ExampleContentProps) {
  return (
    <View className="p-4">
      <Text className="text-2xl font-bold text-black mb-2 self-center">
        {title}
      </Text>
      <Text className="text-base text-gray">
        Bu içerik bottom sheet içinden render ediliyor.
      </Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
      <Text className="text-base text-gray mt-1">Gelen item id: {itemId}</Text>
    </View>
  );
}
