import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomBtn from "../CustomBtn";
import { useAuth } from "../../context/AuthContext";

export default function DogTrick({ item, name }) {
  const { updateDogTricksStatus } = useAuth();

  function updateTrickLevel(level) {
    updateDogTricksStatus(name, item.trick, level);
    console.log(item.status);
  }

  return (
    <View style={styles.trickOutsiderContainer}>
      <Text style={styles.trickText}>{item.trick}</Text>
      <View style={styles.trickBtnsContainer}>
        <CustomBtn
          text="Low"
          icon="add"
          onPress={() => updateTrickLevel("low")}
          color={item.status === "low" ? "white" : "black"}
        />
        <CustomBtn
          text="Medium"
          icon="add"
          onPress={() => updateTrickLevel("medium")}
          color={item.status === "medium" ? "white" : "black"}
        />
        <CustomBtn
          text="High"
          icon="add"
          onPress={() => updateTrickLevel("high")}
          color={item.status === "high" ? "white" : "black"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  trickOutsiderContainer: {
    backgroundColor: "lightblue",
    padding: 10,
    margin: 10,
    borderRadius: 25,
  },
  trickText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  trickBtnsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    gap: 10,
  },
});
