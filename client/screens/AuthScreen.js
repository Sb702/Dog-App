import { StyleSheet, Text, View } from "react-native";
import Login from "../components/auth/Login";
import { useState } from "react";
import Register from "../components/auth/Register";

export default function AuthScreen({  }) {
  const [register, setRegister] = useState(false);

  return (
    <View style={styles.container}>
      {register ? (
        <Register setRegister={setRegister} />
      ) : (
        <Login setRegister={setRegister} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
});
