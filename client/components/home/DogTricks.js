import { View, Text, TextInput, FlatList } from "react-native";
import CustomBtn from "../CustomBtn";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DogTricks({ dog }) {
  const { addDogTricks } = useAuth();
  const [trick, setTrick] = useState("");

  function addTrick() {
    addDogTricks(dog.dogName, trick);
  }

  return (
    <View>
      <Text>Tricks</Text>
      <TextInput placeholder="Trick" onChangeText={(text) => setTrick(text)} />
      <CustomBtn text="Add Trick" icon="add" onPress={addTrick} />
      {dog.tricks && (
        <FlatList
            data={dog.tricks}
            renderItem={({ item }) => <Text>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
