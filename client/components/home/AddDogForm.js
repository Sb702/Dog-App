import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CustomBtn from "../CustomBtn.js";

export default function AddDogForm({ navigation }) {
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const { addDog } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add Dog</Text>
      <View style={{ flexDirection: "column" }}>
        <TextInput
          style={styles.input}
          value={dogName}
          onChangeText={setDogName}
          placeholder="Dog Name"
        />
        <TextInput
          style={styles.input}
          value={dogBreed}
          onChangeText={setDogBreed}
          placeholder="Dog Breed"
        />
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={dogAge}
          onChangeText={setDogAge}
          placeholder="Dog Age"
        />
        <CustomBtn
          icon="add"
          text="Add Dog"
          onPress={() => {
            addDog(dogName, dogBreed, dogAge);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "left",
    alignItems: "left",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    margin: 10,
    width: 200,
  },
});
