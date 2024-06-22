import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import CustomBtn from '../CustomBtn.js';


export default function AddDogForm({ navigation }) {
  const [dogName, setDogName] = useState("");
  const { addDog } = useAuth();

  return (
    <View style={styles.container}>
        <Text style={styles.headerText}>Add Dog</Text>
        <View style={{ flexDirection: 'row' }}>
        <TextInput
            style={styles.input}
            value={dogName}
            onChangeText={setDogName}
            placeholder="Dog Name"
        />
        <CustomBtn icon="arrow-forward-circle-outline" text="Add" onPress={() => addDog(dogName)} />
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'left',
    alignItems: 'left',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  }, 
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    margin: 10,
    width: 200,
  }, 


})