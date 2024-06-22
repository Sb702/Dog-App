import React from "react";
import { StyleSheet, Text, View } from "react-native";
import DogTricks from "../components/home/DogTricks";

export default function DogEdit({ route }) {
  const { dog } = route.params;

  // console.log(dog)

  return (
    <View>
      <View>
        <Text style={styles.deHeaderText}>{dog.dogName}</Text>
      </View>
      <View style={styles.deTextBox}>
        <Text style={styles.deText}>{dog.dogBreed}</Text>
        <Text style={styles.deText}>{dog.dogAge}</Text>
      </View>
      <DogTricks dog={dog} />
    </View>
  );
}

const styles = StyleSheet.create({
  dogEditContainer: {
    justifyContent: "center",
    alignItems: "center",
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
  },
  deText: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
