import React, { useState, useContext } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import DiaryContext from "../context/DiaryContext";

//this component is found on the Library screen
//it renders a Text Input where users will be able to search for a book
const SearchBar = ({ placeholder, doSearch }) => {
  const {
    state: { isDark, theme },
  } = useContext(DiaryContext);
  const [search, setSearch] = useState("");

  return (
    <View style={styles.searchBar}>
      <Ionicons
        name="ios-search"
        size={25}
        style={{ marginTop: 4 }}
        color={isDark ? "#fff" : "#000"}
      />
      <TextInput
        onChangeText={(text) => {
          setSearch(text);
        }}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={search}
        style={[styles.inputSearch, theme.text]}
        //this runs whenever the user presses the 'return' key on the keyboard
        onSubmitEditing={() => doSearch(search)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingLeft: 10,
    marginVertical: 12,
    width: "90%",
    height: 35,
  },
  inputSearch: {
    width: "100%",
    marginLeft: 6,
  },
});
