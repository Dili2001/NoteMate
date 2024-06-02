import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const NotesScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(
        "http://10.89.21.177:5000/api/notes/notes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setNotes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.delete(`http://10.89.21.177:5000/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes(); // Update notes list after deletion
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchNotes(); // Refresh notes when screen gains focus
    }, []),
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteContent}>{item.content}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="Edit"
                onPress={() => navigation.navigate("EditNote", { note: item })}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteNote(item.id)}
                color="#FF0000"
              />
            </View>
          </View>
        )}
      />
      <Button
        title="Add Note"
        onPress={() => navigation.navigate("AddNote")}
        style={styles.addButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  noteContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    marginTop: 16,
  },
});

export default NotesScreen;
