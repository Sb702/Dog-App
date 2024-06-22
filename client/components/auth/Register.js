import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';


export default function Register({ setRegister }) {
  const { registerUser } = useAuth(); // Destructure registerUser from useAuth
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Screen</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername} // Update username state on change
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword} // Update password state on change
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Submit"
          onPress={() => registerUser(username, password)} // Call registerUser on submit
        />
        <View style={styles.spacer} />
        <Button title="Login" onPress={() => setRegister(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f4f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 20,
  },
  spacer: {
    height: 10,
  },
});
