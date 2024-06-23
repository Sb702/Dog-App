import React, { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "@react-navigation/native";



export default function Login({ setRegister }) {
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const localUser = useAuth.user;

    const navigation = useNavigation();


  // Get the user from AuthContext
  const { user, loginUser } = useAuth();
  // Check if the username and password match the user in the context and if they do navigate to "Home"
async function checkCredentials() {
  const result = await loginUser(username, password);
  if (result && result.success) {
    // If login is successful, navigate to the "Home" screen
    navigation.navigate("Home");
  } else {
    // Optionally, handle login failure (e.g., show an error message)
    console.log("Login failed:", result.message);
  }
}




  // If they match, call setIsLoggedIn(true) from the context

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Screen</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
            onChangeText={setUsername} // Update username state on change
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
            onChangeText={setPassword} // Update password state on change
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Login" onPress={checkCredentials} />
        <View style={styles.spacer} />
        <Button title="Register" onPress={() => setRegister(true)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
  },
  spacer: {
    height: 10,
  },
});
