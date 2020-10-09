import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
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
import EntryScreen from "./EntryScreen";
import AddEntryScreen from "./AddEntryScreen";
import EntryCard from "../components/EntryCard";
import { createStackNavigator } from "@react-navigation/stack";
import Swipeable from "react-native-gesture-handler/Swipeable";
import EntryAction from "../components/EntryAction";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { toDateString } from "../utils/utils";
import { host } from "../config/config";
import { EntryContext } from "../context/context";
import screenStyles from "../styles/screenStyles";

//FIXME: offline mode
import entriesData from "../data/entries.json";

//TODO: - USE REDUCER HOOK
export default function HomeScreen({ navigation }) {
  // const [entries, setEntries] = useState([...entriesData]);
  const [entries, setEntries] = useState([]);

  const [entrada, setEntrada] = useState({
    title: "",
    description: "",
    date: toDateString(),
  });
  const valor = { entrada, setEntrada };

  useEffect(() => {
    fetchData();
  }, []);

  const Stack = createStackNavigator();

  const fetchData = () => {
    axios
      .get(`${host}/api/entries`)
      .then((res) => setEntries(res.data.data))
      .catch((err) => console.log(err));
  };

  const deleteEntry = (id) => {
    axios
      .delete(`${host}/api/entries/${id}`)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  };

  const saveEntry = (action) => {
    if (action.title === "Add Entry") {
      axios
        .post(`${host}/api/entries`, { ...entrada })
        .then(() => {
          fetchData();
          navigation.navigate("Diario");
        })
        .catch((err) => console.log(err));
    } else {
      //edit entry
      axios
        .patch(`${host}/api/entries/${action.entry._id}`, { ...entrada })
        .then(() => {
          fetchData();
          navigation.navigate(action.entry._id);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <EntryContext.Provider value={valor}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Diario">
          {(props) => (
            <MainScreen
              {...props}
              entries={entries}
              deleteEntry={deleteEntry}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="addEntry"
          component={AddEntryScreen}
          options={({ route }) => ({
            title: route.params.title,
            headerRight: () => (
              <Text
                style={styles.action}
                onPress={() => saveEntry(route.params)}
              >
                Save
              </Text>
            ),
          })}
        />
        {entries.map((entry) => (
          <Stack.Screen
            name={entry._id}
            key={entry._id}
            options={{
              title: "",
              headerRight: () => (
                <Text
                  style={styles.action}
                  onPress={() =>
                    navigation.navigate("addEntry", {
                      entry,
                      title: "Edit Entry",
                    })
                  }
                >
                  Edit
                </Text>
              ),
            }}
          >
            {(props) => <EntryScreen {...props} entry={entry} />}
          </Stack.Screen>
        ))}
      </Stack.Navigator>
    </EntryContext.Provider>
  );
}

function MainScreen({ navigation, entries, deleteEntry }) {
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
                source={require("../../assets/start.png")}
                style={styles.startImage}
              />
              <Text style={styles.startText}>
                Start by creating an entry using {"\n"}the
                <Text style={{ fontWeight: "bold" }}> +Add entry</Text> button
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  action: {
    fontSize: 15,
    color: "#1270DD",
    fontWeight: "500",
    marginRight: 14,
    textDecorationLine: "underline",
  },
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
    width: 280,
    height: 180,
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
