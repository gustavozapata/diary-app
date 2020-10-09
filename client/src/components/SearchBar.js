import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = ({ placeholder, doSearch }) => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.searchBar}>
      <Ionicons name="ios-search" size={25} style={{ marginTop: 4 }} />
      <TextInput
        onChangeText={(text) => setSearch(text)}
        placeholder={placeholder}
        value={search}
        style={styles.inputSearch}
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
