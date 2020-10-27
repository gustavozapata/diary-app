import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Entypo from "@expo/vector-icons/Entypo";
import DiaryContext from "../context/DiaryContext";

//This file holds the Stack navigations and the Main screen for the Settings tab
const SettingsScreen = () => {
  const {
    state: { isDark, content },
  } = useContext(DiaryContext);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#0F1129" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="Settings"
        component={MainScreen}
        options={{ title: content.SETTINGS }}
      />
    </Stack.Navigator>
  );
};

//this is the main screen within the Settings tab
const MainScreen = () => {
  const { state, switchTheme } = useContext(DiaryContext);
  const { content, isDark, theme } = state;

  return (
    <View style={[styles.container, theme.container]}>
      <Text style={styles.title}>{content.LANGUAGE}</Text>
      <View style={[styles.section, theme.section]}>
        {LanguageOption("English")}
        <View style={styles.separator}></View>
        {LanguageOption("Spanish")}
      </View>
      <Text style={styles.title}>{content.THEME}</Text>
      <View style={[styles.section, theme.section]}>
        <View style={styles.row}>
          <Text style={[styles.option, theme.text]}>{content.DARK_MODE}</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#36CE38" }}
            thumbColor={isDark ? "#fff" : "#fff"}
            ios_backgroundColor="#E9E9EB"
            onValueChange={() => switchTheme(!isDark)}
            value={isDark}
          />
        </View>
      </View>
    </View>
  );
};

//Both language options use the same UI with different labels
//this function renders this widget with the label passed above
const LanguageOption = (lang) => {
  const { state, switchLanguage } = useContext(DiaryContext);
  const { theme } = state;

  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={1.0}
      onPress={() => switchLanguage(lang)}
    >
      <Text style={[styles.option, theme.text]}>{lang}</Text>
      {state.language === lang && (
        <Entypo
          name="check"
          color="#347FF6"
          size={23}
          style={{ marginTop: 5 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    padding: 15,
    borderRadius: 10,
  },
  separator: {
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  option: {
    fontSize: 20,
    paddingVertical: 4,
  },
});
