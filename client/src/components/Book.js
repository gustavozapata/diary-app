import React, { useContext } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import DiaryContext from "../context/DiaryContext";

//this component renders the container holding the information of a book from the result
const Book = ({ book }) => {
  const {
    state: { theme },
  } = useContext(DiaryContext);

  return (
    <View style={[styles.container, theme.section]}>
      <Text style={[styles.bookTitle, theme.text]}>
        {book.volumeInfo.title.length > 19
          ? //if the length of the title is longer than 23 characters, 3 dots are placed at the end of it
            book.volumeInfo.title.substring(0, 23) + "..."
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
