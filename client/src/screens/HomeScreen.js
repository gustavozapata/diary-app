import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import EntryCard from "../components/EntryCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import EntryAction from "../components/EntryAction";
import SearchBar from "../components/SearchBar";
import DiaryContext from "../context/DiaryContext";
import screenStyles from "../styles/screenStyles";

//FIXME: offline mode
// import entriesData from "../data/entries.json";

const HomeScreen = ({ navigation }) => {
  const { state, deleteEntry } = useContext(DiaryContext);
  const { entries } = state;

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={screenStyles.safeArea}>
        <ScrollView
          contentContainerStyle={screenStyles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <SearchBar placeholder="Search by title" />
          <View style={styles.banner}>
            {entries.length > 0 && (
              <View style={{ flexDirection: "row", marginRight: 45 }}>
                <Text style={styles.sort}>Sort by Title</Text>
                <Text style={styles.sort}>Sort by Date</Text>
              </View>
            )}
            <Text
              style={styles.addEntry}
              onPress={() =>
                navigation.navigate("addEntry", { title: "Add Entry" })
              }
            >
              +Add Book
            </Text>
          </View>
          {entries.length > 0 ? (
            <FlatList
              data={entries}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate(item._id)}>
                  {/* https://docs.swmansion.com/react-native-gesture-handler/docs/#installation */}
                  <Swipeable
                    renderRightActions={(progress, dragX) => (
                      <EntryAction
                        progress={progress}
                        dragX={dragX}
                        deleteEntry={() => deleteEntry(item._id)}
                      />
                    )}
                    key={item._id}
                  >
                    <EntryCard item={item} navigation={navigation} />
                  </Swipeable>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                <View style={styles.listSeparator} />
              )}
            />
          ) : (
            <View style={styles.startView}>
              <Image
                source={require("../../assets/startscreen.png")}
                style={styles.startImage}
              />
              <Text style={styles.startText}>
                Start by adding a book using {"\n"}the
                <Text style={{ fontWeight: "bold" }}> +Add Book</Text> button
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  listSeparator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  banner: {
    flex: 1,
    width: "100%",
    padding: 6,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addEntry: {
    fontWeight: "700",
    borderWidth: 2,
    fontSize: 13,
    borderRadius: 6,
    borderColor: "#000",
    backgroundColor: "#fff",
    color: "#000",
    padding: 5,
  },
  sort: {
    fontSize: 12,
    borderRadius: 6,
    padding: 4,
    marginRight: 15,
    fontWeight: "700",
    color: "#1270DD",
  },
  startView: {
    marginTop: 60,
    alignItems: "center",
  },
  startImage: {
    width: 230,
    height: 200,
    marginBottom: 20,
    resizeMode: "cover",
  },
  startText: {
    fontSize: 16,
    color: "#888",
    lineHeight: 25,
    textAlign: "center",
  },
});
