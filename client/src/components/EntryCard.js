import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function EntryCard({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text>{`${item.description.substring(0, 45)}...`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: 24,
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
