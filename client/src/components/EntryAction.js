import React from "react";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";

export default function EntryAction({ progress, dragX, deleteEntry, label }) {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={deleteEntry}>
      <View style={styles.deleteView}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          {label}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
});
