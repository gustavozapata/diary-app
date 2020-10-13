import React from "react";
import { ScrollView, Text, StyleSheet, View, Image } from "react-native";
import Comments from "../components/Comments";
import RatingStars from "../components/RatingStars";
import entryStyles from "../styles/entryStyles";
import { toDateString } from "../utils/utils";

export default function EntryScreen({ entry }) {
  return (
    <ScrollView style={entryStyles.container}>
      <Text style={entryStyles.title}>{entry.title}</Text>
      <RatingStars stars={entry.rating} />
      <View style={styles.pagesContainer}>
        <Text style={entryStyles.date}>{toDateString(entry.date)}</Text>
        <View style={styles.pages}>
          <Text style={styles.pagesText}>page {entry.page}</Text>
        </View>
      </View>
      <Text style={entryStyles.description}>{entry.description}</Text>
      <View style={styles.separator} />
      <Comments entry={entry} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  pages: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#F20D44",
    backgroundColor: "#EF126F",
    padding: 3,
  },
  pagesText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#fff",
  },
});
