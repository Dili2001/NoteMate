import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Error component to display error messages
const Error = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://10.89.21.177:5000/api/auth/login",
        {
          username,
          password,
        },
      );

      // Assuming successful login, save the JWT token
      const { token } = response.data;
      await AsyncStorage.setItem("token", token);

      // Navigate to the main screen
      navigation.navigate("Main");
    } catch (error) {
      console.error(error);
      if (error.response) {
        // Server responded with an error status code
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("Network error. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("Unexpected error. Please try again later.");
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
        <Button title="Login" onPress={handleLogin} color="#1E90FF" />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate("SignUp")}
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

export default LoginScreen;
