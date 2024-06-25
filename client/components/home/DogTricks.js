import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import CustomBtn from "../CustomBtn";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import DogTrick from "./DogTrick";

export default function DogTricks({ dog }) {

  return (
    <View>
      {dog.tricks && (
        <FlatList
          data={dog.tricks}
          renderItem={({ item }) => <DogTrick name={dog.dogName} item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  trickOutContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    gap: 10,
  },
});