import React from "react";
import HomeStack from "./src/screens/HomeStack";
import LibraryScreen from "./src/screens/LibraryScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
//Dependecy: reactnavigation.org
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DiaryProvider } from "./src/context/DiaryContext";

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <DiaryProvider>
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
            component={HomeStack}
            options={{ title: "Home" }}
          />
          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{ title: "Library" }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{ title: "Settings" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </DiaryProvider>
  );
}
