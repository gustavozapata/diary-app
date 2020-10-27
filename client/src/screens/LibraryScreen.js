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

//This file creates the Library stack navigator and the main screen that lives in the stack
const LibraryScreen = () => {
  const {
    state: { isDark, content },
  } = useContext(DiaryContext);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#0F1129" : "#fff",
        },
        headerTintColor: isDark ? "#fff" : "#000",
      }}
    >
      <Stack.Screen
        name="Library"
        component={MainScreen}
        options={{ title: content.LIBRARY }}
      />
    </Stack.Navigator>
  );
};

//This is the Main screen in the Library tab
const MainScreen = () => {
  const {
    state: { content, theme },
  } = useContext(DiaryContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  //this function runs whenever the 'return' button is pressed
  //it makes a GET request to the Google Books API with the word(s) specified in the search input
  const doSearch = (search) => {
    if (search !== "") {
      //this shows a loading gif when loading the results
      //this gif is hidden once the request has finalised
      setLoading(true);
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
        .then((res) => {
          //the results are stored in the 'books' state array
          setBooks(res.data.items);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[screenStyles.safeArea, theme.screen]}>
      <ScrollView
        contentContainerStyle={screenStyles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, theme.text]}>{content.LIBRARY_TITLE}</Text>
        <Image
          source={require("../../assets/brush.png")}
          style={{ width: 210, height: 20, marginTop: -10, marginBottom: 15 }}
        />
        <SearchBar
          placeholder={content.SEARCH_BOOKS_PLACEHOLDER}
          doSearch={doSearch}
        />

        {/* the 'loading' state variable defines what content to render
           This is handled by the doSearch function above */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Image
              source={require("../../assets/loading1.gif")}
              style={styles.loading}
            />
          </View>
        ) : (
          // The array is used in order to have an inner render condition
          [
            <View
              key="1"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {/* this renders the books from the results */}
              {books && books.length > 0 ? (
                books.map((book) => <Book book={book} key={book.id} />)
              ) : (
                <Image
                  source={require("../../assets/library2.png")}
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
  },
});

export default LibraryScreen;
