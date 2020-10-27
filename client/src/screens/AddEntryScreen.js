import React, { useEffect, useContext } from "react";
import { Text, ScrollView, TextInput } from "react-native";
import entryStyles from "../styles/entryStyles";
import DiaryContext from "../context/DiaryContext";
import { UPDATE_TITLE, UPDATE_DESC } from "../helpers/types";
import { toDateString } from "../utils/utils";

//This is where new entries are created or edited
export default function AddEntryScreen({ route }) {
  //This is how we bring the state and functions that are used by this components
  //Instead of passing them down to child components
  const { loadEntry, updateText, state } = useContext(DiaryContext);
  const { content, theme } = state;

  //This is similar to the 'componentDidMount' for the class components
  //it runs every time the component is mounted
  useEffect(() => {
    if (route.params && route.params.entry) {
      const { entry } = route.params;
      loadEntry({
        title: entry.title,
        description: entry.description,
        date: toDateString(entry.date),
      });
    } else {
      loadEntry({ title: "", description: "", date: toDateString() });
    }
  }, []);
  //the empty [] tells react to run it only when it mounts

  return (
    //Most of the style attributes use an array to use multiple style objects
    //dark theme and light theme styles are loaded this way
    <ScrollView style={[entryStyles.container, theme.screen]}>
      <TextInput
        style={[entryStyles.title, theme.text]}
        multiline={true}
        placeholder={content.BOOK_TITLE_PLACEHOLDER}
        placeholderTextColor="#999"
        value={state.bookTitle}
        autoFocus={true}
        onChangeText={(value) => updateText(UPDATE_TITLE, value)}
      />
      <Text style={entryStyles.date}>{state.bookDate}</Text>
      <TextInput
        multiline={true}
        style={[entryStyles.description, theme.text]}
        placeholder={content.BOOK_DESC_PLACEHOLDER}
        placeholderTextColor="#999"
        value={state.bookDescription}
        onChangeText={(value) => updateText(UPDATE_DESC, value)}
      />
    </ScrollView>
  );
}
