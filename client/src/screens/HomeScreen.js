import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TextInput,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import EntryScreen from "./EntryScreen";
import AddEntryScreen from "./AddEntryScreen";
import EntryCard from "../components/EntryCard";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import entriesData from "../data/entries.json";

//TODO: - USE REDUCER AND CONTEXT HOOKS
export default function HomeScreen({ navigation }) {
  const [entries, setEntries] = useState([...entriesData]);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="El Diario" component={MainScreen} />
      <Stack.Screen
        name="addEntry"
        component={AddEntryScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerRight: () => <Text style={styles.action}>Save</Text>,
        })}
      />
      {entries.map((entry) => (
        <Stack.Screen
          name={entry.id}
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
  );
}

function MainScreen({ navigation }) {
  const [entries, setEntries] = useState([...entriesData]);
  // const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.searchBar}>
            <Ionicons name="ios-search" size={25} style={{ marginTop: 4 }} />
            <TextInput
              onChangeText={(text) => setSearch(text)}
              placeholder="Search by title"
              value={search}
              style={styles.inputSearch}
            />
          </View>
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
              +Add entry
            </Text>
          </View>
          {entries.length > 0 ? (
            <FlatList
              data={entries}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigation.navigate(item.id)}>
                  {/* https://docs.swmansion.com/react-native-gesture-handler/docs/#installation */}
                  <Swipeable renderRightActions={EntryAction}>
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

function EntryAction(progress, dragX) {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const deleteEntry = () => {
    alert("Vamos");
  };

  return (
    <TouchableOpacity onPress={() => deleteEntry()}>
      <View style={styles.deleteView}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 24,
  },
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
  deleteView: {
    backgroundColor: "#FE3C32",
    justifyContent: "center",
    flex: 1,
    alignItems: "flex-end",
  },
  deleteText: {
    padding: 20,
    fontWeight: "600",
    color: "#fff",
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
