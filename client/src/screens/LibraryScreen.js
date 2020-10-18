import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import Book from "../components/Book";
import SearchBar from "../components/SearchBar";
import screenStyles from "../styles/screenStyles";
import DiaryContext from "../context/DiaryContext";

const LibraryScreen = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={MainScreen} />
    </Stack.Navigator>
  );
};

const MainScreen = () => {
  const {
    state: { content },
  } = useContext(DiaryContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const doSearch = (search) => {
    if (search !== "") {
      setLoading(true);
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        .then((res) => {
          setBooks(res.data.items);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={screenStyles.safeArea}>
      <ScrollView
        contentContainerStyle={screenStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{content.LIBRARY_TITLE}</Text>
        <Image
          source={require("../../assets/brush.png")}
          style={{ width: 210, height: 20, marginTop: -10, marginBottom: 15 }}
        />
        <SearchBar
          placeholder={content.SEARCH_BOOKS_PLACEHOLDER}
          doSearch={doSearch}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <Image
              source={require("../../assets/loading.gif")}
              style={styles.loading}
            />
          </View>
        ) : (
          [
            <View
              key="1"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {books.length > 0 ? (
                books.map((book) => <Book book={book} key={book.id} />)
              ) : (
                <Image
                  source={require("../../assets/library.png")}
                  style={styles.image}
                />
              )}
            </View>,
          ]
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginVertical: 20,
  },
  image: {
    width: 230,
    height: 320,
    // resizeMode: "contain",
  },
});

export default LibraryScreen;
