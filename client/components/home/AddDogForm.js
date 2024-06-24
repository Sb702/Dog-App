import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import CustomBtn from "../CustomBtn.js";

export default function AddDogForm({ navigation }) {
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogAge, setDogAge] = useState("");
  const { addDog, user } = useAuth();

  // console.log(user.id)

  function handleSubmit() {
    // addDog(dogName, dogBreed, dogAge, userId: user.id);
    console.log(dogName, dogBreed, dogAge, user.id)
    addDog(dogName, dogBreed, dogAge, user.id);
    navigation.goBack();
  }

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
        </View>
        <View>
        <CustomBtn
          icon="add"
          text="Add Dog"
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",

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
