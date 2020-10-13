import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RatingStarts = ({ stars }) => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      {[...Array(5)].map((el, i) => (
        <FontAwesome
          name={`star${i < stars ? "" : "-o"}`}
          color="#FFC700"
          size={20}
        />
      ))}
    </View>
  );
};

export default RatingStarts;
