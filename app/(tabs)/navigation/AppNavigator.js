import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import NotesScreen from "../screens/NotesScreen";
import AddNoteScreen from "../screens/AddNoteScreen";
import EditNoteScreen from "../screens/EditNoteScreen";
import SplashScreen from "../screens/SplashScreen"; // Import the SplashScreen component

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NotesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notes" component={NotesScreen} />
    <Stack.Screen name="AddNote" component={AddNoteScreen} />
    <Stack.Screen name="EditNote" component={EditNoteScreen} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Notes" component={NotesStack} />
    {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    {/* <Tab.Screen name="About" component={AboutScreen} /> */}
  </Tab.Navigator>
);

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash">
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen
      name="Main"
      component={MainTabNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppNavigator;
