import React, { useState, useEffect, useContext } from "react";
import { Text, ScrollView, TextInput } from "react-native";
import entryStyles from "../styles/entryStyles";
import { toDateString } from "../utils/utils";
import { EntryContext } from "../context/context";

export default function AddEntryScreen({ route }) {
  const { entrada, setEntrada } = useContext(EntryContext);

  useEffect(() => {
    if (route.params && route.params.entry) {
      const { entry } = route.params;
      setEntrada({
        title: entry.title,
        description: entry.description,
        date: toDateString(entry.date),
      });
    } else {
      setEntrada({
        title: "",
        description: "",
        date: toDateString(),
      });
    }
  }, []);

  const handleChangeText = (field, value) => {
    setEntrada((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  return (
    <ScrollView style={entryStyles.container}>
      <TextInput
        style={entryStyles.title}
        multiline={true}
        placeholder="Book Title"
        value={entrada.title}
        autoFocus={true}
        onChangeText={(value) => handleChangeText("title", value)}
      />
      <Text style={entryStyles.date}>{entrada.date}</Text>
      <TextInput
        multiline={true}
        style={entryStyles.description}
        placeholder="Brief description of the book"
        value={entrada.description}
        onChangeText={(value) => handleChangeText("description", value)}
      />
    </ScrollView>
  );
}
