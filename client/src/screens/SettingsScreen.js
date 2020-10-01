import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Entypo from "@expo/vector-icons/Entypo";

export default function SettingsScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={MainScreen} />
    </Stack.Navigator>
  );
}

function MainScreen() {
  const [settings, setSettings] = useState({
    language: "English",
    theme: "light",
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LANGUAGE</Text>
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1.0}
          onPress={() => setSettings({ ...settings, language: "English" })}
        >
          <Text style={styles.option}>English</Text>
          {settings.language === "English" && (
            <Entypo
              name="check"
              color="#347FF6"
              size={23}
              style={{ marginTop: 5 }}
            />
          )}
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: "#bbb",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginVertical: 12,
          }}
        ></View>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={1.0}
          onPress={() => setSettings({ ...settings, language: "Spanish" })}
        >
          <Text style={styles.option}>Spanish</Text>
          {settings.language === "Spanish" && (
            <Entypo
              name="check"
              color="#347FF6"
              size={23}
              style={{ marginTop: 5 }}
            />
          )}
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>THEME</Text>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.option}>Dark Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#36CE38" }}
            thumbColor={isEnabled ? "#fff" : "#fff"}
            ios_backgroundColor="#E9E9EB"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#999",
    marginTop: 40,
    marginBottom: 10,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  option: {
    fontSize: 20,
    paddingVertical: 4,
  },
});
