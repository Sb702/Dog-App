import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import DogTricks from "../components/home/DogTricks";
import CustomBtn from "../components/CustomBtn";
import { useAuth } from "../context/AuthContext";

export default function DogEdit({ route }) {
  const { updateDog } = useAuth();
  const [edit, setEdit] = useState(false);
  const { dog } = route.params;
  const [originalName, setOriginalName] = useState(dog.dogName);
  const [dogName, setDogName] = useState(dog.dogName);
  const [dogBreed, setDogBreed] = useState(dog.dogBreed);
  const [dogAge, setDogAge] = useState(dog.dogAge);

  const { addDogTricks, user } = useAuth();
  const [trick, setTrick] = useState("");

  
  function addTrick() {
    addDogTricks(dog.dogName, trick, "beginner", user.id);
    // console.log(user, "user in DogEdit.js");
  }

  function handleSubmit() {
    setOriginalName(dogName);
    // console.log(dogName, dogBreed, dogAge, originalName, user.id, "from DogEdit.js 26");
    updateDog(dogName, dogBreed, dogAge, originalName, user.id);
    setEdit(!edit);
  }

  useEffect(() => {
    console.log(dogAge);
  }, [dogAge, edit]);



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.deHeaderCont}>
        {edit ? (
          <TextInput
            style={styles.deTextInputHeader}
            value={dogName}
            onChangeText={(text) => setDogName(text)}
          ></TextInput>
        ) : (
          <Text style={styles.deHeaderText}>{dog.dogName}</Text>
        )}
      </View>
      <View style={styles.deTextBox}>
        {edit ? (
          <TextInput
            style={styles.deTextInput}
            value={dogBreed}
            onChangeText={(text) => setDogBreed(text)}
          ></TextInput>
        ) : (
          <Text style={styles.deText}>{dog.dogBreed}</Text>
        )}
        {edit ? (
          <TextInput
            style={styles.deTextInput}
            value={dogAge}
            // number pad
            keyboardType="numeric"
            onChangeText={(text) => setDogAge(text)}
          >
          </TextInput>
        ) : (
          <Text style={styles.deText}>{dog.dogAge}</Text>
        )}
        {/* if we are editing we want to call handleSubmit to send the data to our context */}
        {/* <CustomBtn icon="pencil" text="Edit" onPress={() => setEdit(!edit)} /> */}
        <CustomBtn
          icon={edit ? "enter" : "pencil"}
          color={"white"}
          onPress={edit ? handleSubmit : () => setEdit(!edit)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DogTricks dog={dog} />
      </View>
      <View style={styles.trickOutContainer}>
        <TextInput
          style={styles.trickInput}
          placeholder="Trick"
          onChangeText={(text) => setTrick(text)}
        />
        <CustomBtn text="Add Trick" icon="add" onPress={addTrick} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dogEditContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  deHeaderCont: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  deHeaderText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  deTextBox: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  deText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  deTextInput: {
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 15,
  },
  deTextInputHeader: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    maxWidth: 200,
    paddingHorizontal: 15,
  },
  trickOutContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    gap: 10,
  },
  trickInput: {
    fontSize: 20,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 15,
    backgroundColor: "lightgray",
    color: "black",
    width: 200,
  },
});
