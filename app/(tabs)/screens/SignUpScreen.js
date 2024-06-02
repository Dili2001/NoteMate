import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import axios from "axios";

// Error component to display error messages
const Error = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "http://10.89.21.177:5000/api/auth/signup",
        {
          username,
          password,
        },
      );
      // Check if the server response indicates success
      if (response.status === 201) {
        navigation.navigate("Login");
      } else {
        // Server responded with an unexpected status code
        setError("An error occurred during signup. Please try again later.");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with an error status code
        if (error.response.status === 400) {
          setError("Username is already taken. Please choose a different one.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else {
        // Network error or other unexpected error
        setError("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      {error ? <Error message={error} /> : null}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your username"
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="#999"
      />
      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={handleSignUp} color="#1E90FF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Back to Login"
          onPress={() => navigation.navigate("Login")}
          color="#1E90FF"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: "#ff4d4d",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  errorText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
});

export default SignUpScreen;
