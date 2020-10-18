import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import SingleComment from "./SingleComment";
import DiaryContext from "../context/DiaryContext";

const Comments = ({ entry }) => {
  const [isChild, setIsChild] = useState(true);
  const { state, postComment, updateComment } = useContext(DiaryContext);
  const { comment, content, theme } = state;
  const { comments } = entry;

  const loadUser = () => {
    if (isChild) {
      return require("../../assets/child.png");
    }
    return require("../../assets/parent.png");
  };

  return (
    <View>
      <Text style={styles.commentsTitle}>{content.COMMENTS}</Text>
      <View style={styles.addComment}>
        <TouchableOpacity onPress={() => setIsChild(!isChild)}>
          <Image
            style={[styles.commentUser, theme.border]}
            source={loadUser()}
          />
          <Text
            style={styles.switchUser}
            onPress={() => setIsChild((previousState) => !previousState)}
          >
            {content.COMMENT_SWITCH_USER}
          </Text>
        </TouchableOpacity>
        <TextInput
          multiline={true}
          style={[styles.addText, theme.text]}
          placeholder={content.COMMENT_PLACEHOLDER}
          placeholderTextColor="#999"
          value={comment}
          onChangeText={(value) => updateComment(value)}
        />
        {comment.length > 0 && (
          <Text
            style={[styles.addBtn, theme.text]}
            onPress={() => {
              postComment(entry._id, {
                user: isChild ? "child" : "parent",
                comment,
              });
            }}
          >
            {content.POST}
          </Text>
        )}
      </View>
      <View style={styles.comments}>
        {comments.map((comment, i) => (
          <SingleComment comment={comment} key={i} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "600",
  },
  addComment: {
    marginVertical: 17,
    flexDirection: "row",
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
    zIndex: -1,
  },
  addBtn: {
    fontWeight: "700",
    fontSize: 17,
    marginTop: 10,
    zIndex: 100,
  },
  switchUser: {
    fontSize: 11,
    position: "absolute",
    top: 50,
    left: -7,
    width: 60,
    textAlign: "center",
    color: "#777",
  },
  comments: {
    marginBottom: 20,
    minHeight: 270,
  },
});

export default Comments;
