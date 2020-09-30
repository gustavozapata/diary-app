import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

export default function SettingsScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={MainScreen} />
    </Stack.Navigator>
  );
}

function MainScreen() {
  return (
    <View>
      <Text>Setting Screen</Text>
    </View>
  );
}
