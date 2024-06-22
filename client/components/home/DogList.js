import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { useAuth } from '../../context/AuthContext';

export default function DogList() {
    const { dogs } = useAuth();

  return (
    <View>
        <Text>Dog List</Text>
        <FlatList
            data={dogs}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  )
}
