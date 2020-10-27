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

//This is the screen that shows all the details about each entry
//Book info, pages, comments and rating
const EntryScreen = ({ entry }) => {
  const { updatePage, state } = useContext(DiaryContext);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(entry.page);
  const { content, theme } = state;

  return (
    <ScrollView
      style={[entryStyles.container, theme.screen]}
      //this helps the 'Post' button to be pressed when the 'add comment' input is focused
      keyboardShouldPersistTaps="handled"
    >
      <Text style={[entryStyles.title, theme.text]}>{entry.title}</Text>
      <RatingStars entry={entry} />
      <View style={styles.pagesContainer}>
        <Text style={entryStyles.date}>{toDateString(entry.date)}</Text>
        <TouchableOpacity style={styles.pages} onPress={() => setIsEdit(true)}>
          {isEdit ? (
            <TextInput
              style={styles.addPage}
              placeholder={`${content.PAGE} #`}
              value={page}
              autoFocus={true}
              onBlur={() => setIsEdit(false)}
              onFocus={() => setPage("")}
              onChangeText={(value) => setPage(value.replace(/[^0-9]/g, ""))}
              onSubmitEditing={() => updatePage(entry._id, page)}
            />
          ) : (
            <Text style={styles.pagesText}>
              {/* Content is loaded and displayed according to the language selected */}
              {content.PAGE} {entry.page}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <Text style={[entryStyles.description, theme.text]}>
        {entry.description}
      </Text>
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
