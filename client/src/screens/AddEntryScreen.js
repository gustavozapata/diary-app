import React, { useState, useEffect } from "react";
import { Text, ScrollView, TextInput } from "react-native";
import entryStyles from "../styles/entryStyles";

export default function AddEntryScreen({ route }) {
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (route.params && route.params.entry) {
      const { entry } = route.params;
      setItem({
        title: entry.title,
        description: entry.description,
      });
    }
  }, []);

  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const handleChangeText = (field, value) => {
    setItem((prevState) => {
      return { ...prevState, [field]: value };
    });
  };

  return (
    <ScrollView style={entryStyles.container}>
      <TextInput
        style={entryStyles.title}
        multiline={true}
        placeholder="Title"
        value={item.title}
        autoFocus={true}
        onChangeText={(value) => handleChangeText("title", value)}
      />
      <Text style={entryStyles.date}>
        {new Date().toLocaleDateString("en-GB", dateOptions)}
      </Text>
      <TextInput
        multiline={true}
        style={entryStyles.description}
        placeholder="Description"
        value={item.description}
        onChangeText={(value) => handleChangeText("description", value)}
      />
    </ScrollView>
  );
}
