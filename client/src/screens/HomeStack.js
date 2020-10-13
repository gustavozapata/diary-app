import React, { useEffect, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import EntryScreen from "./EntryScreen";
import AddEntryScreen from "./AddEntryScreen";
import HomeScreen from "./HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DiaryContext from "../context/DiaryContext";

//TODO: - USE REDUCER HOOK
const HomeStack = ({ navigation }) => {
  const { state, save, edit, getEntries } = useContext(DiaryContext);

  useEffect(() => {
    getEntries();
  }, []);

  const Stack = createStackNavigator();

  const saveEntry = (action) => {
    if (action.title === "Add Entry") {
      save(() => {
        navigation.navigate("Diario");
      });
    } else {
      //edit entry
      edit(action.entry._id, () => {
        navigation.navigate(action.entry._id);
      });
    }
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Diario">
        {(props) => <HomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="addEntry"
        component={AddEntryScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () => (
            <Text style={styles.action} onPress={() => saveEntry(route.params)}>
              Save
            </Text>
          ),
        })}
      />
      {state.entries.map((entry) => (
        <Stack.Screen
          name={entry._id}
          key={entry._id}
          options={{
            title: "",
            headerRight: () => (
              <Text
                style={styles.action}
                onPress={() =>
                  navigation.navigate("addEntry", {
                    entry,
                    title: "Edit Entry",
                  })
                }
              >
                Edit
              </Text>
            ),
          }}
        >
          {(props) => <EntryScreen {...props} entry={entry} />}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  action: {
    fontSize: 15,
    color: "#1270DD",
    fontWeight: "500",
    marginRight: 14,
    textDecorationLine: "underline",
  },
});
