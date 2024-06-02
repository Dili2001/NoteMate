import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Error component to display error messages
const Error = ({ message }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const AddNoteScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleAddNote = async () => {
    try {
      // Retrieve the JWT token from AsyncStorage
      const token = await AsyncStorage.getItem("token");

      // Make the request to the backend
      await axios.post(
        "http://10.89.21.177:5000/api/notes/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Navigate to the Notes screen
      navigation.navigate("Notes");
    } catch (error) {
      console.error(error);
      setError("An error occurred while adding the note. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {error ? <Error message={error} /> : null}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter the note title"
        placeholderTextColor="#999"
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={styles.textArea}
        value={content}
        onChangeText={setContent}
        placeholder="Enter the note content"
        placeholderTextColor="#999"
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Note" onPress={handleAddNote} color="#1E90FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    height: 100,
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

export default AddNoteScreen;
