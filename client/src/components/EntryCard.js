import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import DiaryContext from "../context/DiaryContext";
import { toDateString } from "../utils/utils";

//this component represents each of the row in the flat list
//it holds the book title, description and date
const EntryCard = ({ item }) => {
  const {
    state: { theme },
  } = useContext(DiaryContext);

  const showDescription = () => {
    if (item.description.length > 46) {
      //if the length of the book description is longer than 47 characters, 3 dots are placed at the end of it
      return `${item.description.substring(0, 47)}...`;
    }
    return item.description;
  };

  return (
    <View style={[styles.container, theme.screen]}>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, theme.text]}>{item.title}</Text>
        <Text style={[styles.date, theme.text]}>{toDateString(item.date)}</Text>
      </View>
      <Text style={theme.text}>{showDescription()}</Text>
    </View>
  );
};

export default EntryCard;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "700",
    fontSize: 18,
    width: "77%",
    marginBottom: 7,
  },
  date: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});
