import React from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { useAuth } from "../../context/AuthContext";
import CustomBtn from "../CustomBtn";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DogList() {
  const { dogs } = useAuth();
  console.log(dogs, "Doglist.js line 10")

  const navigation = useNavigation();

  function renderDog({ item }) {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.dogContainer,
          pressed ? styles.pressed : null,
        ]}
        onPress={() => navigation.navigate("DogEdit", { dog: item })}
      >
        <View style={styles.dgcont}>
          <Image source={require("../../assets/Kane.jpeg")} style={{ width: 50, height: 50, borderRadius: 30 }} />
          <View style={styles.dgInnerCont}>
          <Text style={styles.dogName}>{item.dogName}</Text>
          <Text style={styles.dogBreed}>{item.dogBreed}</Text>
          <Text style={styles.dogAge}>{item.dogAge}</Text>
          </View>
        </View>
      </Pressable>
    );
  }

  // console.log(dogs)

  return (
    <View>
      <Text style={styles.headerText}>Dogs</Text>
      <FlatList
        data={dogs}
        renderItem={renderDog}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dogContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  dgcont: {
    backgroundColor: "navy",
    flexDirection: "row",
    padding: 10,
    borderRadius: 12,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  dgInnerCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    marginLeft: 10,
    alignItems: "center",
  },
  dogName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  dogBreed: {
    fontSize: 16,
    color: "white",
  },
  dogAge: {
    fontSize: 14,
    color: "white",
  },
  pressed: {
    opacity: 0.5,
  },
});
