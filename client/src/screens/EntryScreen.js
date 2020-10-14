import React, { useContext, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Comments from "../components/Comments";
import RatingStars from "../components/RatingStars";
import entryStyles from "../styles/entryStyles";
import { toDateString } from "../utils/utils";
import DiaryContext from "../context/DiaryContext";

const EntryScreen = ({ entry }) => {
  const { updatePage } = useContext(DiaryContext);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(entry.page);

  return (
    <ScrollView style={entryStyles.container}>
      <Text style={entryStyles.title}>{entry.title}</Text>
      <RatingStars entry={entry} />
      <View style={styles.pagesContainer}>
        <Text style={entryStyles.date}>{toDateString(entry.date)}</Text>
        <TouchableOpacity style={styles.pages} onPress={() => setIsEdit(true)}>
          {isEdit ? (
            <TextInput
              style={styles.addPage}
              placeholder="page #"
              value={page}
              autoFocus={true}
              onBlur={() => setIsEdit(false)}
              onFocus={() => setPage("")}
              onChangeText={(value) => setPage(value.replace(/[^0-9]/g, ""))}
              onSubmitEditing={() => updatePage(entry._id, page)}
            />
          ) : (
            <Text style={styles.pagesText}>page {entry.page}</Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={entryStyles.description}>{entry.description}</Text>
      <View style={styles.separator} />
      <Comments entry={entry} />
    </ScrollView>
  );
};

export default EntryScreen;

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
    borderRadius: 5,
    backgroundColor: "#EF126F",
    padding: 3,
  },
  pagesText: {
    fontWeight: "600",
    fontSize: 13,
    color: "#fff",
    margin: 5,
    marginBottom: 6,
  },
  addPage: {
    backgroundColor: "#fff",
    padding: 5,
    minWidth: 60,
    fontSize: 15,
  },
});
