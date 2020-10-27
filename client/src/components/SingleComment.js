import React, { useContext } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import DiaryContext from "../context/DiaryContext";

//this component renders each comment with the icon and the comment itself
const SingleComment = ({ comment }) => {
  const {
    state: { theme },
  } = useContext(DiaryContext);

  //react doesn't allow string literals or string interpolation inside the require() function inside the souce attribute
  //this is why the logic happens here, returning the whole 'require' function
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
        //if the user is 'child' or 'parent', the comment will be placed at the left of the screen
        //this helps to identify who posted the comment
        comment.user === "teacher"
          ? { alignItems: "flex-end" }
          : { alignItems: "flex-start" },
      ]}
    >
      <Text style={[styles.comment, theme.comment]}>{comment.comment}</Text>
      <Image
        style={[styles.iconComment, theme.border]}
        source={loadUser(comment.user)}
      />
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
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
