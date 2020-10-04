import React from "react";
import { ScrollView, Text } from "react-native";
import entryStyles from "../styles/entryStyles";
import { toDateString } from "../utils/utils";

export default function EntryScreen({ entry }) {
  return (
    <ScrollView style={entryStyles.container}>
      <Text style={entryStyles.title}>{entry.title}</Text>
      <Text style={entryStyles.date}>{toDateString(entry.date)}</Text>
      <Text style={entryStyles.description}>{entry.description}</Text>
    </ScrollView>
  );
}
