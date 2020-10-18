import React, { useEffect, useContext } from "react";
import { Text, ScrollView, TextInput } from "react-native";
import entryStyles from "../styles/entryStyles";
import DiaryContext from "../context/DiaryContext";
import { UPDATE_TITLE, UPDATE_DESC } from "../helpers/types";
import { toDateString } from "../utils/utils";

export default function AddEntryScreen({ route }) {
  const { loadEntry, updateText, state } = useContext(DiaryContext);
  const { content } = state;

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

  return (
    <ScrollView style={entryStyles.container}>
      <TextInput
        style={entryStyles.title}
        multiline={true}
        placeholder={content.BOOK_TITLE_PLACEHOLDER}
        value={state.bookTitle}
        autoFocus={true}
        onChangeText={(value) => updateText(UPDATE_TITLE, value)}
      />
      <Text style={entryStyles.date}>{state.bookDate}</Text>
      <TextInput
        multiline={true}
        style={entryStyles.description}
        placeholder={content.BOOK_DESC_PLACEHOLDER}
        value={state.bookDescription}
        onChangeText={(value) => updateText(UPDATE_DESC, value)}
      />
    </ScrollView>
  );
}
