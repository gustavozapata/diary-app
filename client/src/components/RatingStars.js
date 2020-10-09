import React from "react";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RatingStarts = () => {
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <FontAwesome name="star" color="#FFC700" size={20} />
      <FontAwesome name="star" color="#FFC700" size={20} />
      <FontAwesome name="star" color="#FFC700" size={20} />
      <FontAwesome name="star-o" color="#FFC700" size={20} />
      <FontAwesome name="star-o" color="#FFC700" size={20} />
    </View>
  );
};

export default RatingStarts;
