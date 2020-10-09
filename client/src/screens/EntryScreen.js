import React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import RatingStars from "../components/RatingStars";
import entryStyles from "../styles/entryStyles";
import { toDateString } from "../utils/utils";

export default function EntryScreen({ entry }) {
  return (
    <ScrollView style={entryStyles.container}>
      <Text style={entryStyles.title}>{entry.title}</Text>
      <RatingStars />
      <View style={styles.pagesContainer}>
        <Text style={entryStyles.date}>{toDateString(entry.date)}</Text>
        <View style={styles.pages}>
          <Text style={styles.pagesText}>pages 34-78</Text>
        </View>
      </View>
      <Text style={entryStyles.description}>{entry.description}</Text>
      <View
        style={{
          borderBottomColor: "#bbb",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginVertical: 12,
        }}
      />
      <View sytle={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pages: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#F20D44",
    // borderStyle: "dotted",
    backgroundColor: "#EF126F",
    padding: 3,
  },
  pagesText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#fff",
    // color: "#F20D44",
  },
  commentsContainer: {
    // marginTop: 80,
  },
  commentsTitle: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "700",
  },
});
