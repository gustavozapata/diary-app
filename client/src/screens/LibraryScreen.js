import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

export default function LibraryScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={MainScreen} />
    </Stack.Navigator>
  );
}

function MainScreen() {
  return (
    <View>
      <Text>Library</Text>
    </View>
  );
}
