import React from "react";
import { StyleSheet, Image, View, Text } from "react-native";

const SingleComment = ({ comment }) => {
  const loadUser = (user) => {
    switch (user) {
      case "child":
        return require("../../assets/child.png");
      case "parent":
        return require("../../assets/parent.png");
      case "teacher":
        return require("../../assets/teacher.png");
    }
  };

  return (
    <View
      style={[
        styles.container,
        comment.user === "teacher" ? { alignItems: "flex-end" } : null,
      ]}
    >
      <Text style={styles.comment}>{comment.comment}</Text>
      <Image style={styles.iconComment} source={loadUser(comment.user)} />
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    // flexDirection: "row",
  },
  comment: {
    marginHorizontal: 45,
    marginBottom: -33,
    borderRadius: 7,
    elevation: 1,
    backgroundColor: "#fcfcfc",
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    padding: 12,
    fontSize: 17,
    fontWeight: "400",
  },
  iconComment: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
});
