import React, { useEffect, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import EntryScreen from "./EntryScreen";
import AddEntryScreen from "./AddEntryScreen";
import HomeScreen from "./HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import DiaryContext from "../context/DiaryContext";

//This component holds the stack navigation for the HomeScreen
//it defines the different screens that live in the Home tab
const HomeStack = ({ navigation }) => {
  const { state, save, edit, getEntries } = useContext(DiaryContext);
  const { content, isDark } = state;

  //this function runs when the component mounts (when it is created)
  useEffect(() => {
    getEntries();
  }, []);

  const Stack = createStackNavigator();

  //this function will run when a entry is either added or edited
  //it checks if there is content in the Book Title field, if there is:
  //it checks the type of action and then executes it
  const saveEntry = (action) => {
    if (state.bookTitle !== "") {
      if (action.title === "Add Book") {
        save(() => {
          navigation.navigate("Bookland");
        });
      } else {
        edit(action.entry._id, () => {
          navigation.navigate(action.entry._id);
        });
      }
    }
  };

  //this is how the Stack Navigator wraps the different/possible screens in this stack
  //each screen can have options to configure things like header, title, background colour, etc
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#0F1129" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
      }}
    >
      <Stack.Screen name="Bookland">
        {(props) => <HomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="addEntry"
        component={AddEntryScreen}
        options={({ route }) => ({
          title:
            route.params.title === "Edit Entry"
              ? content.EDIT_BOOK
              : content.NEW_BOOK,
          headerRight: () => (
            <Text style={styles.action} onPress={() => saveEntry(route.params)}>
              {content.SAVE}
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
                key={entry._id}
                onPress={() =>
                  navigation.navigate("addEntry", {
                    entry,
                    title: "Edit Entry",
                  })
                }
              >
                {content.EDIT}
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
