import React from "react";
import HomeScreen from "./src/screens/HomeScreen";
import LibraryScreen from "./src/screens/LibraryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
//Dependecy: reactnavigation.org
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        // tabBarOptions={{ keyboardHidesTabBar: true }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            if (route.name === "Home") {
              icon = "ios-bookmarks";
            } else if (route.name === "Library") {
              icon = "ios-book";
            } else if (route.name === "Settings") {
              icon = "ios-settings";
            }

            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ title: "Library", tabBarBadge: 2 }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
