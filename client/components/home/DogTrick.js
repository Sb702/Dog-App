import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomBtn from "../CustomBtn";
import { useAuth } from "../../context/AuthContext";

export default function DogTrick({ item, name }) {
  const { updateDogTricksStatus, removeTrick, user } = useAuth();
  // console.log(item, "item from DogTrick")
  const [currentDifficulty, setCurrentDifficulty] = useState(item.difficulty);


  function updateTrickLevel(level) {
    updateDogTricksStatus(name, item.trick, level, user.id);

    setCurrentDifficulty(level);
  }

  function removeTrickFromDog() {
    removeTrick(name, item.trick, user.id);
  }



  return (
    <View style={styles.trickOutsiderContainer}>
      <Text style={styles.trickText}>{item.trick}</Text>
      <View style={styles.trickBtnsContainer}>
        <CustomBtn
          text="Low"
          icon="add"
          onPress={() => updateTrickLevel("low")}
          color={currentDifficulty === "low" ? "white" : "black"}
        />
        <CustomBtn
          text="Medium"
          icon="add"
          onPress={() => updateTrickLevel("medium")}
          color={currentDifficulty === "medium" ? "white" : "black"}
        />
        <CustomBtn
          text="High"
          icon="add"
          onPress={() => updateTrickLevel("high")}
          color={currentDifficulty === "high" ? "white" : "black"}
        />
      </View>
      <CustomBtn
        text="Remove"
        icon="trash"
        onPress={removeTrickFromDog}
        color="red"
      />

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
