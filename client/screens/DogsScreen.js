import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { useAuth } from '../context/AuthContext';

export default function DogsScreen() {
  const { user } = useAuth();

  return (
    <View>
      <Text>Hi {user.username}!</Text>
    </View>
  )
}