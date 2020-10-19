import React, { useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import EntryCard from "../components/EntryCard";
import Swipeable from "react-native-gesture-handler/Swipeable";
import EntryAction from "../components/EntryAction";
import DiaryContext from "../context/DiaryContext";
import screenStyles from "../styles/screenStyles";

const HomeScreen = ({ navigation }) => {
  const { state, deleteEntry } = useContext(DiaryContext);
  const { entries, content, theme, isDark } = state;

  return (
    <>
      <StatusBar barStyle={isDark ? "light-content" : "default"} />
      <SafeAreaView style={[screenStyles.safeArea, theme.screen]}>
        {entries.length > 0 ? (
          <FlatList
            data={entries}
            ListHeaderComponent={
              <Header entries={entries} navigation={navigation} />
            }
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate(item._id)}>
                {/* https://docs.swmansion.com/react-native-gesture-handler/docs/#installation */}
                <Swipeable
                  renderRightActions={(progress, dragX) => (
                    <EntryAction
                      progress={progress}
                      dragX={dragX}
                      deleteEntry={() => deleteEntry(item._id)}
                      label={content.DELETE}
                    />
                  )}
                >
                  <EntryCard item={item} navigation={navigation} />
                </Swipeable>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => (
              <View style={[styles.listSeparator, theme.separator]} />
            )}
          />
        ) : (
          <>
            <Header entries={entries} navigation={navigation} />
            <View style={styles.startView}>
              <Image
                source={require("../../assets/startscreen2.png")}
                style={styles.startImage}
              />
              <Text style={styles.startText}>{content.START_MSG}</Text>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const Header = ({ entries, navigation }) => {
  const {
    state: { content, theme },
    sortByTitle,
    sortByDate,
  } = useContext(DiaryContext);

  return (
    <View style={screenStyles.scrollView}>
      <View style={styles.banner}>
        {entries.length > 0 && (
          <View style={{ flexDirection: "row", marginRight: 45 }}>
            <Text style={styles.sort} onPress={sortByTitle}>
              {content.SORT_TITLE}
            </Text>
            <Text style={styles.sort} onPress={sortByDate}>
              {content.SORT_DATE}
            </Text>
          </View>
        )}
        <Text
          style={[styles.addEntry, theme.button]}
          onPress={() => navigation.navigate("addEntry", { title: "Add Book" })}
        >
          {content.ADD_BOOK}
        </Text>
      </View>
    </View>
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
    marginTop: 20,
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
    height: 30,
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
    marginTop: 80,
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
    fontWeight: "500",
    color: "#888",
    lineHeight: 25,
    textAlign: "center",
    width: 250,
  },
});
