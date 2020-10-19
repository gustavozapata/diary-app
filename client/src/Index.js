import React, { useContext } from "react";
import HomeStack from "./screens/HomeStack";
import LibraryScreen from "./screens/LibraryScreen";
import SettingsScreen from "./screens/SettingsScreen";
//Dependecy: reactnavigation.org
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import DiaryContext from "./context/DiaryContext";

const Index = () => {
  const {
    state: { isDark, content },
  } = useContext(DiaryContext);
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
          activeTintColor: isDark ? "#fff" : "blue",
          inactiveTintColor: isDark ? "#777" : "gray",
          style: {
            backgroundColor: isDark ? "#1C1C1D" : "#fff",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ title: content.TAB_NAME }}
        />
        <Tab.Screen
          name="Library"
          component={LibraryScreen}
          options={{ title: content.LIBRARY }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: content.SETTINGS }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Index;
