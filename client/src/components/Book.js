import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import DiaryContext from "../context/DiaryContext";

const Book = ({ book }) => {
  const {
    state: { theme },
  } = useContext(DiaryContext);

  return (
    <View style={[styles.container, theme.section]}>
      <Text style={[styles.bookTitle, theme.text]}>
        {book.volumeInfo.title.length > 19
          ? book.volumeInfo.title.substring(0, 23) + "..."
          : book.volumeInfo.title}
      </Text>
      <Image
        source={
          book.volumeInfo.imageLinks
            ? {
                uri: book.volumeInfo.imageLinks.thumbnail,
              }
            : require("../../assets/nofound.png")
        }
        style={styles.bookCover}
      />
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 230,
    backgroundColor: "#fff",
    // borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    padding: 5,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginVertical: 8,
  },
  bookCover: {
    width: 120,
    height: 150,
    resizeMode: "cover",
    resizeMode: "contain",
  },
});
