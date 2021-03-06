import React from "react";
import { View, Animated, TouchableOpacity, StyleSheet } from "react-native";

//This is the component that deals with the Swipeable functionality
const EntryAction = ({ progress, dragX, deleteEntry, label }) => {
  //These values set range of the swipe gesture as well as the side and the limit of the swipe
  //it also uses the interpolate animation to animate the gesture
  //clamp means keeps the swipe within the output range
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  //It renders the 'Delete' button when the entry is moved left
  return (
    <TouchableOpacity onPress={deleteEntry}>
      <View style={styles.deleteView}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          {label}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

export default EntryAction;

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
