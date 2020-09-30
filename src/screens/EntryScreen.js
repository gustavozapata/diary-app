import React from "react";
import { ScrollView, Text } from "react-native";
import entryStyles from "../styles/entryStyles";

export default function EntryScreen({ entry }) {
  return (
    <ScrollView style={entryStyles.container}>
      <Text style={entryStyles.title}>{entry.title}</Text>
      <Text style={entryStyles.date}>{entry.date}</Text>
      <Text style={entryStyles.description}>{entry.description}</Text>
    </ScrollView>
  );
}
