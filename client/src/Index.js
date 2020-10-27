import React, { useContext } from "react";
import HomeStack from "./screens/HomeStack";
import LibraryScreen from "./screens/LibraryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import DiaryContext from "./context/DiaryContext";

//this components has been created in order to have another level in the hierarchy components
//so that the language and theme features can be applied to the higher level elements like the navigation tab and the screen titles
const Index = () => {
  const {
    state: { isDark, content },
  } = useContext(DiaryContext);
  const Tab = createBottomTabNavigator();

  //The NavigationContainer wraps the whole application. It manages the navigation tree and contains the navigation state
  //The Tab Navigator is used to create a bottom navigation bar that usually renders an icon and a label and each one of them refers to a separate Stack of screens
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        // tabBarOptions={{ keyboardHidesTabBar: true }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let icon;
            //the route name is checked in order to render the active tab
            if (route.name === "Home") {
              icon = "ios-bookmarks";
            } else if (route.name === "Library") {
              icon = "ios-book";
            } else if (route.name === "Settings") {
              icon = "ios-settings";
            }

            //expo offers a set of icons from different vendors. These share the same syntax for specifying an icon
            return <Ionicons name={icon} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: isDark ? "#0F8DE8" : "blue",
          inactiveTintColor: isDark ? "#666" : "gray",
          style: {
            backgroundColor: isDark ? "#0F1129" : "#fff",
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
