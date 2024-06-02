import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")} // Update the path to your logo image
        style={styles.logo}
      />
      <Text style={styles.text}>NoteMate</Text>
    </View>
  );
};

SplashScreen.navigationOptions = {
  headerShown: false, // Hide the header for the SplashScreen
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    width: 130, // Adjust the width of the logo as needed
    height: 130, // Adjust the height of the logo as needed
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SplashScreen;
