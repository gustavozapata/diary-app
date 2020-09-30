import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

export default function CalendarScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={MainScreen} />
    </Stack.Navigator>
  );
}

function MainScreen() {
  return (
    <View>
      <Text>CalendarScreen</Text>
    </View>
  );
}
