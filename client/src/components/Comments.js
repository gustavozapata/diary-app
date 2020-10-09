import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import SingleComment from "./SingleComment";

const Comments = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "parent",
      comment: "I think this is brilliant. Let's keep doing it.",
    },
    {
      id: 2,
      user: "teacher",
      comment: "I'm glad she's learning lots",
    },
    {
      id: 1,
      user: "child",
      comment: "I just read this but I’m a bit confused ngl",
    },
  ]);

  const postComment = () => {
    alert("posting");
  };

  return (
    <View sytle={styles.commentsContainer}>
      <Text style={styles.commentsTitle}>Comments</Text>
      {/* TODO: LOAD COMMENTS */}
      <View style={styles.addComment}>
        <View>
          <Image
            style={styles.commentUser}
            source={require(`../../assets/child.png`)}
          />
          {/* <Text>Swith to parent</Text> */}
        </View>
        <TextInput
          multiline={true}
          style={styles.addText}
          placeholder="Add a comment"
          value={comment}
          onChangeText={(value) => setComment(value)}
        />
        {comment.length > 0 && (
          <Text style={styles.addBtn} onPress={postComment}>
            Post
          </Text>
        )}
      </View>
      <View style={styles.comments}>
        {comments.map((comment) => (
          <SingleComment comment={comment} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    backgroundColor: "red",
  },
  commentsTitle: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  addComment: {
    marginVertical: 17,
    flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "flex-end",
  },
  commentUser: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  addText: {
    marginHorizontal: 16,
    fontSize: 16,
    width: 200,
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  addBtn: {
    fontWeight: "700",
    fontSize: 17,
    marginTop: 10,
  },
  comments: {
    marginBottom: 20,
  },
});

export default Comments;