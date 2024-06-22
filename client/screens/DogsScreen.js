import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { useAuth } from '../context/AuthContext';
import AddDogForm from '../components/home/AddDogForm';
import DogList from '../components/home/DogList';
import CustomBtn from '../components/CustomBtn';

export default function DogsScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Welcome {user.username}</Text>
      {/* Form to add dogs */}
      <CustomBtn icon="arrow-back-circle-outline" text="Add Dog" onPress={() => navigation.navigate("Dogs")} />

      {/* List of dogs */}
      <DogList />
    </View>
  )
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  container: {
    padding: 20,
  }
})